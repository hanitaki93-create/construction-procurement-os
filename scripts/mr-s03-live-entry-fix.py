from pathlib import Path


def replace(path: str, old: str, new: str, expected: int = 1) -> None:
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != expected:
        raise SystemExit(f"{path}: expected {expected} occurrence(s), found {count}: {old!r}")
    p.write_text(text.replace(old, new))


replace(
    'apps/web-internal/src/main-erp.tsx',
    "import { ErpRequisitionWorkspace, type ErpDevelopmentSession } from './erp-requisition.js';",
    "import { ErpRequisitionWorkspaceS03, type ErpDevelopmentSession } from './erp-requisition-s03.js';",
)
replace(
    'apps/web-internal/src/main-erp.tsx',
    "{page === 'requisitions' ? <ErpRequisitionWorkspace session={session} projects={workspace.projects} projectScopeId={projectScopeId} /> : null}",
    "{page === 'requisitions' ? <ErpRequisitionWorkspaceS03 session={session} projects={workspace.projects} projectScopeId={projectScopeId} /> : null}",
)

# Common MR default should be Each when the user starts a new free-form row.
p = Path('apps/web-internal/src/erp-requisition-s03.tsx')
text = p.read_text()
old = "refs.uoms[0]?.code ?? 'EA'"
new = "refs.uoms.find((uom) => uom.code === 'EA')?.code ?? refs.uoms[0]?.code ?? 'EA'"
count = text.count(old)
if count not in (0, 2):
    raise SystemExit(f'erp-requisition-s03.tsx: expected 0 or 2 UOM defaults, found {count}')
if count == 2:
    p.write_text(text.replace(old, new))

replace(
    'deploy/erp-slice-03/browser-smoke.mjs',
    "  await page.getByRole('button', { name: 'Requisitions', exact: true }).click();\n  await page.getByTestId('new-mr').waitFor({ state: 'visible' });",
    "  await page.getByRole('button', { name: /Suppliers & subcontractors/ }).click();\n  await page.getByRole('button', { name: /Requisitions/ }).click();\n  await page.getByTestId('new-mr').waitFor({ state: 'visible' });",
)
