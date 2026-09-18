let INVENTORY=null;
async function loadInventory(){
  if(INVENTORY) return INVENTORY;
  const response=await fetch('inventory/inventory.json',{cache:'no-store'});
  if(!response.ok) throw new Error('Impossibile caricare l\'inventario.');
  INVENTORY=await response.json();
  return INVENTORY;
}
function stockFor(p){return Object.values(p?.stock||{}).reduce((a,b)=>a+Number(b||0),0)}
function sizeStock(p,s){return Number((p?.stock||{})[s]||0)}
function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function productById(id){return INVENTORY?.products?.find(p=>p.id===id)}
