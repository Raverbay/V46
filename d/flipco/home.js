(()=>{
const esc=window.escapeHtml||((v)=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])));
let products=[];
function images(p){return Array.isArray(p.images)&&p.images.length?p.images:[p.image].filter(Boolean)}
function stock(p){return typeof stockFor==='function'?stockFor(p):1}
async function init(){
 try{
  const d=await loadInventory(); products=(d.products||[]).filter(p=>stock(p)>0); if(!products.length) throw Error('empty');
  hero(); rail(); features(); brands(); reveal();
 }catch(e){document.getElementById('heroProduct').innerHTML='<div class="home-error">SELEZIONE TEMPORANEAMENTE NON DISPONIBILE.</div>'}
}
function hero(){const p=products[0],img=images(p)[0];document.getElementById('heroProduct').innerHTML=`<a class="nike-hero-link" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${esc(img)}" alt="${esc(p.brand)} ${esc(p.name)}"><div class="hero-overlay"><span class="micro">NEW ARRIVAL · ${esc(p.brand)}</span><h2>${esc(p.name)}</h2><div class="hero-actions"><span>SCOPRI</span><span>ACQUISTA ↗</span></div></div><span class="hero-counter">01 / ${String(products.length).padStart(2,'0')}</span></a>`}
function rail(){const el=document.getElementById('productRail');el.innerHTML=products.map((p,i)=>`<a class="rail-item" href="product.html?id=${encodeURIComponent(p.id)}" aria-label="${esc(p.brand)} ${esc(p.name)}"><img src="${esc(images(p)[0])}" alt="${esc(p.brand)} ${esc(p.name)}" loading="${i<4?'eager':'lazy'}"><span class="rail-index">${String(i+1).padStart(2,'0')}</span><span class="rail-arrow">↗</span></a>`).join('')}
function featureCard(p,el,mode){if(!p||!el)return;el.innerHTML=`<a href="product.html?id=${encodeURIComponent(p.id)}"><img src="${esc(images(p)[0])}" alt="${esc(p.brand)} ${esc(p.name)}" loading="lazy"><div class="feature-card-copy"><span class="micro">${mode}</span><h3>${esc(p.brand)}</h3><p>${esc(p.name)}</p><span class="text-link">SCOPRI ↗</span></div></a>`}
function features(){featureCard(products[1],document.getElementById('featureOne'),'NEW / 01');featureCard(products[4],document.getElementById('featureTwo'),'EVERYDAY / 02');featureCard(products[7],document.getElementById('featureThree'),'SELECTED / 03')}
function brands(){const el=document.getElementById('brandRail'),names=[...new Set(products.map(p=>p.brand))];el.innerHTML=names.map((n,i)=>`<a href="brand.html?brand=${encodeURIComponent(n)}"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(n)}</strong><i>↗</i></a>`).join('')}
function reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.08});document.querySelectorAll('.nike-hero,.home-intro,.feature-block,.product-rail-section,.feature-card,.shop-worlds,.brands-section,.store-feature,.closing-shop').forEach(x=>io.observe(x))}
init();
})();