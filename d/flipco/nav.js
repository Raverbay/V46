(function(){
  const isInternalHtml=(a)=>{
    if(!a||a.target==='_blank'||a.hasAttribute('download')) return false;
    const href=a.getAttribute('href'); if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('javascript:')) return false;
    try{const u=new URL(href,location.href);return u.origin===location.origin && (u.pathname.endsWith('.html')||u.pathname.endsWith('/')||u.pathname===location.pathname);}catch{return false;}
  };
  function mountLoader(){
    let el=document.getElementById('pageLoader');
    if(!el){
      el=document.createElement('div');
      el.id='pageLoader';
      el.className='page-loader';
      el.setAttribute('aria-hidden','true');
      el.innerHTML='<div class="loader-inner"><img src="assets/logo-flipco-header.png" alt="Flip&Co"><span>FLIP&CO · CAGLIARI</span><i></i></div>';
      document.body.prepend(el);
    }
    requestAnimationFrame(()=>el.classList.add('is-ready'));
    const started=performance.now();
    const reveal=()=>{
      const wait=Math.max(0,520-(performance.now()-started));
      setTimeout(()=>{el.classList.add('is-hidden');el.setAttribute('aria-hidden','true')},wait);
    };
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
      setTimeout(()=>{location.href=u.href},360);
    });
    window.addEventListener('pageshow',()=>document.getElementById('pageLoader')?.classList.add('is-hidden'));
  }
  function setupMobileNav(){
    const btn=document.getElementById('menuBtn'); if(!btn)return;
    let menu=document.getElementById('mobileMenu');
    if(!menu){menu=document.createElement('div');menu.id='mobileMenu';menu.className='mobile-menu';menu.setAttribute('aria-hidden','true');menu.innerHTML='<a href="index.html">HOME</a><a href="shop.html">SHOP ONLINE</a><a href="shop.html?category=Uomo">UOMO</a><a href="shop.html?category=Donna">DONNA</a><a href="shop.html?category=Kids">KIDS</a><a href="brand.html">BRAND</a><a href="index.html#store">IL NEGOZIO</a><a href="index.html#contact">CONTATTI</a>';document.body.appendChild(menu)}
    const close=()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');btn.setAttribute('aria-expanded','false')};
    btn.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));btn.setAttribute('aria-expanded',String(open))});
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  document.addEventListener('DOMContentLoaded',()=>{mountLoader();transitions();setupMobileNav()});
})();