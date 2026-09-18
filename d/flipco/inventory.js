let INVENTORY_CACHE = null;
async function loadInventory(){
  if(INVENTORY_CACHE) return INVENTORY_CACHE;
  const r = await fetch('inventory/inventory.json',{cache:'no-store'});
  if(!r.ok) throw new Error('Catalogo non disponibile');
  INVENTORY_CACHE = await r.json();
  return INVENTORY_CACHE;
}
function stockFor(p){return Object.values(p?.stock||{}).reduce((a,b)=>a+Number(b||0),0)}
function sizeStock(p,size){return Number((p?.stock||{})[size]||0)}
function productById(id){return INVENTORY_CACHE?.products?.find(p=>p.id===id)}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function money(v){return new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(Number(v)||0)}
