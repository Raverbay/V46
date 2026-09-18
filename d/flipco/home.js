(() => {
const CART_KEY='flipco_cart_v5';
const $=s=>document.querySelector(s);
let products=[];
async function load(){try{const r=await fetch('inventory/inventory.json',{cache:'no-store'});if(!r.ok)throw 0;products=(await r.json()).products||[];render()}catch(e){$('#productStoryMount').innerHTML='<div class="catalog-error">CATALOGO NON DISPONIBILE.</div>'}}
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const money=v=>new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(Number(v)||0);
const stock=(p,s)=>Number((p.stock||{})[s]||0);
function render(){
const list=products.slice(0,12),mount=$('#productStoryMount');
mount.innerHTML=list.map((p,i)=>{const sizes=Object.keys(p.stock||{});return `<article class="product-story">
<a class="story-media" href="product.html?id=${encodeURIComponent(p.id)}" aria-label="Apri ${esc(p.name)}"><span class="story-index">${String(i+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')}</span><img src="${esc(p.image)}" alt="${esc(p.brand+' '+p.name)}" loading="${i<2?'eager':'lazy'}"></a>
<div class="story-info"><div class="story-top"><p class="story-brand">${esc(p.brand)}</p><h2 class="story-name">${esc(p.name)}</h2><p class="story-price">${money(p.price)}</p></div>
<div class="story-bottom"><div class="story-meta"><span>${esc(p.category)}</span><span>${Object.values(p.stock||{}).reduce((a,b)=>a+Number(b||0),0)>0?'DISPONIBILE':'ESAURITO'}</span></div>
<div class="size-row">${sizes.map(s=>`<button class="size-btn ${stock(p,s)?'':'disabled'}" ${stock(p,s)?'':'disabled'} type="button" data-size="${esc(s)}">${esc(s)}</button>`).join('')}</div>
<button class="add-btn" type="button" data-add="${esc(p.id)}" ${Object.values(p.stock||{}).reduce((a,b)=>a+Number(b||0),0)?'':'disabled'}>${Object.values(p.stock||{}).reduce((a,b)=>a+Number(b||0),0)?'AGGIUNGI AL BAG':'NON DISPONIBILE'}</button>
<a class="detail-link" href="product.html?id=${encodeURIComponent(p.id)}">VEDI DETTAGLI ↗</a></div></div></article>`}).join('');
mount.querySelectorAll('.product-story').forEach(card=>{
 const first=card.querySelector('.size-btn:not(.disabled)'); if(first)first.classList.add('selected');
 card.querySelectorAll('.size-btn').forEach(b=>b.onclick=()=>{card.querySelectorAll('.size-btn').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')});
 card.querySelector('[data-add]')?.addEventListener('click',()=>add(card));
});
updateCount();
}
function add(card){
const id=card.querySelector('[data-add]').dataset.add,p=products.find(x=>x.id===id),size=card.querySelector('.size-btn.selected')?.dataset.size;if(!p||!size)return;
let cart=[];try{cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch{}
const key=id+'__'+size,found=cart.find(x=>x.key===key),max=stock(p,size);
if(found){if(found.qty>=max)return;found.qty++}else cart.push({key,id:p.id,brand:p.brand,name:p.name,size,price:p.price,qty:1,image:p.image,category:p.category});
localStorage.setItem(CART_KEY,JSON.stringify(cart));updateCount();const b=card.querySelector('[data-add]');b.textContent='NEL BAG ✓';setTimeout(()=>b.textContent='AGGIUNGI AL BAG',1100);
}
function updateCount(){let c=[];try{c=JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch{};const n=c.reduce((a,x)=>a+Number(x.qty||0),0);document.querySelectorAll('#cartCount').forEach(x=>x.textContent=n)}
window.addEventListener('storage',updateCount);window.addEventListener('cartupdated',updateCount);load();
})();