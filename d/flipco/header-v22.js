(function(){
'use strict';
const header=document.getElementById('siteHeader'),menu=document.getElementById('v22MenuPanel'),menuBtn=document.getElementById('v22MenuBtn'),menuClose=document.getElementById('v22MenuClose'),search=document.getElementById('v22SearchPanel'),searchBtn=document.getElementById('v22SearchBtn'),searchClose=document.getElementById('v22SearchClose'),input=document.getElementById('v22SearchInput');
if(!header)return;
const hero=document.getElementById('hero');
function closeAll(){menu?.classList.remove('open');search?.classList.remove('open');menu?.setAttribute('aria-hidden','true');search?.setAttribute('aria-hidden','true');menuBtn?.setAttribute('aria-expanded','false');document.body.classList.remove('v22-modal-open')}
function openMenu(){search?.classList.remove('open');search?.setAttribute('aria-hidden','true');menu?.classList.add('open');menu?.setAttribute('aria-hidden','false');menuBtn?.setAttribute('aria-expanded','true');document.body.classList.add('v22-modal-open')}
function openSearch(){menu?.classList.remove('open');menu?.setAttribute('aria-hidden','true');search?.classList.add('open');search?.setAttribute('aria-hidden','false');document.body.classList.add('v22-modal-open');setTimeout(()=>input?.focus(),120)}
menuBtn?.addEventListener('click',()=>menu?.classList.contains('open')?closeAll():openMenu());menuClose?.addEventListener('click',closeAll);searchBtn?.addEventListener('click',openSearch);searchClose?.addEventListener('click',closeAll);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});document.querySelectorAll('.v22-menu-panel a').forEach(a=>a.addEventListener('click',closeAll));
function syncHeader(){if(!hero){header.classList.add('is-light');return} const r=hero.getBoundingClientRect();header.classList.toggle('is-light',r.bottom<72 || r.top>0&&window.scrollY>40)}
window.addEventListener('scroll',syncHeader,{passive:true});syncHeader();
// Keep cart count aligned with the existing commerce key without importing the old nav/transition system.
function syncCart(){const el=document.getElementById('cartCount');if(!el)return;try{const c=JSON.parse(localStorage.getItem('flipco_cart_v5')||'[]');el.textContent=Array.isArray(c)?c.reduce((n,i)=>n+Number(i.qty||1),0):0}catch{el.textContent='0'}}
syncCart();window.addEventListener('storage',syncCart);window.addEventListener('pageshow',syncCart);
})();
