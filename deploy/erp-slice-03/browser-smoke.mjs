import { chromium } from '@playwright/test';

const baseUrl = process.env.CPOS_BROWSER_BASE_URL ?? 'http://127.0.0.1:43123';
const tenantId = '019f1500-0000-7000-8000-000000000001';
const principalId = '019f1500-0000-7000-8000-000000000002';
const subject = 'MR S03 browser smoke';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
const page = await context.newPage();

try {
  await page.addInitScript(({ tenantId, principalId }) => {
    window.localStorage.setItem('cpos.development-session.v1', JSON.stringify({ tenantId, principalId }));
  }, { tenantId, principalId });

  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 45_000 });
  await page.getByRole('button', { name: /Suppliers & subcontractors/ }).click();
  await page.getByRole('button', { name: /Requisitions/ }).click();
  await page.getByTestId('new-mr').waitFor({ state: 'visible' });
  await page.getByTestId('new-mr').click();
  await page.getByTestId('mr-create-form').waitFor({ state: 'visible' });

  await page.getByLabel('Subject *').fill(subject);
  await page.getByLabel('Item code row 1').selectOption('019f1500-0000-7000-8000-000000000207');
  await page.getByLabel('Quantity row 1').fill('12');
  await page.getByLabel('Unit row 1').selectOption('PCS');

  await page.getByRole('button', { name: '+ Add item' }).click();
  await page.getByLabel('Description row 2').fill('Temporary free-form browser smoke item');
  await page.getByLabel('Quantity row 2').fill('4');
  await page.getByLabel('Unit row 2').selectOption('EA');

  await page.getByRole('button', { name: 'Save draft MR' }).first().click();
  await page.getByRole('button', { name: 'Save changes' }).waitFor({ state: 'visible', timeout: 20_000 });
  const mrNumber = (await page.locator('.mr-s03-doc-head h1').textContent())?.trim();
  if (!mrNumber?.startsWith('MR-GT-DEMO-26-')) throw new Error(`unexpected MR number: ${mrNumber}`);

  await page.getByLabel('Quantity row 2').fill('7');
  const saveResponsePromise = page.waitForResponse((response) => response.request().method() === 'PUT' && response.url().includes('/procurement/requisitions/') && response.url().endsWith('/draft'));
  await page.getByRole('button', { name: 'Save changes' }).click();
  const saveResponse = await saveResponsePromise;
  if (saveResponse.status() !== 200) throw new Error(`draft save returned HTTP ${saveResponse.status()}`);
  const savedBody = await saveResponse.json();
  const serverQty = savedBody?.requisition?.lines?.[1]?.requestedQuantity;
  if (serverQty !== '7.000000' && serverQty !== '7') throw new Error(`draft save response did not contain edited quantity: ${serverQty}`);
  await page.getByTestId('mr-draft-save-state').waitFor({ state: 'visible' });
  const saveState = (await page.getByTestId('mr-draft-save-state').textContent())?.trim();
  if (saveState !== 'Saved ✓') throw new Error(`draft save UI did not confirm completion: ${saveState}`);
  await page.getByRole('button', { name: '← Requisition register' }).click();
  await page.getByPlaceholder('MR number, subject, project, requester…').fill(subject);
  await page.getByRole('row', { name: new RegExp(subject) }).click();
  await page.getByLabel('Quantity row 2').waitFor({ state: 'visible' });
  const persisted = await page.getByLabel('Quantity row 2').inputValue();
  if (persisted !== '7.000000' && persisted !== '7') throw new Error(`draft quantity did not persist: ${persisted}`);

  const columns = await page.locator('.mr-s03-edit-grid thead th').allTextContents();
  for (const expected of ['#', 'Item code / Ref.', 'Description', 'Qty', 'Unit', 'Required date', 'Proposed supplier', 'Actions']) {
    if (!columns.some((column) => column.trim() === expected)) throw new Error(`missing grid column: ${expected}`);
  }

  console.log(`MR_S03_BROWSER_SMOKE_PASS number=${mrNumber} persistedQty=${persisted}`);
} finally {
  await browser.close();
}
