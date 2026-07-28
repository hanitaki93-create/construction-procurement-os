# Repository Tree Contract

```text
construction-procurement-os/
├── README.md
├── PROJECT_STATE.md
├── 00_governance/
├── 01_roadmaps/
├── 02_research/
├── 03_architecture/
├── 04_phases/
├── 05_build/
├── 06_product/
├── 07_quality/
├── 08_operations/
└── 09_history/
```

## Lookup rule
- Where are we? → `PROJECT_STATE.md`
- Why is architecture X this way? → `03_architecture/decisions/ADR-####`
- What requires X? → `03_architecture/requirements/REQ-####`
- What evidence supports it? → `02_research/control/evidence.csv`
- What did we build? → `05_build/work_units/BU-####`
- What exact prompt produced it? → `05_build/executed_prompts/BU-####/`
- Why did it fail? → `08_operations/incidents/INC-####`
- What used to be true? → `09_history/`

Directories are created as they become active; the roadmap is the index for work not yet activated.
