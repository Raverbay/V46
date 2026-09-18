(function(){
'use strict';
const money=v=>new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(Number(v)||0);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const productCard=p=>`<a class="v22-card v22-reveal" href="product.html?id=${encodeURIComponent(p.id)}" data-id="${esc(p.id)}"><div class="v22-card-media"><img loading="lazy" src="${esc(p.image)}" alt="${esc(p.brand+' '+p.name)}"><button class="v22-card-add" type="button" tabindex="-1">SCOPRI TAGLIA ↗</button></div><div class="v22-card-info"><div><span class="brand">${esc(p.brand)}</span><strong>${esc(p.name)}</strong></div><span class="price">${money(p.price)}</span></div></a>`;
async function init(){
  let data; try{data=await loadInventory()}catch(e){console.error(e);return}
  const products=(data.products||[]).filter(p=>Object.values(p.stock||{}).some(Number));
  const newest=products.filter(p=>String(p.badge||'').toUpperCase()==='NEW').slice(0,8);
  const featured=(newest.length>=8?newest:products).slice(0,8);
  const grid=document.getElementById('newInProducts'); if(grid)grid.innerHTML=featured.map(productCard).join('');
  const category=document.getElementById('categoryProducts'); if(category)category.innerHTML=products.slice(4,10).map(productCard).join('');
  const brands=[...new Set(products.map(p=>p.brand))]; const bl=document.getElementById('brandList'); if(bl)bl.innerHTML=brands.map(b=>`<a href="shop.html?brand=${encodeURIComponent(b)}">${esc(b)}</a>`).join('');
  const heroPool=(newest.length?newest:products).slice(0,5); let hi=0;
  const hImg=document.getElementById('heroProductImage'),hBrand=document.getElementById('heroProductBrand'),hName=document.getElementById('heroProductName'),hPrice=document.getElementById('heroProductPrice'),hLink=document.getElementById('heroProductLink'),progress=document.getElementById('heroProgress');
  function showHero(){const p=heroPool[hi%heroPool.length]; if(!p)return; hImg.classList.add('is-changing'); setTimeout(()=>{hImg.src=p.image;hImg.alt=p.brand+' '+p.name;hLink.href='product.html?id='+encodeURIComponent(p.id);hBrand.textContent=p.brand;hName.textContent=p.name;hPrice.textContent=money(p.price);hImg.classList.remove('is-changing');progress.style.transition='none';progress.style.width='0';requestAnimationFrame(()=>{progress.style.transition='width 5.5s linear';progress.style.width='100%'});},240)}
  showHero(); setInterval(()=>{hi=(hi+1)%heroPool.length;showHero()},5750);
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.v22-reveal').forEach(el=>io.observe(el));
  // search index
  window.__flipProducts=products;
  const sr=document.getElementById('v22SearchResults'),si=document.getElementById('v22SearchInput');
  function search(q){q=q.trim().toLowerCase(); if(!q){sr.innerHTML='';return} const hits=products.filter(p=>(p.brand+' '+p.name+' '+p.category).toLowerCase().includes(q)).slice(0,8); sr.innerHTML=hits.length?hits.map(p=>`<a class="v22-search-result" href="product.html?id=${encodeURIComponent(p.id)}"><img loading="lazy" src="${esc(p.image)}" alt=""><span>${esc(p.brand)}</span><strong>${esc(p.name)} · ${money(p.price)}</strong></a>`).join(''):'<p>Nessun prodotto trovato.</p>'}
  si?.addEventListener('input',e=>search(e.target.value));
}
init();
})();
