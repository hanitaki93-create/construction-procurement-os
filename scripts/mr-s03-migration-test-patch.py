from pathlib import Path

path = Path('packages/database-core/integration/migrations.integration.test.ts')
text = path.read_text()
old = "      '000025',\n      '000026',\n"
new = "      '000025',\n      '000026',\n      '000027',\n"
if text.count(old) != 1:
    raise SystemExit(f'expected one migration-list marker, found {text.count(old)}')
path.write_text(text.replace(old, new, 1))
