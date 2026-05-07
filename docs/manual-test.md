# 手動テスト

Codex 側では手動テスト未実施です。

## 作業ディレクトリ

`D:\AI\WebApp\touring-bike-maintenance-planner`

## 事前準備

1. GitHub Release `v0.1.0-alpha.1` から `dist/touring-bike-maintenance-planner-docs.zip` を取得できることを確認する。
2. `docs/user-guide.md` と `docs/installation-guide.md` を開く。
3. ローカルで `cmd.exe /d /s /c npm test` が通ることを確認する。

## 実施項目

1. 代表データの happy-path を読み、ユーザー価値が分かるか確認する。
2. missing-required のエラー表示が次の修正に進める粒度か確認する。
3. warning がブロッカーではなく注意として扱われるか確認する。
4. mixed-batch で合格、警告、失敗が同時に見分けられるか確認する。
5. 次の走行前に確認すべき整備タスクを抽出する

## 判定

- 迷わず操作できれば合格。
- 手順が不足していれば `docs/strict-manual-test-addendum.md` に追記する。

## 権限・プライバシー確認

- 追加のOS権限は閉域アルファMVPでは要求しない。
