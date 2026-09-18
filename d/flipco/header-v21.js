(function(){
  'use strict';
  const header=document.querySelector('.site-header');
  if(!header) return;
  // Rebuild the control layer without touching the catalogue/search/cart logic.
  const brand=header.querySelector('.brand-logo');
  let nav=header.querySelector('nav');
  let actions=header.querySelector('.header-actions');
  if(!actions){ actions=document.createElement('div'); actions.className='header-actions'; header.appendChild(actions); }
  let menu=actions.querySelector('.menu-button');
  if(!menu){
    menu=document.createElement('button'); menu.className='menu-button'; menu.id='menuBtn'; menu.type='button'; menu.setAttribute('aria-label','Apri menu'); menu.setAttribute('aria-expanded','false');
    menu.innerHTML='<span>MENU</span><i aria-hidden="true"><b></b><b></b></i>';
  }
  // Move menu control into the left grid area. nav remains present only for semantic desktop structure.
  if(nav) nav.prepend(menu); else header.prepend(menu);
  if(!actions.contains(menu)) actions.appendChild(menu);

  // Account icon is intentionally a navigation affordance, not a fake account system.
  if(!actions.querySelector('.account-link')){
    const a=document.createElement('a');
    a.className='account-link'; a.href='checkout.html'; a.setAttribute('aria-label','Area cliente');
    a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"></circle><path d="M5.5 20c.9-3.6 3.1-5.4 6.5-5.4s5.6 1.8 6.5 5.4"></path></svg>';
    actions.appendChild(a);
  }
  // Ensure order: search, account, bag.
  const search=actions.querySelector('.header-search');
  const account=actions.querySelector('.account-link');
  const bag=actions.querySelector('.cart-icon');
  [menu,search,account,bag].forEach(x=>x&&x.remove());
  header.querySelector('nav')?.prepend(menu);
  actions.append(menu);
  if(search) actions.append(search);
  if(account) actions.append(account);
  if(bag) actions.append(bag);

  // The old homepage stop/start state is deliberately disabled: the header behaves like a stable fashion-commerce chrome.
  header.classList.add('fx-v21');
  let ticking=false,lastY=window.scrollY;
  const sync=()=>{
    const y=window.scrollY;
    header.classList.toggle('fx-scrolled',y>8);
    lastY=y;
    ticking=false;
  };
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(sync)}},{passive:true});
  sync();
})();
