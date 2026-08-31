/* PIYO CUP 黄チーム — タブ制御＋保護タブ復号スクリプト
   ルール要約・チームタブの中身とPDF/画像はAES-GCMで暗号化されており、
   正しいパスワードを入力したときだけブラウザ内で復号して表示する。
   ペイロードの再生成: node tools/encrypt.mjs <パスワード> */
(function(){
'use strict';
var PAYLOADS={rules:"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",team:"z7rcRyC/a6zvqvYw3r00YFW6ZkaesclJ7ESVFIqafsXF2kQdhMp1Rb6PM/C+XIHnFPAnYYCgklHHCHfMmFNrd2KUVIHhAfEQJ5KOMD+wsCw+5kbrjk8jqcDBmb8WKzkK+a6go8IHxMIPZDlaq1AKQ9VRav4Ri8Y13V+Rz7nBqPZnm8iDhyve/1bDGgQP5u2U/8klgiqsugsg56ZGzHSg9g1cEwic9tYypOTYnmJu72RgkKvC2PwOU4oPp0gVLiNhE+XCwFFG268PdX1NC5PlpMPXKoUCFhA4OcioyGygOeVEpjYa9sj7YsK/uR/EdL6n4LWm+Aakq+7qsax1DtINPCS2lRuUSbXqj0ibEk+bZzgatP5kJK3FTu0YklpPeM8yUEyXxPp7m/b8OaeSAAkxLmByH/dy+qja5LBvxwup1uidHE80WlY1XjGZf3RqjQD/TOa55+wq9xxtJFxwrIWNleBXpV5GJ08gmQ3BYXArXvxjC3vztvUnYoXNmfckkLjr2JQph51nps60BH6efd8E5RVuSOg8+9SkwgqBh0UpSBo0CzQ4//pt9JZHkzoGYu7mpV8RvFYxJ7WKeHCigvw5jA12mnCNpwkk/w=="};/*AUTOGEN*/
var LOCKED_IDS=['rules','team'];
var SS='piyocup_lock_pw';

function b64buf(b64){var bin=atob(b64),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u}
var keyCache={};
function deriveKey(pw,salt){
 var ck=pw+'|'+Array.prototype.join.call(salt,',');
 if(!keyCache[ck]){
  keyCache[ck]=crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey'])
   .then(function(base){return crypto.subtle.deriveKey({name:'PBKDF2',salt:salt,iterations:200000,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['decrypt'])});
 }
 return keyCache[ck];
}
function decrypt(buf,pw){
 var salt=buf.slice(0,16),iv=buf.slice(16,28),ct=buf.slice(28);
 return deriveKey(pw,salt).then(function(key){return crypto.subtle.decrypt({name:'AES-GCM',iv:iv},key,ct)}).then(function(p){return new Uint8Array(p)});
}
function fetchDecrypt(url,pw,type){
 return fetch(url).then(function(r){if(!r.ok)throw new Error('fetch '+r.status);return r.arrayBuffer()})
  .then(function(ab){return decrypt(new Uint8Array(ab),pw)})
  .then(function(plain){return URL.createObjectURL(new Blob([plain],{type:type}))});
}

var unlocked=false;
function unlock(pw){
 if(unlocked)return Promise.resolve();
 var dec=new TextDecoder();
 return Promise.all(LOCKED_IDS.map(function(id){return decrypt(b64buf(PAYLOADS[id]),pw)}))
 .then(function(bufs){
  unlocked=true;
  try{sessionStorage.setItem(SS,pw)}catch(e){}
  LOCKED_IDS.forEach(function(id,i){
   var sec=document.getElementById(id);
   if(!sec)return;
   sec.classList.remove('locked');
   sec.innerHTML=dec.decode(bufs[i]);
  });
  document.querySelectorAll('.lockmark').forEach(function(m){m.remove()});
  var fr=document.getElementById('pdfframe');
  if(fr){
   fetchDecrypt('assets/rulebook.pdf.enc',pw,'application/pdf').then(function(url){
    fr.src=url;
    var o=document.getElementById('pdfopen'),d=document.getElementById('pdfdl');
    if(o)o.href=url;if(d)d.href=url;
   }).catch(function(e){console.error('pdf decrypt failed',e)});
  }
  var im=document.getElementById('teamimg');
  if(im){
   fetchDecrypt('assets/team.jpg.enc',pw,'image/jpeg').then(function(url){im.src=url})
    .catch(function(e){console.error('img decrypt failed',e)});
  }
 });
}

function buildLockUI(){
 var ok=window.crypto&&window.crypto.subtle;
 LOCKED_IDS.forEach(function(id){
  var sec=document.getElementById(id);
  if(!sec||!sec.classList.contains('locked'))return;
  if(!ok){
   sec.innerHTML='<div class="lockbox"><div class="lockicon">🔒</div><p>このブラウザでは表示できません。<br>最新のブラウザでHTTPSのURLから開いてください。</p></div>';
   return;
  }
  sec.innerHTML='<div class="lockbox"><div class="lockicon">🔒</div><p>このタブはパスワードで保護されています。<br>チーム内で共有しているパスワードを入力してください。</p><form class="lockform"><input type="password" placeholder="パスワード" autocomplete="off"><button type="submit">開く</button></form><p class="lockerr">パスワードが違います</p></div>';
  var form=sec.querySelector('.lockform');
  form.addEventListener('submit',function(ev){
   ev.preventDefault();
   var input=form.querySelector('input'),err=sec.querySelector('.lockerr');
   var pw=input.value;
   if(!pw)return;
   err.classList.remove('show');
   unlock(pw).catch(function(){err.classList.add('show');input.select()});
  });
 });
}

document.querySelectorAll('.tabs button').forEach(function(b){
 b.addEventListener('click',function(){
  document.querySelectorAll('.tabs button').forEach(function(x){x.setAttribute('aria-selected',String(x===b))});
  document.querySelectorAll('.view').forEach(function(v){v.classList.toggle('active',v.id===b.dataset.v)});
 });
});
buildLockUI();
try{
 var saved=sessionStorage.getItem(SS);
 if(saved){unlock(saved).catch(function(){try{sessionStorage.removeItem(SS)}catch(e){}})}
}catch(e){}
})();
