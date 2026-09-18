async function initProduct(){
  const id=new URLSearchParams(location.search).get('id');
  const root=document.getElementById('productView');
  if(!root)return;
  try{
    const data=await loadInventory();
    const p=data?.products?.find(x=>x.id===id);
    if(!p){
      root.innerHTML='<div class="product-not-found"><span class="micro">FLIP&CO / SHOP</span><h1>PRODOTTO NON TROVATO.</h1><a class="text-link strong" href="shop.html">TORNA ALLO SHOP ↗</a></div>';
      return;
    }
    document.title=`${p.name} — ${p.brand} | Flip&Co`;
    const stock=stockFor(p);
    const gallery=Array.isArray(p.images)&&p.images.length?p.images:[p.image].filter(Boolean);
    root.innerHTML=`
      <div class="pdp-gallery">
        ${gallery.map((im,i)=>`<a class="pdp-media" href="${escapeHtml(im)}" target="_blank" rel="noopener" aria-label="Apri immagine ${i+1}">
          <img src="${escapeHtml(im)}" alt="${escapeHtml(p.brand)} ${escapeHtml(p.name)}${i?' — vista '+(i+1):''}" ${i?'loading="lazy"':'fetchpriority="high"}>
          <span class="pdp-media-index">${String(i+1).padStart(2,'0')} / ${String(gallery.length).padStart(2,'0')}</span>
        </a>`).join('')}
      </div>
      <aside class="pdp-info">
        <div class="pdp-breadcrumb"><a href="shop.html">SHOP</a><span>/</span><span>${escapeHtml(p.category||'SELECTION')}</span></div>
        <span class="pdp-brand">${escapeHtml(p.brand)}</span>
        <h1>${escapeHtml(p.name)}</h1>
        <div class="pdp-price">${money(p.price)}</div>
        <p class="pdp-tax">IVA inclusa</p>
        <div class="pdp-stock ${stock?'':'out'}">${stock?`DISPONIBILE · ${stock} ${stock===1?'PEZZO':'PEZZI'}`:'ESAURITO'}</div>
        <div class="pdp-size-head"><span>SELEZIONA LA TAGLIA</span><button type="button" id="sizeGuide">GUIDA TAGLIE</button></div>
        <div class="pdp-sizes">${(p.sizes||[]).map(s=>`<button type="button" class="pdp-size ${sizeStock(p,s)?'':'disabled'}" ${sizeStock(p,s)?'':'disabled'} data-size="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join('')}</div>
        <button class="pdp-add" id="addBtn" type="button" disabled>SELEZIONA UNA TAGLIA</button>
        <div class="pdp-services">
          <div><strong>SPEDIZIONE</strong><span>€ 5,90 · gratuita da € 99</span></div>
          <div><strong>RITIRO IN STORE</strong><span>Gratis · Via Italia 22, Cagliari</span></div>
        </div>
        <div class="pdp-details">
          <details open><summary>DESCRIZIONE</summary><p>Selezione Flip&Co della stagione ${escapeHtml(p.season||'')}. ${escapeHtml(p.material||'')} · ${escapeHtml(p.fit||'')} · ${escapeHtml(p.color||'')}.</p></details>
          <details><summary>DETTAGLI</summary><p>Brand: ${escapeHtml(p.brand)}<br>Categoria: ${escapeHtml(p.category||'')}<br>Disponibilità collegata allo stock reale Flip&Co.</p></details>
          <details><summary>CONSEGNA & RITIRO</summary><p>Spedizione € 5,90, gratuita da € 99. Ritiro gratuito in Via Italia 22, Cagliari.</p></details>
        </div>
        <a class="pdp-store-cta" target="_blank" rel="noopener" href="https://wa.me/393661087819?text=${encodeURIComponent('Ciao Flip&Co, vorrei provare '+p.brand+' '+p.name+' in store.')}">
          <span>FLIP&CO · CAGLIARI</span><strong>VUOI PROVARLO DAL VIVO?</strong><em>VERIFICA DISPONIBILITÀ ↗</em>
        </a>
      </aside>`;
    let selected=null;
    const add=root.querySelector('#addBtn');
    root.querySelectorAll('.pdp-size:not(.disabled)').forEach(b=>b.addEventListener('click',()=>{
      root.querySelectorAll('.pdp-size').forEach(x=>x.classList.remove('selected'));
      b.classList.add('selected'); selected=b.dataset.size;
      add.disabled=false; add.textContent='AGGIUNGI AL BAG';
    }));
    add?.addEventListener('click',()=>{
      if(!selected)return;
      const r=addToCart(p,selected);
      if(!r.ok){showCartNotice?.(r.message);return;}
      add.textContent='AGGIUNTO AL BAG ✓';
      window.dispatchEvent(new Event('cartupdated'));
      setTimeout(()=>{add.textContent='AGGIUNGI AL BAG'},1300);
    });
    root.querySelector('#sizeGuide')?.addEventListener('click',()=>document.getElementById('sizeModal')?.classList.add('open'));
  }catch(e){
    root.innerHTML='<div class="product-not-found"><span class="micro">FLIP&CO / SHOP</span><h1>NON RIUSCIAMO A CARICARE QUESTO PRODOTTO.</h1><a class="text-link strong" href="shop.html">TORNA ALLO SHOP ↗</a></div>';
  }
}
document.addEventListener('DOMContentLoaded',initProduct);