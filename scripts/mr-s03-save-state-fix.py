from pathlib import Path


def replace(path: str, old: str, new: str, count: int = 1) -> None:
    p = Path(path)
    text = p.read_text()
    found = text.count(old)
    if found != count:
        raise SystemExit(f"{path}: expected {count} copies, found {found}: {old[:120]!r}")
    p.write_text(text.replace(old, new, count))


path = 'apps/web-internal/src/erp-requisition-s03.tsx'
replace(
    path,
    "  const [error, setError] = useState<string | null>(null);\n  const payload = (): UpdateMaterialRequisitionDraftRequest => ({",
    "  const [error, setError] = useState<string | null>(null);\n  const [saveState, setSaveState] = useState<'clean' | 'dirty' | 'saved'>('clean');\n  const setHeaderDirty = (next: DraftHeader | ((current: DraftHeader) => DraftHeader)) => { setSaveState('dirty'); setHeader(next); };\n  const setLinesDirty = (next: DraftLine[] | ((current: DraftLine[]) => DraftLine[])) => { setSaveState('dirty'); setLines(next); };\n  const payload = (): UpdateMaterialRequisitionDraftRequest => ({",
)
replace(
    path,
    "  const save = useMutation({\n    mutationFn: () => json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/draft`, session, { method: 'PUT', body: JSON.stringify(payload()) }),\n    onSuccess: async () => Promise.all([client.invalidateQueries({ queryKey: ['procurement-mr', session, mr.mrId] }), client.invalidateQueries({ queryKey: ['procurement-mrs', session] })]),\n  });",
    "  const save = useMutation({\n    mutationFn: () => json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/draft`, session, { method: 'PUT', body: JSON.stringify(payload()) }),\n    onMutate: () => setSaveState('clean'),\n    onSuccess: async (result) => {\n      client.setQueryData(['procurement-mr', session, mr.mrId], result);\n      setSaveState('saved');\n      await client.invalidateQueries({ queryKey: ['procurement-mrs', session] });\n    },\n    onError: () => setSaveState('dirty'),\n  });",
)
replace(
    path,
    "    <section className=\"mr-s03-card\"><div className=\"mr-s03-section-head\"><div><strong>Draft request information</strong><span>Editable until submission</span></div><Status value=\"DRAFT\" /></div><HeaderEditor header={header} setHeader={setHeader} projects={projects} projectId={mr.projectId} projectLocked /></section>\n    <section className=\"mr-s03-card mr-s03-items-card\"><div className=\"mr-s03-section-head\"><div><strong>Requested items / scope</strong><span>Edit directly. # is only the display serial; Item code / Ref. is the master reference.</span></div><button className=\"erp-button erp-button--small erp-button--ghost\" type=\"button\" onClick={() => window.print()}>Print item schedule / PDF</button></div><ItemGrid lines={lines} setLines={setLines} refs={refs} suppliers={suppliers} /></section>",
    "    <section className=\"mr-s03-card\"><div className=\"mr-s03-section-head\"><div><strong>Draft request information</strong><span>Editable until submission</span></div><Status value=\"DRAFT\" /></div><HeaderEditor header={header} setHeader={setHeaderDirty} projects={projects} projectId={mr.projectId} projectLocked /></section>\n    <section className=\"mr-s03-card mr-s03-items-card\"><div className=\"mr-s03-section-head\"><div><strong>Requested items / scope</strong><span>Edit directly. # is only the display serial; Item code / Ref. is the master reference.</span></div><button className=\"erp-button erp-button--small erp-button--ghost\" type=\"button\" onClick={() => window.print()}>Print item schedule / PDF</button></div><ItemGrid lines={lines} setLines={setLinesDirty} refs={refs} suppliers={suppliers} /></section>",
)
replace(
    path,
    "    <div className=\"mr-s03-draft-actions\"><div><strong>Draft controls</strong><span>Save keeps the MR editable. Save & submit locks demand for approval.</span></div><button className=\"erp-button erp-button--ghost\" type=\"button\" disabled={save.isPending || saveAndSubmit.isPending} onClick={() => guard(() => save.mutate())}>{save.isPending ? 'Saving…' : 'Save changes'}</button><button className=\"erp-button erp-button--primary\" type=\"button\" disabled={save.isPending || saveAndSubmit.isPending} onClick={() => guard(() => saveAndSubmit.mutate())}>{saveAndSubmit.isPending ? 'Submitting…' : 'Save & submit for approval'}</button></div>",
    "    <div className=\"mr-s03-draft-actions\"><div><strong>Draft controls</strong><span>Save keeps the MR editable. Save & submit locks demand for approval.</span><span className={`mr-s03-save-state mr-s03-save-state--${saveState}`} data-testid=\"mr-draft-save-state\">{save.isPending ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : saveState === 'dirty' ? 'Unsaved changes' : 'No unsaved changes'}</span></div><button className=\"erp-button erp-button--ghost\" type=\"button\" disabled={save.isPending || saveAndSubmit.isPending} onClick={() => guard(() => save.mutate())}>{save.isPending ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : 'Save changes'}</button><button className=\"erp-button erp-button--primary\" type=\"button\" disabled={save.isPending || saveAndSubmit.isPending} onClick={() => guard(() => saveAndSubmit.mutate())}>{saveAndSubmit.isPending ? 'Submitting…' : 'Save & submit for approval'}</button></div>",
)

