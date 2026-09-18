(async function(){
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const cfg=await fetch('content.json').then(r=>r.json());
  const root=document.documentElement, site=cfg.site;
  root.style.setProperty('--accent',site.accent||'#b8ff38');
  root.style.setProperty('--bg',site.background||'#f2f0ea');
  root.style.setProperty('--paper',site.background||'#f2f0ea');
  root.style.setProperty('--ink',site.ink||'#11120f');
  document.title=`${site.brandName} — ${site.tagline}`;
  const set=(id,v)=>{const e=$(id);if(e)e.textContent=v||''};
  const setHTML=(id,v)=>{const e=$(id);if(e)e.innerHTML=v||''};
  const asset=n=>n?`assets/${n}`:'';

  ['#navLogo','#heroLogo','#footerLogo'].forEach(sel=>{const e=$(sel);if(!e)return; const rel=asset(cfg.hero.logo); e.src=rel; e.onerror=()=>{e.onerror=null; e.src='./assets/logo-flipco.png';};});
  set('#heroKicker',cfg.hero.kicker); set('#heroMeta',cfg.hero.meta);
  setHTML('#heroHeadline',cfg.hero.headline.map(x=>`<span>${x}</span>`).join(''));
  set('#introTitle',site.introTitle); set('#introLead',site.introLead); set('#introBody',site.introBody);

  const bg=$('#brandGrid');
  const filterBar=$('#brandFilterBar');
  const brandCount=$('#brandCount');
  const categoryKey=w=>String(w.name||'').toUpperCase();
  const allWorldNames=(cfg.worlds||[]).map(categoryKey);
  const teenSlugs=((cfg.worlds||[]).find(w=>categoryKey(w)==='TEENS')||{}).brandSlugs||[];
  const brandsFor=(category)=>{
    if(category==='TUTTI') return cfg.brands;
    if(category==='TEENS') return cfg.brands.filter(b=>teenSlugs.includes(b.slug));
    return cfg.brands.filter(b=>(b.collection.worlds||[]).map(x=>String(x).toUpperCase()).includes(category));
  };
  const logoSlug={
    'Tommy Hilfiger':'tommyhilfiger','Calvin Klein':'calvinklein','Guess':'guess','Levi\'s':'levis',
    'The North Face':'thenorthface','Nike':'nike','adidas':'adidas','Vans':'vans','Carhartt':'carhartt',
    'New Balance':'newbalance','Timberland':'timberland','Dickies':'dickies','ONLY':'only',
    'Jack & Jones':'jackandjones','Vero Moda':'veromoda','name it':'nameit'
  };
  const renderBrands=(category='TUTTI')=>{
    const list=brandsFor(category);
    bg.innerHTML='';
    list.forEach((b,i)=>{
      const a=document.createElement('a'); a.className='brand-item reveal'; a.href=`brand.html?brand=${encodeURIComponent(b.slug)}`; a.style.setProperty('--i',i);
      const logoDomain=b.logoDomain||new URL(b.url).hostname.replace(/^www\./,'');
      const simpleSlug=logoSlug[b.name];
      const simpleLogo=simpleSlug?`https://cdn.simpleicons.org/${simpleSlug}`:'';
      const hunterLogo=`https://logos.hunter.io/${logoDomain}`;
      a.innerHTML=`<span class="brand-number">${String(i+1).padStart(2,'0')}</span><div class="brand-logo-wrap"><img class="brand-logo-img" src="${simpleLogo||hunterLogo}" data-hunter="${hunterLogo}" alt="${b.name} logo" loading="lazy" decoding="async"><span class="brand-fallback">${b.name}</span></div><div class="brand-name-hidden">${b.name}</div><span class="brand-arrow">↗</span>`;
      const img=a.querySelector('img');
      img.addEventListener('error',()=>{
        if(img.src!==hunterLogo){ img.src=hunterLogo; return; }
        img.style.display='none'; img.parentElement.classList.add('logo-fallback');
      },{once:false});
      bg.appendChild(a);
    });
    if(brandCount) brandCount.textContent=list.length;
    bg.querySelectorAll('.reveal').forEach(e=>observer?.observe?.(e));
    return list.length;
  };
  if(filterBar){
    const cats=['TUTTI',...allWorldNames];
    cats.forEach(cat=>{
      const b=document.createElement('button'); b.type='button'; b.className='brand-filter'; b.dataset.category=cat; b.textContent=cat==='TUTTI'?'TUTTI I BRAND':cat;
      b.addEventListener('click',()=>applyCategory(cat,true)); filterBar.appendChild(b);
    });
  }
  let currentCategory='TUTTI';
  const applyCategory=(category='TUTTI',scroll=false)=>{
    const cat=String(category).toUpperCase(); currentCategory=allWorldNames.includes(cat)||cat==='TUTTI'?cat:'TUTTI';
    renderBrands(currentCategory);
    filterBar?.querySelectorAll('.brand-filter').forEach(b=>b.classList.toggle('active',b.dataset.category===currentCategory));
    if(scroll) document.querySelector('#brands')?.scrollIntoView({behavior:'smooth',block:'start'});
  };

  set('#storyKicker',cfg.story.kicker); setHTML('#storyTitle',cfg.story.title.map(x=>`${x}<br>`).join('')); set('#storyBody',cfg.story.body);
  const sf=$('#storyFacts'); cfg.story.facts.forEach(x=>{const d=document.createElement('div');d.textContent=x;sf.appendChild(d)});
  set('#storeKicker',cfg.store.kicker); setHTML('#storeTitle',cfg.store.title.map(x=>`${x}<br>`).join('')); set('#storeAddress',cfg.store.address); set('#storeHours',cfg.store.hours); set('#storePhone',cfg.store.phone);
  $('#mapLink').href=cfg.store.maps; $('#waLink').href=`https://wa.me/${cfg.store.whatsapp}`; $('#floatingMaps').href=cfg.store.maps; $('#floatingContact').href=`https://wa.me/${cfg.store.whatsapp}`; $('#menuLocation').textContent=cfg.store.address; $('#menuWhatsapp').href=`https://wa.me/${cfg.store.whatsapp}`;
  set('#rating',cfg.reviews.rating); set('#reviewCount',cfg.reviews.count); set('#reviewTitle',cfg.reviews.title); set('#reviewBody',cfg.reviews.body);
  setHTML('#contactTitle',cfg.contact.title.map(x=>`${x}<br>`).join('')); set('#contactMeta',`${site.brandName} · ${cfg.store.address}`); $('#instagramLink').href=cfg.contact.instagram; $('#contactWa').href=`https://wa.me/${cfg.contact.whatsapp}`;

  const navItems=[['UN SOLO MODO DI ESSERE','#campaign'],['BRAND','#brands'],['SHOP','#shop'],['IL CODICE','#story'],['IL NEGOZIO','#store'],['CONTATTI','#contact']];
  const n=$('#mobileNav'); navItems.forEach(([label,href])=>{const a=document.createElement('a');a.href=href;a.textContent=label;n.appendChild(a)});
  $$('.language button').forEach(btn=>btn.addEventListener('click',()=>{$$('.language button').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}));
  const menuButton=$('#menuButton'),panel=$('#menuPanel');
  menuButton.addEventListener('click',()=>{panel.classList.toggle('open');document.body.classList.toggle('lock');panel.setAttribute('aria-hidden',String(!panel.classList.contains('open')))});
  $$('#menuPanel a').forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');document.body.classList.remove('lock')}));


  // E-COMMERCE PROTOTYPE — V1
  const products=[
    {id:'fc-001',name:'ESSENTIAL HOODIE',brand:'Flip&Co',cat:'UOMO',price:89,code:'FC / 001'},
    {id:'fc-002',name:'DENIM SIGNATURE',brand:"Levi's",cat:'DONNA',price:119,code:'FC / 002'},
    {id:'fc-003',name:'ICON JACKET',brand:'The North Face',cat:'TEENS',price:179,code:'FC / 003'},
    {id:'fc-004',name:'CLASSIC TEE',brand:'Tommy Hilfiger',cat:'UOMO',price:59,code:'FC / 004'},
    {id:'fc-005',name:'MINIMAL BAG',brand:'Calvin Klein',cat:'DONNA',price:99,code:'FC / 005'},
    {id:'fc-006',name:'STREET SNEAKER',brand:'Vans',cat:'TEENS',price:85,code:'FC / 006'},
    {id:'fc-007',name:'ORIGINAL DENIM',brand:"Levi's",cat:'BAMBINO',price:69,code:'FC / 007'},
    {id:'fc-008',name:'SPORT ICON',brand:'Nike',cat:'BAMBINO',price:79,code:'FC / 008'}
  ];
  const productGrid=$('#productGrid'), cartDrawer=$('#cartDrawer'), cartItems=$('#cartItems');
  let cart=[];
  const euro=n=>new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(n);
  const renderProducts=(filter='ALL')=>{
    if(!productGrid)return;
    const list=filter==='ALL'?products:products.filter(p=>p.cat===filter);
    productGrid.innerHTML=list.map((p,i)=>`
      <article class="product-card reveal">
        <div class="product-visual p${(i%6)+1}">
          <span>${p.code}</span><b>${p.brand}</b>
          <i>FLIP&CO</i>
        </div>
        <div class="product-info">
          <div><span class="micro">${p.cat}</span><h3>${p.name}</h3></div>
          <strong>${euro(p.price)}</strong>
        </div>
        <button class="product-add" data-add="${p.id}" type="button">AGGIUNGI AL CARRELLO <span>+</span></button>
      </article>`).join('');
    productGrid.querySelectorAll('.product-add').forEach(btn=>btn.addEventListener('click',()=>addToCart(btn.dataset.add)));
    productGrid.querySelectorAll('.reveal').forEach(e=>observer?.observe?.(e));
  };
  const renderCart=()=>{
    if(!cartItems)return;
    if(!cart.length){
      cartItems.innerHTML='<div class="cart-empty"><span>00</span><h4>IL CARRELLO È VUOTO.</h4><p>Scopri la selezione e aggiungi i tuoi preferiti.</p></div>';
    }else{
      cartItems.innerHTML=cart.map(item=>`
        <div class="cart-item">
          <div><span class="micro">${item.brand} · ${item.cat}</span><h4>${item.name}</h4><span>${euro(item.price)}</span></div>
          <div class="cart-qty"><button data-dec="${item.id}">−</button><b>${item.qty}</b><button data-inc="${item.id}">+</button></div>
        </div>`).join('');
      cartItems.querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>changeQty(b.dataset.inc,1));
      cartItems.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>changeQty(b.dataset.dec,-1));
    }
    const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>s+x.price*x.qty,0);
    $('#cartCount').textContent=count; $('#cartTotal').textContent=euro(total);
  };
  const addToCart=id=>{
    const p=products.find(x=>x.id===id); if(!p)return;
    const found=cart.find(x=>x.id===id);
    if(found)found.qty++; else cart.push({...p,qty:1});
    renderCart(); openCart();
  };
  const changeQty=(id,delta)=>{
    const item=cart.find(x=>x.id===id); if(!item)return;
    item.qty+=delta; if(item.qty<=0)cart=cart.filter(x=>x.id!==id); renderCart();
  };
  const openCart=()=>{cartDrawer?.classList.add('open');cartDrawer?.setAttribute('aria-hidden','false');document.body.classList.add('lock')};
  const closeCart=()=>{cartDrawer?.classList.remove('open');cartDrawer?.setAttribute('aria-hidden','true');document.body.classList.remove('lock')};
  $('#cartOpen')?.addEventListener('click',openCart); $('#cartClose')?.addEventListener('click',closeCart); $('#cartX')?.addEventListener('click',closeCart);
  $('#checkoutButton')?.addEventListener('click',()=>alert('Checkout demo: qui collegheremo il sistema di pagamento reale di Flip&Co.'));
  $$('.ecom-filter').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.ecom-filter').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderProducts(btn.dataset.filter);
  }));

  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  $$('.reveal,.heading-reveal').forEach(e=>observer.observe(e));
  renderProducts(); renderCart();
  const hashCategory=(location.hash.match(/^#brands-(.+)$/i)||[])[1];
  applyCategory(hashCategory?decodeURIComponent(hashCategory).toUpperCase():'TUTTI',false);
  addEventListener('hashchange',()=>{const m=location.hash.match(/^#brands-(.+)$/i);if(m)applyCategory(decodeURIComponent(m[1]).toUpperCase(),false)});
  // V26 — category links are real interactive controls and scroll to the Brand Atlas
  $$('#campaign .editorial-links a[data-category-link]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    const cat=String(a.dataset.categoryLink||'').toUpperCase();
    applyCategory(cat,true);
    history.replaceState(null,'',`#brands-${encodeURIComponent(cat.toLowerCase())}`);
  }));
  let ticking=false; const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;const p=$('.progress span');if(p)p.style.width=(max>0?(scrollY/max)*100:0)+'%';ticking=false};
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true}); addEventListener('resize',update); update();
  setTimeout(()=>document.body.classList.add('loaded'),900);
})();
