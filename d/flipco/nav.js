(function(){
  const CART_KEY='flipco_cart_v5';
  const esc=(v)=>String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
  const eur=(v)=>new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(Number(v)||0);
  const isInternalHtml=(a)=>{
    if(!a||a.target==='_blank'||a.hasAttribute('download')) return false;
    const href=a.getAttribute('href'); if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('javascript:')) return false;
    try{const u=new URL(href,location.href);return u.origin===location.origin && (u.pathname.endsWith('.html')||u.pathname.endsWith('/')||u.pathname===location.pathname);}catch{return false;}
  };
  const iconSearch='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.8" cy="10.8" r="6.4"></circle><path d="m16 16 5 5"></path></svg>';
  const iconBag='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.5 7h11A2.5 2.5 0 0 1 20 9.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9.5A2.5 2.5 0 0 1 6.5 7Z"></path><path d="M8.5 7V5a3.5 3.5 0 0 1 7 0v2"></path></svg>';
  const menuMarkup=()=>`<div class="menu-shell" role="dialog" aria-modal="true" aria-label="Menu principale">
    <div class="menu-top"><span class="eyebrow">FLIP&CO · CAGLIARI</span><button class="menu-close" type="button" aria-label="Chiudi menu">CHIUDI <b>×</b></button></div>
    <div class="menu-grid">
      <nav class="menu-main" aria-label="Menu principale">
        <a href="index.html">HOME <i>01</i></a><a href="shop.html">SHOP ONLINE <i>02</i></a><a href="shop.html?category=Uomo">UOMO <i>03</i></a><a href="shop.html?category=Donna">DONNA <i>04</i></a><a href="shop.html?category=Kids">KIDS <i>05</i></a><a href="brand.html">BRAND <i>06</i></a><a href="index.html#store">IL NEGOZIO <i>07</i></a><a href="index.html#contact">CONTATTI <i>08</i></a>
      </nav>
      <div class="menu-side"><span class="eyebrow">FLIP&CO / STORE</span><strong>VIA ITALIA 22<br>CAGLIARI</strong><small>LUN — SAB<br>09:00 — 13:30<br>16:00 — 20:00</small><a href="https://www.google.com/maps/search/?api=1&query=Via+Italia+22%2C+Cagliari" target="_blank" rel="noopener">COME ARRIVARE ↗</a><a href="https://www.instagram.com/flipabbigliamento/" target="_blank" rel="noopener">INSTAGRAM ↗</a></div>
    </div>
    <div class="menu-foot"><span>ONLINE · STORE · CAGLIARI</span><span>SCOPRI LA SELEZIONE.</span></div>
  </div>`;
  function mountLoader(){
    let el=document.getElementById('pageLoader');
    if(!el){el=document.createElement('div');el.id='pageLoader';el.className='page-loader';el.setAttribute('aria-hidden','true');el.innerHTML='<div class="loader-inner"><img src="assets/logo-flipco.png" alt="Flip&Co"><span>FLIP&CO · CAGLIARI</span><i></i></div>';document.body.prepend(el)}
    requestAnimationFrame(()=>el.classList.add('is-ready'));
    const started=performance.now();
    const reveal=()=>{const wait=Math.max(0,620-(performance.now()-started));setTimeout(()=>{el.classList.add('is-hidden');el.setAttribute('aria-hidden','true')},wait)};
    if(document.readyState==='complete') reveal(); else window.addEventListener('load',reveal,{once:true});
  }
  function normalizeHeader(){
    const header=document.querySelector('.site-header'); if(!header)return;
    const actions=header.querySelector('.header-actions') || (()=>{const d=document.createElement('div');d.className='header-actions';header.appendChild(d);return d})();
    if(!actions.querySelector('.header-search')){
      const s=document.createElement('button');s.className='header-search';s.type='button';s.setAttribute('aria-label','Cerca nel catalogo');s.innerHTML=iconSearch+'<span>SEARCH</span>';actions.prepend(s);
    }
    const existingCart=actions.querySelector('.cart-icon');
    if(existingCart && !existingCart.id) existingCart.id='cartTrigger';
    if(!actions.querySelector('.cart-icon')){
      const c=document.createElement('a');c.className='cart-icon';c.id='cartTrigger';c.href='shop.html#cart';c.setAttribute('aria-label','Apri carrello');c.innerHTML=iconBag+'<b id="cartCount">0</b>';actions.appendChild(c);
    }
    let btn=actions.querySelector('.menu-button');
    if(!btn){btn=document.createElement('button');btn.className='menu-button';btn.id='menuBtn';btn.type='button';btn.setAttribute('aria-label','Apri menu');btn.setAttribute('aria-expanded','false');btn.innerHTML='<span>MENU</span><i aria-hidden="true"><b></b><b></b></i>';actions.appendChild(btn)}
    const path=location.pathname.split('/').pop()||'index.html';
    header.querySelectorAll('nav:not(.menu-main) a').forEach(a=>{try{const u=new URL(a.href,location.href);a.classList.toggle('active',u.pathname.split('/').pop()===path && (!u.search || u.search===location.search));}catch{}});
  }
  function transitions(){
    document.addEventListener('click',e=>{
      const a=e.target.closest('a'); if(!isInternalHtml(a)) return;
      const href=a.getAttribute('href'); if(href==='#') return;
      let u; try{u=new URL(href,location.href)}catch{return}
      if(u.pathname===location.pathname && u.hash) return;
      const loader=document.getElementById('pageLoader'); if(!loader) return;
      e.preventDefault(); loader.classList.remove('is-hidden'); loader.classList.add('is-leaving');
      setTimeout(()=>{location.href=u.href},420);
    });
    window.addEventListener('pageshow',()=>document.getElementById('pageLoader')?.classList.add('is-hidden'));
  }
  function setupReveals(){const els=document.querySelectorAll('.reveal');if(!els.length)return;if(!('IntersectionObserver' in window)){els.forEach(x=>x.classList.add('is-visible'));return}const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target)}}),{threshold:.12,rootMargin:'0px 0px -8%'});els.forEach(x=>io.observe(x))}
  function setupMenu(){
    const btn=document.getElementById('menuBtn'); if(!btn)return;
    let menu=document.getElementById('mobileMenu');
    if(!menu){menu=document.createElement('div');menu.id='mobileMenu';menu.className='mobile-menu';menu.setAttribute('aria-hidden','true');menu.innerHTML=menuMarkup();document.body.appendChild(menu)}
    const close=()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');btn.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');btn.focus()};
    const open=()=>{menu.classList.add('open');menu.setAttribute('aria-hidden','false');btn.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');menu.querySelector('.menu-close')?.focus()};
    btn.addEventListener('click',()=>menu.classList.contains('open')?close():open());
    menu.querySelector('.menu-close')?.addEventListener('click',close);
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))close()});
  }
  let inventoryCache=null;
  async function getProducts(){if(inventoryCache)return inventoryCache;const r=await fetch('inventory/inventory.json',{cache:'no-store'});if(!r.ok)throw new Error('catalog');inventoryCache=(await r.json()).products||[];return inventoryCache}
  function searchMarkup(){return `<div class="search-shell" role="dialog" aria-modal="true" aria-label="Cerca nel catalogo"><div class="search-head"><span class="eyebrow">FLIP&CO / SEARCH</span><button class="search-close" type="button" aria-label="Chiudi ricerca">CHIUDI ×</button></div><form class="search-form"><label for="siteSearch">COSA STAI CERCANDO?</label><div class="search-input-wrap">${iconSearch}<input id="siteSearch" autocomplete="off" placeholder="Brand, prodotto, categoria…"><button type="submit">CERCA ↗</button></div></form><div class="search-meta"><span>RICERCA NELLA SELEZIONE ONLINE</span><span id="searchCount"></span></div><div class="search-results" id="searchResults"></div></div>`}
  function setupSearch(){
    const trigger=document.querySelector('.header-search');if(!trigger)return;
    const overlay=document.createElement('div');overlay.className='search-overlay';overlay.id='searchOverlay';overlay.setAttribute('aria-hidden','true');overlay.innerHTML=searchMarkup();document.body.appendChild(overlay);
    const input=overlay.querySelector('#siteSearch'),results=overlay.querySelector('#searchResults'),count=overlay.querySelector('#searchCount');
    const close=()=>{overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('search-open');trigger.focus()};
    const render=async q=>{try{const products=await getProducts();const term=q.trim().toLowerCase();const found=term?products.filter(p=>[p.name,p.brand,p.category,p.season].join(' ').toLowerCase().includes(term)).slice(0,8):products.filter(p=>p.badge==='NEW').slice(0,6);count.textContent=`${found.length} ${found.length===1?'RISULTATO':'RISULTATI'}`;results.innerHTML=found.length?found.map((p,i)=>`<a class="search-result" href="product.html?id=${encodeURIComponent(p.id)}"><span class="search-result-num">${String(i+1).padStart(2,'0')}</span><img src="${esc(p.image)}" alt="" loading="lazy"><span><small>${esc(p.brand)} · ${esc(p.category)}</small><strong>${esc(p.name)}</strong></span><b>${eur(p.price)} ↗</b></a>`).join(''):'<div class="search-empty">NESSUN RISULTATO.<br><small>Prova con un altro brand o prodotto.</small></div>';}catch{results.innerHTML='<div class="search-empty">CATALOGO NON DISPONIBILE.</div>';count.textContent='';}};
    const open=()=>{overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.classList.add('search-open');input.value='';render('');requestAnimationFrame(()=>input.focus())};
    trigger.addEventListener('click',open);overlay.querySelector('.search-close').addEventListener('click',close);overlay.addEventListener('click',e=>{if(e.target===overlay)close()});overlay.querySelector('.search-form').addEventListener('submit',e=>{e.preventDefault();render(input.value)});input.addEventListener('input',()=>render(input.value));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))close();if(e.key==='/'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){e.preventDefault();open()}});
  }
  function updateHeaderScroll(){
    const h=document.querySelector('.site-header');if(!h)return;
    const isHome=document.body.classList.contains('home-page') || /(?:^|\/)index\.html?$/.test(location.pathname) || location.pathname.endsWith('/');
    h.classList.toggle('is-home-header',isHome);
    let lastY=window.scrollY;
    let ticking=false;
    const f=()=>{
      const y=window.scrollY;
      const reveal=y>72;
      h.classList.toggle('is-revealed',isHome ? reveal : true);
      h.classList.toggle('is-scrolled',y>24);
      h.classList.toggle('is-hidden-on-scroll',isHome && y>140 && y>lastY+6);
      if(y<72) h.classList.remove('is-hidden-on-scroll');
      lastY=y;
      ticking=false;
    };
    f();
    window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(f);ticking=true}},{passive:true});
  }
  function updateCart(){document.querySelectorAll('#cartCount').forEach(el=>{try{const c=JSON.parse(localStorage.getItem(CART_KEY)||'[]');el.textContent=c.reduce((s,i)=>s+Number(i.qty||0),0)}catch{el.textContent='0'}})}
  function setupCartLinks(){document.querySelectorAll('.cart-icon').forEach(a=>a.addEventListener('click',e=>{if(document.getElementById('cartTrigger'))return;}));window.addEventListener('storage',updateCart);window.addEventListener('cartupdated',updateCart)}
  normalizeHeader();
  document.addEventListener('DOMContentLoaded',()=>{mountLoader();transitions();setupMenu();setupSearch();setupReveals();updateHeaderScroll();updateCart();setupCartLinks()});
})();
