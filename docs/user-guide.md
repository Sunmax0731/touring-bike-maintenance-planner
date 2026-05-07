# ユーザーガイド

## 使い方

1. まず `samples/representative-suite.json` で4つの代表シナリオを確認する。
2. 自分のデータを同じ項目構造に合わせる。
3. `node src/cli/index.js <json>` で確認する。
4. failure は必須項目不足、warning は補助情報不足として扱う。

## 判断の見方

- pass: 閉域アルファの受け入れ基準を満たす。
- warning: 手動確認で補えるが、公開前には埋めたい。
- fail: 次アクションを決める前に修正が必要。
