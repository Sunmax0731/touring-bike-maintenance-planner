# Traceability Matrix

| 根拠 | 実装 / docs | 検証 |
| --- | --- | --- |
| NON PICKUP Rank 24 | `README.md`, `docs/requirements.md` | `docs/source-idea-pack.json` |
| 必須項目 `title`, `vehicle`, `nextAction` | `src/core/productProfile.js` | `samples/representative-suite.json` |
| warning 項目 `mileage`, `reviewDate` | `src/core/scenarioEngine.js` | `tests/run-tests.js` |
| QCDS | `docs/qcds-*.md`, `docs/qcds-*.json` | `cmd.exe /d /s /c npm test` |
| release | `docs/releases/v0.1.0-alpha.1.md` | `docs/release-evidence.json` |
