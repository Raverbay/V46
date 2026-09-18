(function(){
'use strict';
const products=()=>window.__flipProducts||[];
function setCategoryImages(){
 const ps=products(); if(!ps.length)return;
 const pick=(cat)=>ps.find(p=>String(p.category||'').toLowerCase()===cat.toLowerCase() && Object.values(p.stock||{}).some(Number)) || ps.find(p=>String(p.category||'').toLowerCase().includes(cat.toLowerCase()));
 [['catUomoImage','Uomo'],['catDonnaImage','Donna'],['catKidsImage','Kids']].forEach(([id,cat])=>{const p=pick(cat),img=document.getElementById(id);if(p&&img){img.src=p.image;img.alt=p.brand+' '+p.name}});
}
const old=window.addEventListener; window.addEventListener('load',()=>setTimeout(setCategoryImages,80));
})();
