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

  const wg=$('#worldGrid');
  const bg=$('#brandGrid');
  const filterBar=$('#brandFilterBar');
  const brandCount=$('#brandCount');
  const categoryKey=w=>String(w.name||'').toUpperCase();
  const allWorldNames=cfg.worlds.map(categoryKey);
  const teenSlugs=(cfg.worlds.find(w=>categoryKey(w)==='TEENS')||{}).brandSlugs||[];
  const brandsFor=(category)=>{
    if(category==='TUTTI') return cfg.brands;
    if(category==='TEENS') return cfg.brands.filter(b=>teenSlugs.includes(b.slug));
    return cfg.brands.filter(b=>(b.collection.worlds||[]).map(x=>String(x).toUpperCase()).includes(category));
  };
  const renderBrands=(category='TUTTI')=>{
    const list=brandsFor(category);
    bg.innerHTML='';
    list.forEach((b,i)=>{
      const a=document.createElement('a'); a.className='brand-item reveal'; a.href=`brand.html?brand=${encodeURIComponent(b.slug)}`; a.style.setProperty('--i',i);
      a.innerHTML=`<span class="brand-number">${String(i+1).padStart(2,'0')}</span><div class="brand-logo-wrap"><img src="https://cdn.simpleicons.org/${b.slug}/11120f" alt="${b.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('logo-fallback')"><span class="brand-fallback">${b.name}</span></div><div class="brand-name-hidden">${b.name}</div><span class="brand-arrow">↗</span>`;
      bg.appendChild(a);
    });
    if(brandCount) brandCount.textContent=list.length;
    bg.querySelectorAll('.reveal').forEach(e=>observer?.observe?.(e));
    return list.length;
  };
  cfg.worlds.forEach((w,i)=>{
    const a=document.createElement('a');
    a.className='world-card reveal';
    const cat=categoryKey(w);
    a.href=`#brands-${encodeURIComponent(cat.toLowerCase())}`;
    a.dataset.category=cat;
    a.innerHTML=`<span class="world-number">${w.label}</span><div><h3>${w.name}</h3><p>${w.description}</p></div><span class="world-arrow">↗</span>`;
    a.addEventListener('click',()=>setTimeout(()=>applyCategory(cat,true),0));
    wg.appendChild(a);
  });
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

  const navItems=[['MODI DI ESSERE','#worlds'],['BRAND','#brands'],['IL CODICE','#story'],['IL NEGOZIO','#store'],['CONTATTI','#contact']];
  const n=$('#mobileNav'); navItems.forEach(([label,href])=>{const a=document.createElement('a');a.href=href;a.textContent=label;n.appendChild(a)});
  $$('.language button').forEach(btn=>btn.addEventListener('click',()=>{$$('.language button').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}));
  const menuButton=$('#menuButton'),panel=$('#menuPanel');
  menuButton.addEventListener('click',()=>{panel.classList.toggle('open');document.body.classList.toggle('lock');panel.setAttribute('aria-hidden',String(!panel.classList.contains('open')))});
  $$('#menuPanel a').forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');document.body.classList.remove('lock')}));

  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  $$('.reveal,.heading-reveal').forEach(e=>observer.observe(e));
  const hashCategory=(location.hash.match(/^#brands-(.+)$/i)||[])[1];
  applyCategory(hashCategory?decodeURIComponent(hashCategory).toUpperCase():'TUTTI',false);
  addEventListener('hashchange',()=>{const m=location.hash.match(/^#brands-(.+)$/i);if(m)applyCategory(decodeURIComponent(m[1]).toUpperCase(),false)});
  let ticking=false; const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;const p=$('.progress span');if(p)p.style.width=(max>0?(scrollY/max)*100:0)+'%';ticking=false};
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true}); addEventListener('resize',update); update();
  setTimeout(()=>document.body.classList.add('loaded'),900);
})();
