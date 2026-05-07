# 仕様

        ## 対象レコード

        - `bike`
- `maintenanceLog`
- `routePlan`
- `preRideCheck`

        ## 必須項目

        `title`, `vehicle`, `nextAction`

        ## 警告項目

        `mileage`, `reviewDate`

        ## フロー

        1. 入力レコードを受け取る。
        2. `src/core/scenarioEngine.js` が必須項目と警告項目を評価する。
        3. `src/report/reportBuilder.js` が検証結果を集計する。
        4. `dist/validation-result.json` を release evidence の前提証跡にする。

        ## 保存方針

        車両メモと整備履歴をローカル保存前提にし、位置履歴は扱わない
