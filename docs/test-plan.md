# テスト計画

## 自動テスト

```powershell
cd D:\AI\WebApp\touring-bike-maintenance-planner
cmd.exe /d /s /c npm test
```

期待結果:

- `happy-path`: pass 1
- `missing-required`: failure 1
- `warning`: warning 1
- `mixed-batch`: pass 1 / failure 1 / warning 1
- required docs が存在する。
- QCDS の全観点が A- 以上。
- 文字化け断片がない。

## 手動テスト

Codex 側では未実施です。ユーザーが `docs/manual-test.md` に従って確認します。
