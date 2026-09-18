(()=>{
const esc=window.escapeHtml||((v)=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])));
let products=[];
const editorialIds=['TH26-NYCOAT','TH26-OXFORD','LE26-568','AD26-SPEZIAL'];
const editorialImages={
 'TH26-NYCOAT':'https://tommy-europe.scene7.com/is/image/TommyEurope/MW0MW45282_GVH_main?%24b2c_updp_zoomThumb_540%24=',
 'TH26-OXFORD':'https://tommy-europe.scene7.com/is/image/TommyEurope/MW0MW35774_YBR_main?%24b2c_updp_zoomThumb_540%24=',
 'LE26-568':'https://lscoglobal.scene7.com/is/image/lscoglobal/MB_29037-0181_GLO_CM_DA?fit=crop%2C1&fmt=jpeg&hei=540&wid=540&qlt=85',
 'AD26-SPEZIAL':'https://assets.adidas.com/images/w_500%2Cf_auto%2Cq_auto/89ca8b83a08c44c89a23777ad29712e7_9366/SCARPE_HANDBALL_SPEZIAL_Bianco_IH6592_01_00_standard.jpg'
};
function img(p){return editorialImages[p.id]||''}
function stock(p){return typeof stockFor==='function'?stockFor(p):1}
async function init(){
 try{const d=await loadInventory();const all=(d.products||[]).filter(p=>stock(p)>0);products=editorialIds.map(id=>all.find(p=>p.id===id)).filter(Boolean);if(!products.length)throw Error('empty');hero();rail();features();brands();reveal();}
 catch(e){document.getElementById('heroProduct').innerHTML='<div class="asset-placeholder"><span>FLIP&CO / EDITORIAL HERO</span><strong>IMMAGINE HERO<br>DA INSERIRE</strong><small>Struttura pronta · asset fotografico in arrivo</small></div>'}
}
function card(p,cls=''){return `<a class="editorial-product ${cls}" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${esc(img(p))}" alt="${esc(p.brand)} ${esc(p.name)}" loading="lazy"><div class="editorial-caption"><span>${esc(p.brand)}</span><strong>${esc(p.name)}</strong><i>SCOPRI ↗</i></div></a>`}
function hero(){const p=products[0];document.getElementById('heroProduct').innerHTML=`<a class="hero-editorial" href="product.html?id=${encodeURIComponent(p.id)}"><div class="hero-media asset-slot"><img src="${esc(img(p))}" alt="${esc(p.brand)} ${esc(p.name)}"><span class="hero-number">01 / 04</span></div><div class="hero-copy"><span class="micro">NEW ARRIVAL · ${esc(p.brand)}</span><h1>${esc(p.name)}</h1><a class="text-link strong" href="product.html?id=${encodeURIComponent(p.id)}">SCOPRI IL CAPO ↗</a></div></a>`}
function rail(){document.getElementById('productRail').innerHTML=products.map((p,i)=>`<a class="rail-item" href="product.html?id=${encodeURIComponent(p.id)}"><div class="rail-image"><img src="${esc(img(p))}" alt="${esc(p.brand)} ${esc(p.name)}" loading="lazy"></div><span>${String(i+1).padStart(2,'0')} · ${esc(p.brand)}</span><i>↗</i></a>`).join('')}
function features(){document.getElementById('featureOne').innerHTML=card(products[1]);document.getElementById('featureTwo').innerHTML=card(products[2]);document.getElementById('featureThree').innerHTML=card(products[3]);}
function brands(){const names=[...new Set(products.map(p=>p.brand))];document.getElementById('brandRail').innerHTML=names.map((n,i)=>`<a href="brand.html?brand=${encodeURIComponent(n)}"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(n)}</strong><i>↗</i></a>`).join('')}
function reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.06});document.querySelectorAll('.hero-editorial,.home-intro,.editorial-section,.product-rail-section,.feature-grid,.shop-worlds,.brands-section,.store-feature,.closing-shop').forEach(x=>io.observe(x))}
init();
})();
