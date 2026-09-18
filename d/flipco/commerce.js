const CART_KEY='flipco_cart_v5';
function money(v){return new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(Number(v)||0)}
function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch{return[]}}
function saveCart(c){localStorage.setItem(CART_KEY,JSON.stringify(c));updateCartCount()}
function updateCartCount(){const n=getCart().reduce((s,i)=>s+Number(i.qty||0),0);document.querySelectorAll('#cartCount').forEach(e=>e.textContent=n)}
function addToCart(p,size,qty=1){
  const available=sizeStock(p,size); if(!available) return {ok:false,message:'Questa taglia non è più disponibile.'};
  const c=getCart(),key=p.id+'__'+size,found=c.find(i=>i.key===key),current=found?found.qty:0;
  if(current+qty>available) return {ok:false,message:`Disponibilità massima: ${available} ${available===1?'pezzo':'pezzi'}.`};
  if(found) found.qty+=qty; else c.push({key,id:p.id,brand:p.brand,name:p.name,size,price:p.price,qty,image:p.image,category:p.category});
  saveCart(c); return {ok:true};
}
function removeFromCart(key){saveCart(getCart().filter(i=>i.key!==key));renderCart()}
async function changeQty(key,d){
  const c=getCart(),i=c.find(x=>x.key===key);if(!i)return;
  const p=productById(i.id); if(!p){removeFromCart(key);return}
  const next=i.qty+d;
  if(next<1){c.splice(c.indexOf(i),1);saveCart(c);renderCart();return}
  const max=sizeStock(p,i.size); if(next>max){showCartNotice(`Disponibilità aggiornata: ${max} ${max===1?'pezzo':'pezzi'}.`);return}
  i.qty=next;saveCart(c);renderCart();
}
function showCartNotice(msg){const el=document.getElementById('cartNotice');if(!el)return;el.textContent=msg;el.hidden=false;clearTimeout(window.__cartNotice);window.__cartNotice=setTimeout(()=>el.hidden=true,3500)}
function cartTotal(){return getCart().reduce((s,i)=>s+Number(i.price)*Number(i.qty),0)}
function renderCart(){
  const box=document.getElementById('cartItems'),tot=document.getElementById('cartTotal');if(!box)return;
  const c=getCart();
  box.innerHTML=c.length?c.map(i=>`<article class="cart-item"><img src="${escapeHtml(i.image)}" alt="${escapeHtml(i.brand)} ${escapeHtml(i.name)}" loading="lazy" onerror="this.src='assets/editorial-campaign.jpg'"><div><span>${escapeHtml(i.brand)}</span><strong>${escapeHtml(i.name)}</strong><small>Taglia ${escapeHtml(i.size)} · ${money(i.price)}</small><div class="qty"><button type="button" data-q="${escapeHtml(i.key)}" data-d="-1" aria-label="Diminuisci quantità">−</button><b aria-live="polite">${i.qty}</b><button type="button" data-q="${escapeHtml(i.key)}" data-d="1" aria-label="Aumenta quantità">+</button><button type="button" class="remove" data-r="${escapeHtml(i.key)}">Rimuovi</button></div></div></article>`).join(''):`<div class="empty-cart"><strong>IL CARRELLO È VUOTO.</strong><p>Scopri la selezione Flip&Co.</p><a class="text-link" href="shop.html">ENTRA NELLO SHOP →</a></div>`;
  if(tot)tot.textContent=money(cartTotal());
  box.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>changeQty(b.dataset.q,Number(b.dataset.d)));
  box.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>removeFromCart(b.dataset.r));
}
function setupCart(){
  updateCartCount();renderCart();
  const t=document.getElementById('cartTrigger'),d=document.getElementById('cartDrawer'),c=document.getElementById('cartClose'),b=document.getElementById('cartBackdrop');
  const open=()=>{if(!d)return;d.classList.add('open');b?.classList.add('open');d.setAttribute('aria-hidden','false');renderCart();c?.focus()};
  const close=()=>{d?.classList.remove('open');b?.classList.remove('open');d?.setAttribute('aria-hidden','true');t?.focus()};
  t?.addEventListener('click',open);c?.addEventListener('click',close);b?.addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&d?.classList.contains('open'))close()});
  if(location.hash==='#cart'||new URLSearchParams(location.search).get('cart')==='1') setTimeout(open,50);
}
document.addEventListener('DOMContentLoaded',setupCart);
