/* PIYO CUP 黄チーム — タブ制御＋保護タブ復号スクリプト
   ルール要約・チームタブの中身とPDF/画像はAES-GCMで暗号化されており、
   正しいパスワードを入力したときだけブラウザ内で復号して表示する。
   ペイロードの再生成: node tools/encrypt.mjs <パスワード> */
(function(){
'use strict';
var PAYLOADS={rules:"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",team:"M1QLicxOfU+5TO0B9YEoSYuNVNzORxYBXkFnkCv6rCIDz6Ekk/jnm08gkJESRvQgEWNF8m3RgqdvK9451WHQOoyxjueEbjqagOa6PM8Kremf+b9ApZeSy3IN2zWPIjiFGwHddW9dECWuinIEw3AYNy4n68Zro7eS1Ucmc0FQzvmMd5e+odn3dQyXfByy09TyOiKnUJU4/1rskzvJhw4t2pQzQKLKp3jyJ3wNXJxT6gP/0Vl+fBxrWq+iy+LxPrlMwgmD76SGLXlo14OgNtIeG1XDSiWlhclku8Wk9BzyA8HVRvjubjyYKIiWUHiTz2OwENHptAzPzXxTsbTRVBELmRP3lGFX9BxKQWjnrG7MRJhmq5SgpNlMqRWKkuQ3EmtFhwLJ4kyN4nlnf5O9LIgNzSiPayNUeSpvPdS4bJ8crtLONoDO9heMQPp3UhH63gM9G6+wA2qasppdLrp94oG4rqWHzKD0hWejWgpv5WnsXlTpycIH9m9VmkGD/gCCOYo/Qp98N585b1OZ3+w0v+EaX1XhoYU4PwJKrO1lSgrWoE1dDt2dkayrdnRpsp0G5w=="};/*AUTOGEN*/
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
