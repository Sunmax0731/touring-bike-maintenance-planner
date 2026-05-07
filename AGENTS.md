# AGENTS

この repo は NON PICKUP Rank 24 の閉域アルファ実装です。

## Scope

- Canonical path: `D:\AI\WebApp\touring-bike-maintenance-planner`
- Repository: `Sunmax0731/touring-bike-maintenance-planner`
- Release branch policy: 作業ブランチは `codex/closed-alpha-release` を1本だけ使い、完了後は `main` に統合して削除する。

## Working Rules

- Markdown / JSON / JS / HTML / CSS / Python / XML / Lua は UTF-8 + LF で保存する。
- `src/core` の判定ロジックと `docs/traceability-matrix.md` を同期する。
- AndroidApp は権限、データ保存、ストア審査観点を docs に明記する。
- AdobePlugin は host adapter と手動ホスト検証を分ける。
- Release 後に `docs/release-evidence.json` を更新した場合は docs ZIP を再生成し、release asset を再アップロードする。
