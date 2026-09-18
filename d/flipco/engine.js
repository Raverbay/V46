async function initHome(){
  try{
    const data=await loadInventory();
    const ps=data.products||[];
    const h=document.getElementById('homeProducts');
    if(h)h.innerHTML=ps.slice(0,4).map(p=>`<a class="product-card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-media"><span class="badge">${escapeHtml(p.badge||'')}</span><img src="${p.image}" alt="${escapeHtml(p.brand+' '+p.name)}" loading="lazy"></div><div class="product-info"><span>${escapeHtml(p.brand)}</span><h3>${escapeHtml(p.name)}</h3><p>${money(p.price)}</p></div></a>`).join('');
    const brands=[...new Set(ps.map(p=>p.brand))].sort();
    const b=document.getElementById('brandList');
    if(b)b.innerHTML=brands.map(x=>`<a href="shop.html?brand=${encodeURIComponent(x)}"><span>${escapeHtml(x)}</span><b>↗</b></a>`).join('');
    const candidates=ps.filter(p=>p.image && ['NEW','JUST IN','DROP'].includes(String(p.badge||'').toUpperCase()));
    const slides=(candidates.length?candidates:ps).slice(0,3);
    const hero=document.getElementById('heroShowcase');
    if(hero&&slides.length){
      hero.innerHTML=slides.map((p,i)=>`<a class="hero-slide ${i===0?'is-active':''}" href="product.html?id=${encodeURIComponent(p.id)}" aria-hidden="${i!==0}"><img src="${p.image}" alt="${escapeHtml(p.brand+' '+p.name)}" ${i===0?'fetchpriority="high"':'loading="lazy"'}><div class="hero-slide-shade"></div><div class="hero-product"><span>${escapeHtml(p.badge||'NEW ARRIVAL')} · ${escapeHtml(p.brand)}</span><strong>${escapeHtml(p.name)}</strong><small>${money(p.price)} · SCOPRI →</small></div></a>`).join('');
      const dots=document.getElementById('heroDots'); if(dots)dots.innerHTML=slides.map((_,i)=>`<button type="button" aria-label="Vedi prodotto ${i+1}" class="${i===0?'active':''}"></button>`).join('');
      let index=0;
      const show=(n)=>{const all=[...hero.querySelectorAll('.hero-slide')]; if(!all.length)return; index=(n+all.length)%all.length; all.forEach((s,i)=>{s.classList.toggle('is-active',i===index);s.setAttribute('aria-hidden',String(i!==index))});dots?.querySelectorAll('button').forEach((d,i)=>d.classList.toggle('active',i===index));};
      dots?.querySelectorAll('button').forEach((d,i)=>d.addEventListener('click',()=>show(i)));
      if(slides.length>1){let timer=setInterval(()=>show(index+1),6000);hero.addEventListener('mouseenter',()=>clearInterval(timer));hero.addEventListener('mouseleave',()=>{clearInterval(timer);timer=setInterval(()=>show(index+1),6000)});}
    }
  }catch(err){console.error('Flip&Co home init',err)}
}
document.addEventListener('DOMContentLoaded',initHome);