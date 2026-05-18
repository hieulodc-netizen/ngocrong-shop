let balance = localStorage.getItem('balance') || 0;

document.addEventListener('DOMContentLoaded', () => {

  updateBalance();

  loadNicks();

});
async function loadNicks(){

  try{

    const response = await fetch('data/nicks.json');

    const nicks = await response.json();

    displayNicks(nicks);

  }catch(error){

    console.error(error);

  }

}

function displayNicks(nicks){

  const container = document.getElementById('nick-list');

  container.innerHTML = nicks.map(nick => `

    <div class="nick-card">

      <img src="${nick.image}" alt="${nick.name}">

      <div class="nick-content">

        <h3>${nick.name}</h3>

        <p class="info">🌍 ${nick.server}</p>

        <p class="info">⚔️ SP: ${nick.sp}</p>

        <p class="info">👤 Hành tinh: ${nick.planet}</p>

        <div class="price">
          ${formatPrice(nick.price)}
        </div>

        <button class="buy-btn">
          Mua ngay
        </button>

      </div>

    </div>

  `).join('');

}

function formatPrice(price){

  return Number(price).toLocaleString('vi-VN') + 'đ';

}
function updateBalance(){

  document.getElementById('balance').innerText =
    '💰 ' +
    Number(balance).toLocaleString('vi-VN') +
    'đ';

  localStorage.setItem('balance', balance);

}

function openDepositModal(){

  document.getElementById('deposit-modal').style.display =
    'flex';

}

function closeDepositModal(){

  document.getElementById('deposit-modal').style.display =
    'none';

}

function depositMoney(){

  const amount =
    document.getElementById('deposit-input').value;

  if(amount <= 0){

    alert('Vui lòng nhập số tiền hợp lệ');

    return;

  }

  balance = Number(balance) + Number(amount);

  updateBalance();

  closeDepositModal();

  alert(
    'Nạp tiền thành công: ' +
    Number(amount).toLocaleString('vi-VN') +
    'đ'
  );

}
const bannerImages = [

  'images/banner/hinh1.jpg',
  'images/banner/hinh2.jpg',
  'images/banner/hinh3.jpg'

];

let currentBanner = 0;

function autoSlider(){

  const slider =
    document.getElementById('slider');

  slider.style.opacity = 0;

  setTimeout(() => {

    currentBanner++;

    if(currentBanner >= bannerImages.length){
      currentBanner = 0;
    }

    slider.src =
      bannerImages[currentBanner];

    slider.style.opacity = 1;

  }, 300);

}

setInterval(autoSlider, 3000);

// ==========================
// AUTH
// ==========================

let currentUser = localStorage.getItem("currentUser");

function openAuthModal() {

  document.getElementById("auth-modal").style.display = "flex";

}

function closeAuthModal() {

  document.getElementById("auth-modal").style.display = "none";

}

function showRegister() {

  alert("Đã bấm đăng ký");

  document.getElementById("login-form").style.display = "none";

  document.getElementById("register-form").style.display = "block";

  document.getElementById("auth-title").innerText =
    "Tạo tài khoản";

}

function showLogin() {

  document.getElementById("login-form").style.display = "block";

  document.getElementById("register-form").style.display = "none";

  document.getElementById("auth-title").innerText =
    "Đăng nhập";

}

// ==========================
// REGISTER
// ==========================

function register() {

  let username =
    document.getElementById("register-username").value;

  let password =
    document.getElementById("register-password").value;

  let password2 =
    document.getElementById("register-password2").value;

  if(username === "" || password === "") {

    alert("Vui lòng nhập đầy đủ!");
    return;

  }

  if(password !== password2) {

    alert("Mật khẩu không khớp!");
    return;

  }

  let users =
    JSON.parse(localStorage.getItem("users")) || [];

  let checkUser =
    users.find(u => u.username === username);

  if(checkUser) {

    alert("Tài khoản đã tồn tại!");
    return;

  }

  users.push({

    username: username,
    password: password

  });

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  alert("Tạo tài khoản thành công!");

  showLogin();

}

// ==========================
// LOGIN
// ==========================

function login() {

  let username =
    document.getElementById("login-username").value;

  let password =
    document.getElementById("login-password").value;

  let users =
    JSON.parse(localStorage.getItem("users")) || [];

  let user =
    users.find(
      u =>
      u.username === username &&
      u.password === password
    );

  if(user) {

    localStorage.setItem(
      "currentUser",
      username
    );

    currentUser = username;

    alert("Đăng nhập thành công!");

    closeAuthModal();

  } else {

    alert("Sai tài khoản hoặc mật khẩu!");

  }

}

// ==========================
// LOAD SỐ DƯ
// ==========================

let balance =
Number(localStorage.getItem('balance')) || 0;

const balanceEl =
document.getElementById('balance');

balanceEl.innerText =
'💰 ' +
balance.toLocaleString('vi-VN') +
'đ';


// ==========================
// VÒNG QUAY
// ==========================

const wheel =
document.getElementById('wheel');

const result =
document.getElementById('result');

let spinning = false;

let currentRotate = 0;


// DANH SÁCH QUÀ

const gifts = [

    '50K',

    'Nick VIP',

    '20K',

    'Trang Bị VIP',

    '100K',

    'Acc Random'

];


// ==========================
// BALANCE
// ==========================

let balance =
Number(localStorage.getItem('balance')) || 0;

const balanceEl =
document.getElementById('balance');

balanceEl.innerText =
'💰 ' +
balance.toLocaleString('vi-VN') +
'đ';


// ==========================
// WHEEL
// ==========================

const wheel =
document.getElementById('wheel');

const result =
document.getElementById('result');

let spinning = false;

let currentRotate = 0;


// QUÀ

const gifts = [

    '50K',

    'Nick VIP',

    '20K',

    'Trang Bị VIP',

    '100K',

    'Acc Random'

];


// ==========================
// SPIN
// ==========================

function spinWheel(){

    if(spinning) return;

    // CHECK TIỀN

    if(balance < 50000){

        alert('Không đủ 50K để quay!');

        return;
    }

    spinning = true;


    // TRỪ TIỀN

    balance -= 50000;

    localStorage.setItem(
        'balance',
        balance
    );

    balanceEl.innerText =
    '💰 ' +
    balance.toLocaleString('vi-VN') +
    'đ';


    // RANDOM

    const randomIndex =
    Math.floor(
        Math.random() * gifts.length
    );

    const reward =
    gifts[randomIndex];


    // 6 Ô = 60 ĐỘ

    const degPerItem = 60;


    // QUAY

    const rotateDeg =

    (360 * 5) +

    (360 - (randomIndex * degPerItem) - 30);


    currentRotate += rotateDeg;


    wheel.style.transition =
    'transform 5s cubic-bezier(0.17,0.67,0.12,0.99)';


    wheel.style.transform =
    `rotate(${currentRotate}deg)`;


    // RESULT

    setTimeout(() => {

        result.innerHTML =

        `🎉 Bạn nhận được:<br><b>${reward}</b>`;

        spinning = false;

    },5000);

}
window.spinWheel = spinWheel;