async function initProduct(){
 const id=new URLSearchParams(location.search).get('id'),data=await loadInventory().catch(()=>null),p=data?.products?.find(x=>x.id===id),root=document.getElementById('productView');
 if(!p){root.innerHTML='<div class="product-not-found"><strong>PRODOTTO NON TROVATO.</strong><a href="shop.html">TORNA ALLO SHOP →</a></div>';return}
 document.title=`${p.name} — ${p.brand} | Flip&Co`;
 const stock=stockFor(p); const gallery=Array.isArray(p.images)&&p.images.length?p.images:[p.image,p.image].filter(Boolean);
 root.innerHTML=`
 <section class="pdp-gallery">${gallery.map((im,i)=>`<div class="pdp-frame"><img src="${escapeHtml(im)}" alt="${escapeHtml(p.brand)} ${escapeHtml(p.name)}${i?' — vista '+(i+1):''}" ${i?'loading="lazy"':'fetchpriority="high"'}></div>`).join('')}</section>
 <section class="pdp-info">
   <div class="pdp-top"><a href="shop.html" class="back-link">← SHOP</a><button class="pdp-wish" type="button" aria-label="Salva prodotto">♡</button></div>
   <div class="eyebrow">${escapeHtml(p.brand)}</div><h1>${escapeHtml(p.name)}</h1><div class="pdp-price">${money(p.price)}</div>
   <p class="tax-note">IVA inclusa</p><div class="rule"></div>
   <div class="stock-note">${stock?`DISPONIBILE · ${stock} ${stock===1?'PEZZO':'PEZZI'}`:'ESAURITO'}</div>
   <div class="size-head"><span>SELEZIONA LA TAGLIA</span><button type="button" id="sizeGuide">GUIDA TAGLIE</button></div>
   <div class="size-grid">${(p.sizes||[]).map(s=>`<button type="button" class="pdp-size ${sizeStock(p,s)?'':'disabled'}" ${sizeStock(p,s)?'':'disabled'} data-size="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join('')}</div>
   <button class="add-main add-main" id="addBtn" disabled>SELEZIONA UNA TAGLIA</button>
   <div class="delivery"><div><span>↗</span><p><strong>SPEDIZIONE</strong><br>€ 5,90 · gratuita da € 99</p></div><div><span>⌖</span><p><strong>RITIRO IN STORE</strong><br>Gratis · Via Italia 22, Cagliari</p></div></div>
   <div class="info-links"><details open><summary>DESCRIZIONE</summary><p>Selezione Flip&Co della stagione ${escapeHtml(p.season)}. ${escapeHtml(p.material)} · ${escapeHtml(p.fit)} · ${escapeHtml(p.color)}.</p></details><details><summary>DETTAGLI</summary><p>Brand: ${escapeHtml(p.brand)}<br>Categoria: ${escapeHtml(p.category)}<br>Disponibilità collegata allo stock reale del negozio.</p></details><details><summary>CONSEGNA & RITIRO</summary><p>Spedizione € 5,90, gratuita da € 99. Ritiro gratuito in Via Italia 22, Cagliari.</p></details></div>
   <div class="store-pickup"><span>FLIP&CO · CAGLIARI</span><strong>VUOI PROVARLO DAL VIVO?</strong><a target="_blank" rel="noopener" href="https://wa.me/393661087819?text=${encodeURIComponent('Ciao Flip&Co, vorrei provare '+p.brand+' '+p.name+' in store.')}">VERIFICA DISPONIBILITÀ IN STORE ↗</a></div>
 </section>`;
 let selected=null;const add=root.querySelector('#addBtn');
 root.querySelectorAll('.pdp-size:not(.disabled)').forEach(b=>b.onclick=()=>{root.querySelectorAll('.pdp-size').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');selected=b.dataset.size;add.disabled=false;add.textContent='AGGIUNGI AL BAG'});
 add.onclick=()=>{const r=addToCart(p,selected);if(!r.ok)return showCartNotice(r.message);document.getElementById('cartTrigger')?.click()};
 root.querySelector('#sizeGuide')?.addEventListener('click',()=>document.getElementById('sizeModal')?.classList.add('open'));
 const wish=root.querySelector('.pdp-wish');wish.onclick=()=>{let a=[];try{a=JSON.parse(localStorage.getItem('flipco_wishlist')||'[]')}catch{}const has=a.includes(p.id);a=has?a.filter(x=>x!==p.id):[...a,p.id];localStorage.setItem('flipco_wishlist',JSON.stringify(a));wish.classList.toggle('saved',!has);wish.textContent=has?'♡':'♥'};
}
document.addEventListener('DOMContentLoaded',initProduct);
