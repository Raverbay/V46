(() => {
  const $ = s => document.querySelector(s);
  const mount = $('#productStoryMount');
  const bagCount = $('#bagCount');
  const menuOverlay = $('#menuOverlay');
  const searchOverlay = $('#searchOverlay');
  const searchInput = $('#searchInput');
  const searchResults = $('#searchResults');
  let products = [];
  const selected = new Map();

  async function loadProducts(){
    const candidates = ['products.json','inventory/inventory.json'];
    for(const src of candidates){
      try{
        const res = await fetch(src,{cache:'no-store'});
        if(!res.ok) continue;
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.products || data.items || data.inventory || []);
        if(Array.isArray(list) && list.length){ products = normalize(list); return; }
      }catch(e){}
    }
    mount.innerHTML = '<div style="padding:80px 16px">Catalogo non disponibile.</div>';
  }

  function normalize(list){
    return list.map((p,i)=>({
      id:String(p.id ?? p.sku ?? i+1),
      brand:p.brand || p.name?.split(' ')[0] || 'FLIP&CO',
      name:p.title || p.name || 'Product',
      price:Number(p.price || 0),
      category:p.category || p.gender || '',
      sizes:Array.isArray(p.sizes)?p.sizes:(p.availableSizes||['S','M','L','XL']),
      stock:Number(p.stock ?? p.quantity ?? 1),
      image:p.image || p.imageUrl || p.images?.[0] || '',
      images:Array.isArray(p.images)?p.images:[p.image || p.imageUrl].filter(Boolean)
    }));
  }

  function money(n){ return new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(n); }

  function render(){
    const list = products.slice(0,12);
    mount.innerHTML = list.map((p,i)=>`
      <article class="product-story" data-id="${escapeHtml(p.id)}">
        <a class="story-media" href="product.html?id=${encodeURIComponent(p.id)}" aria-label="Apri ${escapeHtml(p.name)}">
          <span class="story-index">${String(i+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')}</span>
          <img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.name)}" loading="${i<2?'eager':'lazy'}">
        </a>
        <div class="story-info">
          <div class="story-top">
            <p class="story-brand">${escapeHtml(p.brand)}</p>
            <h2 class="story-name">${escapeHtml(p.name)}</h2>
            <p class="story-price">${money(p.price)}</p>
          </div>
          <div class="story-bottom">
            <div class="story-meta"><span>${escapeHtml(p.category)}</span><span>${p.stock>0?'DISPONIBILE':'ESAURITO'}</span></div>
            <div class="size-row" data-sizes>
              ${p.sizes.map(s=>`<button class="size-btn" type="button" data-size="${escapeAttr(s)}">${escapeHtml(s)}</button>`).join('')}
            </div>
            <button class="add-btn" type="button" data-add="${escapeAttr(p.id)}">${p.stock>0?'AGGIUNGI AL BAG':'NON DISPONIBILE'}</button>
            <a class="detail-link" href="product.html?id=${encodeURIComponent(p.id)}">VEDI DETTAGLI ↗</a>
          </div>
        </div>
      </article>`).join('');

    mount.querySelectorAll('[data-sizes]').forEach(row=>{
      const first=row.querySelector('.size-btn');
      if(first) first.classList.add('selected');
      row.addEventListener('click',e=>{
        const btn=e.target.closest('.size-btn'); if(!btn)return;
        row.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    mount.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>addToBag(btn)));
    updateBagCount();
  }

  function addToBag(btn){
    const story=btn.closest('.product-story');
    const id=btn.dataset.add;
    const p=products.find(x=>x.id===id);
    const size=story?.querySelector('.size-btn.selected')?.dataset.size;
    if(!p || !size || p.stock<=0)return;
    const key=`flipco-cart`;
    let cart=[]; try{cart=JSON.parse(localStorage.getItem(key)||'[]')}catch(e){}
    const existing=cart.find(x=>x.id===id && x.size===size);
    if(existing) existing.qty=Math.min((existing.qty||1)+1,p.stock);
    else cart.push({id,size,qty:1});
    localStorage.setItem(key,JSON.stringify(cart));
    btn.textContent='NEL BAG ✓';
    updateBagCount();
    setTimeout(()=>btn.textContent='AGGIUNGI AL BAG',1200);
  }

  function updateBagCount(){
    let cart=[]; try{cart=JSON.parse(localStorage.getItem('flipco-cart')||'[]')}catch(e){}
    bagCount.textContent=cart.reduce((n,x)=>n+(x.qty||1),0);
  }

  function openOverlay(el){
    el.classList.add('open'); el.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function closeOverlay(el){
    el.classList.remove('open'); el.setAttribute('aria-hidden','true');
    if(!menuOverlay.classList.contains('open')&&!searchOverlay.classList.contains('open'))document.body.style.overflow='';
  }

  $('#menuOpen').addEventListener('click',()=>openOverlay(menuOverlay));
  $('#searchOpen').addEventListener('click',()=>{openOverlay(searchOverlay);setTimeout(()=>searchInput.focus(),150)});
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeOverlay($('#'+b.dataset.close))));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeOverlay(menuOverlay);closeOverlay(searchOverlay)}
  });

  searchInput.addEventListener('input',()=>{
    const q=searchInput.value.trim().toLowerCase();
    if(!q){searchResults.innerHTML='';return}
    const hits=products.filter(p=>`${p.brand} ${p.name} ${p.category}`.toLowerCase().includes(q)).slice(0,8);
    searchResults.innerHTML=hits.map(p=>`<a class="search-result" href="product.html?id=${encodeURIComponent(p.id)}"><span>${escapeHtml(p.brand)} — ${escapeHtml(p.name)}</span><span>${money(p.price)}</span></a>`).join('') || '<p>Nessun risultato.</p>';
  });

  function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
  function escapeAttr(v){return escapeHtml(v)}

  loadProducts().then(render);
  window.addEventListener('storage',updateBagCount);
})();