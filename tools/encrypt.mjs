#!/usr/bin/env node
// ルール要約・チームタブの中身とPDF/画像を暗号化する（AES-256-GCM / PBKDF2-SHA256 200k回）
//
// 使い方:
//   暗号化(再生成): node tools/encrypt.mjs <パスワード>
//     入力: tools/src/rules-inner.html, tools/src/team-inner.html,
//           assets/rulebook.pdf, assets/team.jpg  ※すべてgit管理外・ローカルのみ
//     出力: assets/rulebook.pdf.enc, assets/team.jpg.enc, assets/locked.js のPAYLOADS行
//   復号(復旧用):   node tools/encrypt.mjs <パスワード> --decrypt <入力.enc> <出力先>
//
// ファイル形式: salt(16) + iv(12) + ciphertext + GCMタグ(16)
import { readFileSync, writeFileSync } from 'node:fs';
import { pbkdf2Sync, randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ITER = 200000;
const args = process.argv.slice(2);
const pw = args[0];
if (!pw) { console.error('パスワードを指定してください'); process.exit(1); }

if (args[1] === '--decrypt') {
  const buf = readFileSync(args[2]);
  const salt = buf.subarray(0, 16), iv = buf.subarray(16, 28);
  const ct = buf.subarray(28, buf.length - 16), tag = buf.subarray(buf.length - 16);
  const key = pbkdf2Sync(pw, salt, ITER, 32, 'sha256');
  const d = createDecipheriv('aes-256-gcm', key, iv);
  d.setAuthTag(tag);
  writeFileSync(args[3], Buffer.concat([d.update(ct), d.final()]));
  console.log('decrypted ->', args[3]);
  process.exit(0);
}

const salt = randomBytes(16);
const key = pbkdf2Sync(pw, salt, ITER, 32, 'sha256');
function enc(buf) {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', key, iv);
  return Buffer.concat([salt, iv, c.update(buf), c.final(), c.getAuthTag()]);
}

for (const [src, dst] of [['assets/rulebook.pdf', 'assets/rulebook.pdf.enc'], ['assets/team.jpg', 'assets/team.jpg.enc']]) {
  writeFileSync(join(ROOT, dst), enc(readFileSync(join(ROOT, src))));
  console.log(dst, 'OK');
}

const rules = enc(readFileSync(join(ROOT, 'tools/src/rules-inner.html'))).toString('base64');
const team = enc(readFileSync(join(ROOT, 'tools/src/team-inner.html'))).toString('base64');
const ljs = join(ROOT, 'assets/locked.js');
const before = readFileSync(ljs, 'utf8');
const after = before.replace(/var PAYLOADS=\{[\s\S]*?\};\/\*AUTOGEN\*\//, `var PAYLOADS={rules:"${rules}",team:"${team}"};/*AUTOGEN*/`);
if (before === after) { console.error('locked.js のAUTOGEN行が見つかりません'); process.exit(1); }
writeFileSync(ljs, after);
console.log('locked.js payload OK');
