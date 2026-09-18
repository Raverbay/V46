(()=>{
const mount=document.getElementById('productStoryMount'); if(!mount)return;
const esc=window.escapeHtml||((v)=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])));
let products=[];
const hero=document.getElementById('heroProduct');

function images(p){return Array.isArray(p.images)&&p.images.length?p.images:[p.image].filter(Boolean)}
async function init(){
  try{
    const d=await loadInventory();
    products=(d.products||[]).filter(p=>stockFor(p)>0);
    render();
    renderHero();
    renderBrands();
    observe();
  }catch(e){
    mount.innerHTML='<div class="home-error">SELEZIONE TEMPORANEAMENTE NON DISPONIBILE.</div>';
  }
}
function render(){
  const list=products.slice(0,12);
  mount.innerHTML=list.map((p,i)=>{
    const src=images(p)[0];
    return `<figure class="look-frame" data-id="${esc(p.id)}">
      <a href="product.html?id=${encodeURIComponent(p.id)}" aria-label="Scopri ${esc(p.brand)} ${esc(p.name)}">
        <img src="${esc(src)}" alt="${esc(p.brand)} ${esc(p.name)}" loading="${i<2?'eager':'lazy'}" decoding="async">
      </a>
    </figure>`;
  }).join('');
}
function renderHero(){
  if(!hero)return;
  const p=products[0]; if(!p)return;
  hero.innerHTML=`<a href="product.html?id=${encodeURIComponent(p.id)}" class="hero-product-link" aria-label="Scopri il nuovo arrivo ${esc(p.brand)} ${esc(p.name)}">
    <img src="${esc(images(p)[0])}" alt="${esc(p.brand)} ${esc(p.name)}" fetchpriority="high">
    <span class="hero-arrow" aria-hidden="true">↗</span>
    <span class="hero-product-index">01 / ${String(Math.min(products.length,12)).padStart(2,'0')}</span>
  </a>`;
}
function renderBrands(){
  const el=document.getElementById('brandTicker'); if(!el)return;
  const names=[...new Set(products.map(p=>p.brand))];
  el.innerHTML=names.map((n,i)=>`<a href="brand.html?brand=${encodeURIComponent(n)}"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(n)}</strong><i>↗</i></a>`).join('');
}
function observe(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-in')}),{threshold:.08});
  document.querySelectorAll('.look-frame,.manifesto,.category-flow,.brand-flow,.store-section,.closing-cta').forEach(x=>io.observe(x));
}
init();
})();