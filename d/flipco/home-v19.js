(function(){
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const money=v=>new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(Number(v)||0);
  const stock=p=>Object.values(p.stock||{}).reduce((a,b)=>a+Number(b||0),0);
  const image=(p,cls='')=>`<a class="v20-card ${cls}" href="product.html?id=${encodeURIComponent(p.id)}"><div class="v20-card-media"><img src="${esc(p.image)}" alt="${esc(p.brand+' '+p.name)}" loading="lazy"><span>${esc(p.badge||'')}</span></div><div class="v20-card-info"><small>${esc(p.brand)}</small><strong>${esc(p.name)}</strong><b>${money(p.price)}</b></div></a>`;
  async function init(){
    try{
      const d=await loadInventory(); const all=(d.products||[]).filter(p=>stock(p)>0);
      renderHero(all); renderNew(all); renderCategory(all,'Uomo','catUomo'); renderCategory(all,'Donna','catDonna'); renderCategory(all,'Kids','catKids'); renderBrands(all);
    }catch(e){console.warn('Flip&Co home catalog',e)}
    setupReveal(); setupHeroParallax();
  }
  function renderHero(products){
    const chosen=[...products].sort((a,b)=>(b.badge==='NEW')-(a.badge==='NEW')).slice(0,3); const stage=document.getElementById('heroStage'); if(!stage||!chosen.length)return;
    stage.innerHTML=chosen.map((p,i)=>`<a class="v20-hero-slide ${i===0?'is-active':''}" href="product.html?id=${encodeURIComponent(p.id)}" data-i="${i}"><img src="${esc(p.image)}" alt="${esc(p.brand+' '+p.name)}"><div class="v20-hero-wash"></div></a>`).join('');
    const brand=document.getElementById('heroBrand'),name=document.getElementById('heroName'),meta=document.getElementById('heroMeta'),link=document.getElementById('heroLink'),cur=document.getElementById('heroCurrent'),tot=document.getElementById('heroTotal');
    tot.textContent=String(chosen.length).padStart(2,'0'); let i=0;
    const paint=()=>{const p=chosen[i];brand.textContent=p.brand;name.textContent=p.name.toUpperCase();meta.textContent=`${p.category.toUpperCase()} · ${p.season||'NEW IN'}`;link.href=`product.html?id=${encodeURIComponent(p.id)}`;cur.textContent=String(i+1).padStart(2,'0');stage.querySelectorAll('.v20-hero-slide').forEach((s,n)=>s.classList.toggle('is-active',n===i));};
    paint(); if(chosen.length>1)setInterval(()=>{i=(i+1)%chosen.length;paint()},5200);
  }
  function renderNew(all){const root=document.getElementById('homeProducts'); if(root)root.innerHTML=all.slice(0,6).map(image).join('')}
  function renderCategory(all,cat,id){const root=document.getElementById(id); if(!root)return; const items=all.filter(p=>p.category===cat).slice(0,2); root.innerHTML=items.map((p,i)=>image(p,i===0?'is-large':'')).join('');}
  function renderBrands(all){const root=document.getElementById('brandStrip'); if(!root)return; const brands=[...new Set(all.map(p=>p.brand))]; root.innerHTML=brands.map((b,i)=>`<a href="shop.html?brand=${encodeURIComponent(b)}"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(b)}</strong><b>↗</b></a>`).join('')}
  function setupHeroParallax(){const hero=document.querySelector('.v20-hero');if(!hero)return;const move=()=>{hero.style.setProperty('--hero-y',Math.min(window.scrollY,hero.offsetHeight)*.055+'px')};window.addEventListener('scroll',move,{passive:true});move()}
  function setupReveal(){const nodes=document.querySelectorAll('.reveal-v20');if(!('IntersectionObserver'in window)){nodes.forEach(n=>n.classList.add('is-visible'));return}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -8%'});nodes.forEach(n=>io.observe(n))}
  document.addEventListener('DOMContentLoaded',init);
})();
