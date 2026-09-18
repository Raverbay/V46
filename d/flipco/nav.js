(function(){
  const isInternalHtml=(a)=>{
    if(!a||a.target==='_blank'||a.hasAttribute('download')) return false;
    const href=a.getAttribute('href'); if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('javascript:')) return false;
    try{const u=new URL(href,location.href);return u.origin===location.origin && (u.pathname.endsWith('.html')||u.pathname.endsWith('/')||u.pathname===location.pathname);}catch{return false;}
  };
  const menuMarkup=()=>`<div class="menu-shell" role="dialog" aria-modal="true" aria-label="Menu principale">
    <div class="menu-top"><span class="eyebrow">FLIP&CO · CAGLIARI</span><button class="menu-close" type="button" aria-label="Chiudi menu">CHIUDI ×</button></div>
    <div class="menu-grid">
      <nav class="menu-main" aria-label="Menu principale">
        <a href="index.html">HOME <i>01</i></a><a href="shop.html">SHOP ONLINE <i>02</i></a><a href="shop.html?category=Uomo">UOMO <i>03</i></a><a href="shop.html?category=Donna">DONNA <i>04</i></a><a href="shop.html?category=Kids">KIDS <i>05</i></a><a href="brand.html">BRAND <i>06</i></a><a href="index.html#store">IL NEGOZIO <i>07</i></a><a href="index.html#contact">CONTATTI <i>08</i></a>
      </nav>
      <div class="menu-side"><span class="eyebrow">VIENI A TROVARCI</span><strong>VIA ITALIA 22<br>CAGLIARI</strong><small>LUN — SAB<br>09:00 — 13:30<br>16:00 — 20:00</small><a href="https://www.google.com/maps/search/?api=1&query=Via+Italia+22%2C+Cagliari" target="_blank" rel="noopener">COME ARRIVARE ↗</a></div>
    </div>
  </div>`;
  function mountLoader(){
    let el=document.getElementById('pageLoader');
    if(!el){el=document.createElement('div');el.id='pageLoader';el.className='page-loader';el.setAttribute('aria-hidden','true');el.innerHTML='<div class="loader-inner"><img src="assets/logo-flipco.png" alt="Flip&Co"><span>FLIP&CO · CAGLIARI</span><i></i></div>';document.body.prepend(el)}
    requestAnimationFrame(()=>el.classList.add('is-ready'));
    const started=performance.now();
    const reveal=()=>{const wait=Math.max(0,620-(performance.now()-started));setTimeout(()=>{el.classList.add('is-hidden');el.setAttribute('aria-hidden','true')},wait)};
    if(document.readyState==='complete') reveal(); else window.addEventListener('load',reveal,{once:true});
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
    const close=()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');btn.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')};
    const open=()=>{menu.classList.add('open');menu.setAttribute('aria-hidden','false');btn.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');menu.querySelector('.menu-close')?.focus()};
    btn.addEventListener('click',()=>menu.classList.contains('open')?close():open());
    menu.querySelector('.menu-close')?.addEventListener('click',close);
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))close()});
  }
  document.addEventListener('DOMContentLoaded',()=>{mountLoader();transitions();setupMenu();setupReveals()});
})();