# QCDS リモートベンチマーク

## 基準

この batch では、既存の成熟例として代表データ、actual run、metrics JSON、release evidence を持つプロダクト運用と、Android系 hardening / release precheck / security evidence の考え方を基準にしました。

## 採用項目

- 代表シナリオの期待値と実測値を一致させる。
- `docs/qcds-strict-metrics.json` を機械可読にする。
- `docs/qcds-regression-baseline.json` で再評価基準を固定する。
- release 後に `docs/release-evidence.json` を更新する。
- 手動テスト未実施を評価上限に反映する。
