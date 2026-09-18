(async()=>{
  const [cfg,products]=await Promise.all([fetch('content.json').then(r=>r.json()),fetch('products.json').then(r=>r.json())]);
  const slug=new URLSearchParams(location.search).get('brand')||cfg.brands[0]?.slug;
  const b=cfg.brands.find(x=>x.slug===slug)||cfg.brands[0];
  const main=document.querySelector('#brandMain');
  if(!b||!main)return;
  const items=products.filter(p=>p.brand===b.name);
  document.title=`${b.name} — Flip&Co`;
  const money=n=>new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(n);
  main.innerHTML=`
    <section class="shop-hero"><span class="micro">FLIP&CO / BRAND</span><h1>${b.name.toUpperCase()}<br><em>THE EDIT.</em></h1><p>${b.collection?.description||`La selezione ${b.name} da Flip&Co.`}</p></section>
    <section class="section-pad" style="padding-top:90px;padding-bottom:65px"><span class="micro">${b.collection?.audience||'SELECTED BRAND'}</span><h2 class="display" style="font-size:clamp(44px,7vw,100px);line-height:.9;margin:25px 0">SCOPRI.<br><em>SCEGLI.</em><br>PROVA.</h2><p class="lead" style="max-width:600px">La selezione online è collegata allo stock associato al negozio. Trova un prodotto, controlla la taglia e acquistalo oppure vieni a provarlo in store.</p></section>
    <section class="shop-grid" id="brandProducts">${items.length?items.map(p=>`<article class="product-card"><a href="product.html?id=${encodeURIComponent(p.id)}" class="product-image"><img src="${p.image}" alt="${p.brand} ${p.name}" loading="lazy"><span>${p.badge||'FLIP&CO'}</span></a><div class="product-meta"><div><b>${p.brand}</b><a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a></div><strong>${money(p.price)}</strong></div></article>`).join(''):'<p class="empty">NESSUN PRODOTTO ONLINE AL MOMENTO.</p>'}</section>
    <section class="section-pad" style="padding-top:90px;padding-bottom:90px;background:#d9d6ce"><span class="micro">FLIP&CO / STORE</span><h2 class="display" style="font-size:clamp(42px,6vw,80px);line-height:.9">VUOI VEDERLO<br><em>DAL VIVO?</em></h2><p>Via Italia 22, Cagliari · LUN—SAB 09:00—13:30 / 16:00—20:00</p><div class="button-row"><a class="primary" href="https://www.google.com/maps/search/?api=1&query=Via+Italia+22%2C+Cagliari" target="_blank" rel="noopener">COME ARRIVARE ↗</a><a class="secondary" href="https://wa.me/393661087819" target="_blank" rel="noopener">WHATSAPP ↗</a></div></section>`;
})();
