const products = [
  {article:'HLT-805', title:'Фильтр салона угольный для BYD Song Plus', oem:'12675978-00; 12975836-00', fit:'BYD Song Plus', status:'ready', statusText:'Готово', updated:'сегодня', sales:'₸ 376 500'},
  {article:'563663_wxqp', title:'Ступица передняя Chevrolet Spark M400', oem:'13506399', fit:'Chevrolet Spark M400', status:'ready', statusText:'Готово', updated:'сегодня', sales:'₸ 184 000'},
  {article:'13502873', title:'Ступица задняя Chevrolet Cruze', oem:'13502873; 13591999', fit:'Chevrolet Cruze', status:'review', statusText:'Проверка', updated:'вчера', sales:'₸ 162 000'},
  {article:'510243', title:'Вкладыши шатунные 0,25 для Daewoo Nexia', oem:'—', fit:'Daewoo Nexia', status:'error', statusText:'Нужен OEM', updated:'вчера', sales:'₸ 54 000'},
  {article:'52168087', title:'Поперечина рамки радиатора Chevrolet Onix', oem:'52168087', fit:'Chevrolet Onix 2022+', status:'ready', statusText:'Готово', updated:'2 дня', sales:'₸ 120 000'},
  {article:'52027637', title:'Усилитель переднего бампера Chevrolet Cobalt', oem:'52027637', fit:'Cobalt / R4', status:'ready', statusText:'Готово', updated:'2 дня', sales:'₸ 96 000'},
  {article:'1.15.JT01', title:'Защита картера двигателя Jetour X70', oem:'—', fit:'Jetour X70', status:'review', statusText:'Проверка', updated:'3 дня', sales:'₸ 75 000'},
  {article:'1.15.CH01', title:'Защита картера двигателя Chevrolet Nexia R3', oem:'—', fit:'Nexia R3 / Ravon R3', status:'ready', statusText:'Готово', updated:'3 дня', sales:'₸ 61 500'}
];

const recent = products.slice(0,6);

const pages = {
  dashboard:['StartAuto','Главная'],products:['Каталог','Товары'],editor:['Контент','Редактор карточек'],analytics:['Продажи','Аналитика'],photos:['Контент','Фото'],research:['AI','Исследование'],settings:['System','Настройки']
};

function rowHtml(p){
  const cls = p.status === 'ready' ? 'green' : p.status === 'review' ? 'amber' : 'red';
  return `<tr><td><input type="checkbox"></td><td><b>${p.article}</b></td><td>${p.title}</td><td>${p.oem}</td><td>${p.fit}</td><td><span class="badge ${cls}">${p.statusText}</span></td><td>${p.updated}</td><td><button class="ghost-btn small" data-open="editor">Открыть</button></td></tr>`;
}
function recentHtml(p){
  const cls = p.status === 'ready' ? 'green' : p.status === 'review' ? 'amber' : 'red';
  return `<tr><td><b>${p.article}</b></td><td>${p.title}</td><td>${p.oem}</td><td><span class="badge ${cls}">${p.statusText}</span></td><td>${p.sales}</td><td><button class="ghost-btn small" data-open="editor">›</button></td></tr>`;
}

document.getElementById('recentBody').innerHTML = recent.map(recentHtml).join('');
document.getElementById('productsBody').innerHTML = products.map(rowHtml).join('');

document.querySelectorAll('.nav-item[data-view]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.view)));
document.querySelectorAll('[data-view-link]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.viewLink)));
document.querySelectorAll('[data-open]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.open)));

function showView(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  const el = document.getElementById('view-'+view);
  if(el) el.classList.add('active-view');
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  const [eyebrow,title] = pages[view] || ['StartAuto','Главная'];
  document.getElementById('pageEyebrow').textContent = eyebrow;
  document.getElementById('pageTitle').textContent = title;
  window.scrollTo({top:0,behavior:'smooth'});
}

const toast = document.getElementById('toast');
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400)}

document.getElementById('syncBtn').addEventListener('click',()=>showToast('Демо-синхронизация запущена. В рабочей версии здесь будет Ozon Seller API.'));
document.getElementById('processBtn').addEventListener('click',()=>{showToast('Запущено исследование 25 товаров.');showView('research')});
document.querySelectorAll('.editor-actions button').forEach((b,i)=>b.addEventListener('click',()=>showToast(i===2?'Карточка отправлена в очередь публикации.':'Изменения сохранены.')));
document.querySelectorAll('.ghost-btn').forEach(b=>{if(!b.dataset.viewLink && !b.dataset.open) b.addEventListener('click',()=>showToast('Действие доступно после подключения интеграции.'))});

const search=document.getElementById('productSearch');
const statusFilter=document.getElementById('statusFilter');
function refreshProducts(){
  const q=(search?.value||'').toLowerCase(); const st=statusFilter?.value||'all';
  const arr=products.filter(p=>(st==='all'||p.status===st) && [p.article,p.title,p.oem,p.fit].join(' ').toLowerCase().includes(q));
  document.getElementById('productsBody').innerHTML=arr.map(rowHtml).join('');
  document.getElementById('productCount').textContent=arr.length;
  document.querySelectorAll('[data-open]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.open)));
}
search?.addEventListener('input',refreshProducts);statusFilter?.addEventListener('change',refreshProducts);

// lightweight image upload preview
const drop = document.querySelector('.dropzone');
if(drop){
  drop.addEventListener('click',()=>{
    const i=document.createElement('input'); i.type='file'; i.accept='image/*'; i.multiple=true;
    i.onchange=()=>showToast(`${i.files.length} фото выбрано. В рабочей версии они уйдут в Ozon через сервер.`);
    i.click();
  });
}