# Add compact visual state to existing S03 CSS.
css = Path('apps/web-internal/src/erp-requisition-s03.css')
text = css.read_text()
marker = ".mr-s03-draft-actions>div span { margin-top: 1px; color: #72808a; font-size: 10px; }\n"
if marker not in text:
    raise SystemExit('CSS save-state marker not found')
insert = marker + ".mr-s03-draft-actions>div .mr-s03-save-state { margin-top: 4px; font-size: 10px; font-weight: 750; }\n.mr-s03-save-state--dirty { color: #8a5a17 !important; }\n.mr-s03-save-state--saved { color: #1e685f !important; }\n"
css.write_text(text.replace(marker, insert, 1))

# Browser must wait for the governed draft PUT and inspect the server-returned MR before navigating away.
browser = Path('deploy/erp-slice-03/browser-smoke.mjs')
text = browser.read_text()
old = "  await page.getByLabel('Quantity row 2').fill('7');\n  await page.getByRole('button', { name: 'Save changes' }).click();\n  await page.waitForLoadState('networkidle');\n  await page.getByRole('button', { name: '← Requisition register' }).click();"
new = "  await page.getByLabel('Quantity row 2').fill('7');\n  const saveResponsePromise = page.waitForResponse((response) => response.request().method() === 'PUT' && response.url().includes('/procurement/requisitions/') && response.url().endsWith('/draft'));\n  await page.getByRole('button', { name: 'Save changes' }).click();\n  const saveResponse = await saveResponsePromise;\n  if (saveResponse.status() !== 200) throw new Error(`draft save returned HTTP ${saveResponse.status()}`);\n  const savedBody = await saveResponse.json();\n  const serverQty = savedBody?.requisition?.lines?.[1]?.requestedQuantity;\n  if (serverQty !== '7.000000' && serverQty !== '7') throw new Error(`draft save response did not contain edited quantity: ${serverQty}`);\n  await page.getByTestId('mr-draft-save-state').waitFor({ state: 'visible' });\n  const saveState = (await page.getByTestId('mr-draft-save-state').textContent())?.trim();\n  if (saveState !== 'Saved ✓') throw new Error(`draft save UI did not confirm completion: ${saveState}`);\n  await page.getByRole('button', { name: '← Requisition register' }).click();"
if text.count(old) != 1:
    raise SystemExit('browser save sequence marker not found')
browser.write_text(text.replace(old, new, 1))
