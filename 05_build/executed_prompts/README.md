# Executed Prompt Archive

Prompts are **execution artifacts**, not architecture.

For each executed `BU-####`, create:

```text
05_build/executed_prompts/BU-####/
├── PROMPT_EXECUTED.md
├── CONTEXT_MANIFEST.md
├── RESULT.md
└── GATE_RESULT.md
```

`CONTEXT_MANIFEST.md` records the exact versions of frozen spec sections, REQs and ADRs supplied to the builder.

Do not generate future prompts months ahead. Do not delete a prompt because the implementation failed. Failed attempts remain traceable history.
