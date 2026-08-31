# PIYO CUP 黄チーム まとめサイト

- `index.html` … トップ（各バージョンへのリンク）
- `current.html` … 最新版（更新はこのファイルを差し替えるだけ）
- `before2.html` … 提出用紙反映前（ほんつば最終日のみ／まめ・あやパティアニ不可 反映版）
- `before.html` … ほんつば調整前

## パスワード保護（ルール要約・チームタブ）

ルール要約・チームタブの中身とPDF/画像は暗号化してあり、パスワードを入力したときだけブラウザ内で復号される。

- 暗号化済みファイル: `assets/rulebook.pdf.enc` / `assets/team.jpg.enc` / `assets/locked.js` 内ペイロード
- 平文（`assets/rulebook.pdf`, `assets/team.jpg`, `tools/src/`）は **ローカルのみ・git管理外**
- 内容を更新したら再暗号化: `node tools/encrypt.mjs <パスワード>`
- 復旧用の復号: `node tools/encrypt.mjs <パスワード> --decrypt <入力.enc> <出力先>`
