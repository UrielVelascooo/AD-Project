
const shoes = [
  { id: 's1', name: 'Runing', price: 2499, img: 'https://cdn5.coppel.com/pr/8856552-1.jpg' },
  { id: 's2', name: 'Forum Low', price: 1799, img: 'https://assets.adidas.com/images/w_600%2Cf_auto%2Cq_auto/836f18ee57e441d8938aaf1201323358_9366/Forum_Low_CL_Shoes_White_ID6858_01_standard.jpg' },
  { id: 's3', name: 'Terrex Free Hiker', price: 2799, img: 'https://assets.adidas.com/images/w_383%2Ch_383%2Cf_auto%2Cq_auto%2Cfl_lossy%2Cc_fill%2Cg_auto/b78afc29b01841e6ba681b044ca1ccf8_9366/terrex-free-hiker-2.0-gore-tex-hiking-shoes.jpg' },
  { id: 's4', name: 'Campus', price: 1299, img: 'https://assets.adidas.com/images/w_600%2Cf_auto%2Cq_auto/ba4b059ec42b407cb21eaf7b00924da6_9366/Campus_00s_Shoes_White_GY0042_01_standard.jpg' },
  { id: 's5', name: 'Samba OG', price: 1599, img: 'https://assets.adidas.com/images/e_trim%3AEAEEEF/c_lpad%2Cw_iw%2Ch_ih/b_rgb%3AEAEEEF/w_180%2Cf_auto%2Cq_auto%2Cfl_lossy%2Cc_fill%2Cg_auto/783d87b545b044a88f4325575d0f14cc_9366/adidas_x_Jeremy_Scott_Samba_OG_Shoes_Black_JQ8835_00_plp_standard.jpg' },

  { id: 's6', name: 'NMD - color variante', price: 1999, img: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/bf31c4a42bfa42b9b1c6507b235b3807_9366/NMD_R1_Shoes_Beige_IF3495_01_standard.jpg' }
];

const clothes = [
  
  { id: 'c1', name: 'Playera Essentials', price: 399, img: 'https://www.innovasport.com/medias/IS-HK0264-GS-1.jpg?context=bWFzdGVyfGltYWdlc3w2Nzk2OXxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJoaU9DOW9Nek12TVRJME16RTRORFF3TVRZeE5UZ3VhbkJufGIyYWY4Y2Q5ZjE1MzQ5NGI0YWY4ZThlNmFjOTgxYzA5ZTZiZTcyOGFiOTFhMTc0MDE4MTZmYzFhNTVkN2ZjMGY' },
  { id: 'c2', name: 'Sudadera Hoodie', price: 899, img: 'https://assets.adidas.com/images/w_600%2Cf_auto%2Cq_auto%2Cfl_lossy%2Cc_fill%2Cg_auto/920aea967b7340c5a6464462f8ca186f_9366/Essentials_3-Stripes_Fleece_Hoodie_Black_JD1870_21_model.jpg' },
  { id: 'c3', name: 'Short Deportivo', price: 299, img: 'https://assets.adidas.com/images/w_600%2Cf_auto%2Cq_auto%2Cfl_lossy%2Cc_fill%2Cg_auto/8b1b63ab238244e789394ef549cf8dfc_9366/Designed-for-Training_3-Stripes_Shorts_Black_JE5682_21_model.jpg' },
  { id: 'c4', name: 'Pantalón Jogger', price: 699, img: 'https://m.media-amazon.com/images/I/71-VVEW5fGL._AC_SX522_.jpg' },
  { id: 'c5', name: 'Chamarra Ligera', price: 1299, img: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/db342cc756c549309466278bab9bd398_9366/MEX_M_JKT_M_Beige_JY7593_HM1.jpg' },
  { id: 'c6', name: 'Calcetines Pack', price: 149, img: 'https://m.media-amazon.com/images/I/81fUAUMiA7L._AC_SX569_.jpg' },
  { id: 'c7', name: 'Gorra', price: 199, img: 'https://m.media-amazon.com/images/I/71B3ZFOz96L._AC_SX569_.jpg' }
];


let cart = JSON.parse(localStorage.getItem('adidas_cart') || '[]');
let users = JSON.parse(localStorage.getItem('adidas_users') || '{}');
let session = JSON.parse(localStorage.getItem('adidas_session') || 'null');

const $ = id => document.getElementById(id);
const formatMoney = n => '$' + Number(n).toFixed(2);


function productCard(p){
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <div class="title">${p.name}</div>
    <div class="meta"> Caballero </div>
    <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center">
      <div class="price">${formatMoney(p.price)}</div>
      <button class="btn addBtn">Agregar</button>
    </div>
  `;
  el.querySelector('.addBtn').addEventListener('click', ()=> {
    addToCart(p);
    el.classList.add('flying');
    setTimeout(()=> el.classList.remove('flying'),700);
  });
  return el;
}

function renderProducts(){
  const shoesContainer = $('shoes');
  const clothesContainer = $('clothes');
  shoesContainer.innerHTML = ''; clothesContainer.innerHTML = '';
  shoes.forEach(s=> shoesContainer.appendChild(productCard(s)));
  clothes.forEach(c=> clothesContainer.appendChild(productCard(c)));
}


function saveCart(){ localStorage.setItem('adidas_cart', JSON.stringify(cart)); }
function findInCart(id){ return cart.find(x=>x.id===id); }
function addToCart(product){
  const item = findInCart(product.id);
  if(item) item.qty++;
  else cart.push({...product, qty:1});
  saveCart(); renderCart();
}
function changeQty(id, delta){
  const it = findInCart(id);
  if(!it) return;
  it.qty += delta;
  if(it.qty <= 0) cart = cart.filter(x=>x.id!==id);
  saveCart(); renderCart();
}
function removeItem(id){ cart = cart.filter(x=>x.id!==id); saveCart(); renderCart(); }
function clearCart(){ if(!confirm('Vaciar carrito?')) return; cart = []; saveCart(); renderCart(); }

function renderCart(){
  const list = $('cartList');
  list.innerHTML = '';
  if(cart.length === 0){ list.innerHTML = '<div class="small muted">El carrito está vacío</div>'; $('checkoutBtn').disabled = true; $('cartCount').textContent = 0; $('cartTotal').textContent = formatMoney(0); return; }
  cart.forEach(it=>{
    const d = document.createElement('div'); d.className = 'cart-item';
    d.innerHTML = `
      <img src="${it.img}" alt="${it.name}">
      <div class="info">
        <div style="font-weight:600">${it.name}</div>
        <div class="small muted">${formatMoney(it.price)} x ${it.qty} = <strong>${formatMoney(it.price * it.qty)}</strong></div>
      </div>
      <div class="qty">
        <button class="btn secondary" data-minus="${it.id}">−</button>
        <div style="min-width:28px;text-align:center">${it.qty}</div>
        <button class="btn" data-plus="${it.id}">+</button>
        <button class="btn small secondary" data-remove="${it.id}" title="Eliminar" style="margin-left:8px">Eliminar</button>
      </div>
    `;
    list.appendChild(d);

    d.querySelector('[data-plus]').addEventListener('click', ()=> changeQty(it.id, 1));
    d.querySelector('[data-minus]').addEventListener('click', ()=> changeQty(it.id, -1));
    d.querySelector('[data-remove]').addEventListener('click', ()=> removeItem(it.id));
  });

  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0);
  $('cartTotal').textContent = formatMoney(total);
  $('cartCount').textContent = cart.reduce((s,i)=>s+i.qty,0);
  $('checkoutBtn').disabled = false;
}


function openLogin(){ $('loginOverlay').classList.add('open'); $('loginOverlay').setAttribute('aria-hidden','false'); }
function closeLogin(){ $('loginOverlay').classList.remove('open'); $('loginOverlay').setAttribute('aria-hidden','true'); }
function showSignup(){ $('loginTitle').textContent='Crear cuenta'; $('loginForm').style.display='none'; $('signupForm').style.display='block'; }
function showLogin(){ $('loginTitle').textContent='Iniciar sesión'; $('signupForm').style.display='none'; $('loginForm').style.display='block'; }

function doSignup(e){
  e.preventDefault();
  const name = $('signupName').value.trim(), email = $('signupEmail').value.trim().toLowerCase(), phone = $('signupPhone').value.trim();
  if(!name||!email||!phone){ alert('Completa todos los campos'); return; }
  if(users[email]){ alert('Cuenta ya existe con ese correo'); return; }
  users[email] = {name,email,phone,created:Date.now()};
  localStorage.setItem('adidas_users', JSON.stringify(users));
  session = {email}; localStorage.setItem('adidas_session', JSON.stringify(session));
  closeLogin(); updateUI();
}

function doLogin(e){
  e.preventDefault();
  const email = $('loginEmail').value.trim().toLowerCase(), phone = $('loginPhone').value.trim();
  const u = users[email];
  if(!u){ alert('No existe la cuenta'); return; }
  if(u.phone !== phone){ alert('Teléfono incorrecto'); return; }
  session = {email}; localStorage.setItem('adidas_session', JSON.stringify(session));
  closeLogin(); updateUI();
}

function logout(){ if(!confirm('Cerrar sesión?')) return; session = null; localStorage.removeItem('adidas_session'); updateUI(); }
function updateUI(){ const welcome = $('welcomeText'); if(session && users[session.email]){ welcome.textContent = 'Hola, ' + users[session.email].name; $('openLoginBtn').textContent = 'Cuenta / Salir'; } else { welcome.textContent = 'Invitado'; $('openLoginBtn').textContent = 'Cuenta'; } }


function openCheckout(){
  if(!session){ if(confirm('Necesitas iniciar sesión para pagar. Abrir login?')) openLogin(); return; }
  const u = users[session.email];
  if(u){ $('shipName').value = u.name || ''; $('shipEmail').value = u.email || ''; $('shipPhone').value = u.phone || ''; }
  $('checkoutOverlay').classList.add('open'); $('checkoutOverlay').setAttribute('aria-hidden','false');
}
function closeCheckout(){ $('checkoutOverlay').classList.remove('open'); $('checkoutOverlay').setAttribute('aria-hidden','true'); }

$('paymentSelect')?.addEventListener('change', (e)=> {
  const val = e.target.value;
  $('cardSection').style.display = val==='card'? 'block':'none';
  $('oxxoSection').style.display = val==='oxxo'? 'block':'none';
});

function validateShipping(){
  if(!$('shipName').value.trim() || !$('shipAddress').value.trim() || !$('shipPhone').value.trim() || !$('shipEmail').value.trim()){
    alert('Completa los datos de envío'); return false;
  }
  return true;
}

function confirmPayment(){
  if(!validateShipping()) return;
  const method = $('paymentSelect').value;
  if(method==='card'){
    if(!$('cardNumber').value.trim() || !$('cardExp').value.trim() || !$('cardCvv').value.trim()){ alert('Completa los datos de tarjeta'); return; }
  }

  const order = {
    id: 'ORD'+Date.now(),
    date: new Date().toISOString(),
    user: session?session.email:null,
    items: cart,
    total: cart.reduce((s,i)=>s+i.price*i.qty,0),
    payment: method,
    shipping: {
      name:$('shipName').value, address:$('shipAddress').value, phone:$('shipPhone').value, email:$('shipEmail').value
    }
  };

  let extra = '';
  if(method==='oxxo'){ extra = `<p class="small muted">Código OXXO: <strong>${Math.floor(100000+Math.random()*899999)}</strong></p>`; }

  const orders = JSON.parse(localStorage.getItem('adidas_orders')||'[]');
  orders.push(order); localStorage.setItem('adidas_orders', JSON.stringify(orders));

  cart = []; saveCart(); renderCart(); closeCheckout();

  $('confirmBody').innerHTML = `
    <p>Gracias. Pedido <strong>${order.id}</strong> generado.</p>
    <p>Total: <strong>${formatMoney(order.total)}</strong></p>
    ${extra}
    <h4>Envío</h4>
    <div class="small muted">${order.shipping.name}<br>${order.shipping.address}<br>Tel: ${order.shipping.phone}<br>${order.shipping.email}</div>
  `;
  $('confirmOverlay').classList.add('open'); $('confirmOverlay').setAttribute('aria-hidden','false');
}


document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts(); renderCart();
  users = JSON.parse(localStorage.getItem('adidas_users') || '{}');
  session = JSON.parse(localStorage.getItem('adidas_session') || 'null');
  updateUI();

  $('openLoginBtn').addEventListener('click', ()=>{
    if(session){ if(confirm('¿Cerrar sesión?')) logout(); } else openLogin();
  });
  $('closeLogin').addEventListener('click', closeLogin);
  $('toSignup').addEventListener('click', showSignup);
  $('toLogin').addEventListener('click', showLogin);
  $('doSignup').addEventListener('click', doSignup);
  $('loginForm').addEventListener('submit', doLogin);

  $('openCartBtn').addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
  $('clearCartBtn').addEventListener('click', clearCart);
  $('checkoutBtn').addEventListener('click', openCheckout);
  $('cancelCheckout').addEventListener('click', closeCheckout);
  $('confirmPay').addEventListener('click', confirmPayment);

  $('closeConfirm').addEventListener('click', ()=> $('confirmOverlay').classList.remove('open'));

  document.querySelectorAll('.overlay').forEach(o=> o.addEventListener('click',(e)=>{ if(e.target===o){ o.classList.remove('open'); o.setAttribute('aria-hidden','true'); } }));
});
