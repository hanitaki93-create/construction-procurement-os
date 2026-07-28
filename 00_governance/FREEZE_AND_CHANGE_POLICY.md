# Freeze & Change Policy

A frozen artifact is immutable in meaning.

If a frozen artifact must change:
1. create CHG-####,
2. state trigger/evidence,
3. list affected requirements/ADRs/build units/code,
4. assess migration/retest impact,
5. accept or reject,
6. if accepted, issue a new version,
7. move old version to `09_history/superseded/` only after the new version becomes canonical.

Never overwrite history to make a later decision look original.
