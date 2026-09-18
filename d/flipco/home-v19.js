(function(){
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const money=v=>new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(Number(v)||0);
  function stock(p){return Object.values(p.stock||{}).reduce((a,b)=>a+Number(b||0),0)}
  function card(p){
    const available=stock(p);
    return `<a class="v19-product" href="product.html?id=${encodeURIComponent(p.id)}">
      <div class="v19-product-media"><img src="${esc(p.image)}" alt="${esc(p.brand+' '+p.name)}" loading="lazy"><span class="v19-product-index">${String(p.id).slice(-2)}</span>${p.badge?`<span class="v19-product-badge">${esc(p.badge)}</span>`:''}<span class="v19-product-quick">VEDI PRODOTTO <b>↗</b></span></div>
      <div class="v19-product-info"><span>${esc(p.brand)}</span><h3>${esc(p.name)}</h3><strong>${money(p.price)}</strong><small>${available ? 'DISPONIBILE ONLINE' : 'ESAURITO'}</small></div>
    </a>`;
  }
  async function init(){
    try{
      const d=await loadInventory();
      const products=(d.products||[]).filter(p=>stock(p)>0).slice(0,6);
      const root=document.getElementById('homeProducts');
      if(root) root.innerHTML=products.map(card).join('');
    }catch(e){console.warn('Flip&Co home catalog',e)}
    setupHeroMotion();
    setupReveal();
  }
  function setupHeroMotion(){
    const hero=document.querySelector('.v19-hero'); if(!hero)return;
    const img=hero.querySelector('.v19-hero-media img');
    let raf=0;
    const update=()=>{raf=0;const y=Math.min(window.scrollY,hero.offsetHeight); if(img)img.style.transform=`translate3d(0,${y*.08}px,0) scale(${1+Math.min(y/hero.offsetHeight*.025,.025)})`;hero.style.setProperty('--hero-progress',Math.min(y/hero.offsetHeight,1));};
    window.addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(update);document.body.classList.toggle('nav-scrolled',window.scrollY>28)},{passive:true});document.body.classList.toggle('nav-scrolled',window.scrollY>28);update();
  }
  function setupReveal(){
    const nodes=document.querySelectorAll('.v19-products,.v19-categories,.v19-campaign,.v19-store,.v19-final,.v19-intro');
    if(!('IntersectionObserver' in window)){nodes.forEach(n=>n.classList.add('v19-in'));return}
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v19-in');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -7%'});
    nodes.forEach(n=>io.observe(n));
  }
  document.addEventListener('DOMContentLoaded',init);
})();
