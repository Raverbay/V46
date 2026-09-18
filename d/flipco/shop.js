let PRODUCTS=[];
const params=new URLSearchParams(location.search);
let state={cat:params.get('category')||'TUTTI',brand:params.get('brand')||'TUTTI',size:params.get('size')||'TUTTE',sort:'featured',stockOnly:false};
async function initShop(){
  try{PRODUCTS=(await loadInventory()).products}catch(e){document.getElementById('shopGrid').innerHTML='<div class="no-results"><h2>CATALOGO NON DISPONIBILE.</h2><p>Riprova tra poco.</p></div>';return}
  const sel=document.getElementById('brandFilter');
  [...new Set(PRODUCTS.map(p=>p.brand))].sort().forEach(x=>sel.insertAdjacentHTML('beforeend',`<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`));
  sel.value=state.brand;
  const sizes=[...new Set(PRODUCTS.flatMap(p=>p.sizes||[]))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
  const sizeSel=document.getElementById('sizeFilter'); sizes.forEach(x=>sizeSel.insertAdjacentHTML('beforeend',`<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`)); sizeSel.value=state.size;
  document.querySelectorAll('.chip').forEach(b=>{b.classList.toggle('active',b.dataset.cat===state.cat);b.onclick=()=>{state.cat=b.dataset.cat;renderShop()}});
  sel.onchange=e=>{state.brand=e.target.value;renderShop()}; sizeSel.onchange=e=>{state.size=e.target.value;renderShop()};
  document.getElementById('sortFilter').onchange=e=>{state.sort=e.target.value;renderShop()};
  document.getElementById('stockToggle').onclick=e=>{state.stockOnly=!state.stockOnly;e.currentTarget.setAttribute('aria-pressed',state.stockOnly);renderShop()};
  renderShop();
}
function renderShop(){
 let a=PRODUCTS.filter(p=>(state.cat==='TUTTI'||p.category===state.cat)&&(state.brand==='TUTTI'||p.brand===state.brand)&&(state.size==='TUTTE'||sizeStock(p,state.size)>0)&&(!state.stockOnly||stockFor(p)>0));
 if(state.sort==='price-asc')a.sort((x,y)=>x.price-y.price); if(state.sort==='price-desc')a.sort((x,y)=>y.price-x.price); if(state.sort==='new')a.sort((x,y)=>(y.badge==='NEW')-(x.badge==='NEW'));
 document.getElementById('resultCount').textContent=`${a.length} ${a.length===1?'prodotto':'prodotti'}`;
 document.getElementById('shopGrid').innerHTML=a.map(p=>`<a class="product-card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-media">${p.badge?`<span class="badge">${escapeHtml(p.badge)}</span>`:''}<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.brand)} ${escapeHtml(p.name)}" loading="lazy" onerror="this.src='assets/editorial-campaign.jpg'"><span class="availability">${stockFor(p)?`${stockFor(p)} ${stockFor(p)===1?'pezzo':'pezzi'} disponibili`:'Esaurito'}</span></div><div class="product-info"><span>${escapeHtml(p.brand)} · ${escapeHtml(p.season)}</span><h3>${escapeHtml(p.name)}</h3><p>${money(p.price)}</p><small>${stockFor(p)?'Taglie: '+Object.entries(p.stock).filter(([,q])=>q>0).map(([s])=>escapeHtml(s)).join(' · '):'Non disponibile'}</small></div></a>`).join('')||'<div class="no-results"><h2>NESSUN RISULTATO.</h2><p>Prova a cambiare filtro.</p></div>';
}
document.addEventListener('DOMContentLoaded',initShop);
