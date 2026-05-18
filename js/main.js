// ==========================
// BALANCE
// ==========================

let balance =
Number(localStorage.getItem('balance')) || 0;


// ==========================
// DOM READY
// ==========================

document.addEventListener('DOMContentLoaded', () => {

    updateBalance();

    loadNicks();

});


// ==========================
// LOAD NICK
// ==========================

async function loadNicks(){

    const container =
    document.getElementById('nick-list');

    // NẾU KHÔNG CÓ LIST THÌ THOÁT

    if(!container) return;

    try{

        const response =
        await fetch('data/nicks.json');

        const nicks =
        await response.json();

        displayNicks(nicks);

    }catch(error){

        console.error(error);

    }

}


// ==========================
// HIỂN THỊ NICK
// ==========================

function displayNicks(nicks){

    const container =
    document.getElementById('nick-list');

    if(!container) return;

    container.innerHTML = nicks.map(nick => `

        <div class="nick-card">

            <img src="${nick.image}" alt="${nick.name}">

            <div class="nick-content">

                <h3>${nick.name}</h3>

                <p class="info">
                    🌍 ${nick.server}
                </p>

                <p class="info">
                    ⚔️ SP: ${nick.sp}
                </p>

                <p class="info">
                    👤 Hành tinh: ${nick.planet}
                </p>

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


// ==========================
// FORMAT PRICE
// ==========================

function formatPrice(price){

    return Number(price)
    .toLocaleString('vi-VN') + 'đ';

}


// ==========================
// UPDATE BALANCE
// ==========================

function updateBalance(){

    const balanceEl =
    document.getElementById('balance');

    if(balanceEl){

        balanceEl.innerText =

        '💰 ' +

        Number(balance)
        .toLocaleString('vi-VN') +

        'đ';

    }

    localStorage.setItem(
        'balance',
        balance
    );

}


// ==========================
// MODAL NẠP TIỀN
// ==========================

function openDepositModal(){

    const modal =
    document.getElementById('deposit-modal');

    if(modal){

        modal.style.display = 'flex';

    }

}

function closeDepositModal(){

    const modal =
    document.getElementById('deposit-modal');

    if(modal){

        modal.style.display = 'none';

    }

}


// ==========================
// NẠP TIỀN
// ==========================

function depositMoney(){

    const input =
    document.getElementById('deposit-input');

    if(!input) return;

    const amount =
    Number(input.value);

    if(amount <= 0){

        alert('Vui lòng nhập số tiền hợp lệ');

        return;

    }

    balance += amount;

    updateBalance();

    closeDepositModal();

    alert(
        'Nạp thành công ' +
        amount.toLocaleString('vi-VN') +
        'đ'
    );

    input.value = '';

}


// ==========================
// SLIDER
// ==========================

const bannerImages = [

    'images/banner/hinh1.jpg',
    'images/banner/hinh2.jpg',
    'images/banner/hinh3.jpg'

];

let currentBanner = 0;

function autoSlider(){

    const slider =
    document.getElementById('slider');

    if(!slider) return;

    slider.style.opacity = 0;

    setTimeout(() => {

        currentBanner++;

        if(currentBanner >= bannerImages.length){

            currentBanner = 0;

        }

        slider.src =
        bannerImages[currentBanner];

        slider.style.opacity = 1;

    },300);

}

setInterval(autoSlider,3000);


// ==========================
// AUTH
// ==========================

let currentUser =
localStorage.getItem('currentUser');

function openAuthModal(){

    const modal =
    document.getElementById('auth-modal');

    if(modal){

        modal.style.display = 'flex';

    }

}

function closeAuthModal(){

    const modal =
    document.getElementById('auth-modal');

    if(modal){

        modal.style.display = 'none';

    }

}


// ==========================
// CHUYỂN FORM
// ==========================

function showRegister(){

    document.getElementById(
        'login-form'
    ).style.display = 'none';

    document.getElementById(
        'register-form'
    ).style.display = 'block';

    document.getElementById(
        'auth-title'
    ).innerText = 'Tạo tài khoản';

}

function showLogin(){

    document.getElementById(
        'login-form'
    ).style.display = 'block';

    document.getElementById(
        'register-form'
    ).style.display = 'none';

    document.getElementById(
        'auth-title'
    ).innerText = 'Đăng nhập';

}


// ==========================
// REGISTER
// ==========================

function register(){

    const username =
    document.getElementById(
        'register-username'
    ).value;

    const password =
    document.getElementById(
        'register-password'
    ).value;

    const password2 =
    document.getElementById(
        'register-password2'
    ).value;

    if(
        username === '' ||
        password === ''
    ){

        alert('Vui lòng nhập đầy đủ');

        return;

    }

    if(password !== password2){

        alert('Mật khẩu không khớp');

        return;

    }

    let users =

    JSON.parse(
        localStorage.getItem('users')
    ) || [];

    const checkUser =

    users.find(
        u => u.username === username
    );

    if(checkUser){

        alert('Tài khoản đã tồn tại');

        return;

    }

    users.push({

        username,
        password

    });

    localStorage.setItem(
        'users',
        JSON.stringify(users)
    );

    alert('Tạo tài khoản thành công');

    showLogin();

}


// ==========================
// LOGIN
// ==========================

function login(){

    const username =
    document.getElementById(
        'login-username'
    ).value;

    const password =
    document.getElementById(
        'login-password'
    ).value;

    let users =

    JSON.parse(
        localStorage.getItem('users')
    ) || [];

    const user =

    users.find(

        u =>

        u.username === username &&

        u.password === password

    );

    if(user){

        localStorage.setItem(
            'currentUser',
            username
        );

        currentUser = username;

        alert('Đăng nhập thành công');

        closeAuthModal();

    }else{

        alert('Sai tài khoản hoặc mật khẩu');

    }

}


// ==========================
// VÒNG QUAY
// ==========================

const wheel =
document.getElementById('wheel');

const result =
document.getElementById('result');

let spinning = false;

let currentRotate = 0;

const gifts = [

    '50K',

    'Nick VIP',

    '20K',

    'Trang Bị VIP',

    '100K',

    'Acc Random'

];

function spinWheel(){

    // NẾU KHÔNG PHẢI TRANG VÒNG QUAY

    if(!wheel) return;

    if(spinning) return;

    // CHECK TIỀN

    if(balance < 50000){

        alert('Không đủ 50K để quay!');

        return;

    }

    spinning = true;

    // TRỪ TIỀN

    balance -= 50000;

    updateBalance();

    // RANDOM

    const randomIndex =

    Math.floor(
        Math.random() * gifts.length
    );

    const reward =
    gifts[randomIndex];

    // 6 Ô

    const degPerItem = 60;

    const rotateDeg =

    (360 * 5) +

    (360 - (randomIndex * degPerItem) - 30);

    currentRotate += rotateDeg;

    // QUAY

    wheel.style.transition =

    'transform 5s cubic-bezier(0.17,0.67,0.12,0.99)';

    wheel.style.transform =

    `rotate(${currentRotate}deg)`;

    // RESULT

    setTimeout(() => {
      if(result){
        result.innerHTML =
        `🎉 Bạn nhận được:<br><b>${reward}</b>`;
      }
      // POPUP THÔNG BÁO


      alert(

        '🎉 Chúc mừng!\n\n' +

        'Bạn nhận được: ' +

        reward

      );


      spinning = false;
    },5000);
}


// ==========================
// EXPORT WINDOW
// ==========================

window.openDepositModal =
openDepositModal;

window.closeDepositModal =
closeDepositModal;

window.depositMoney =
depositMoney;

window.openAuthModal =
openAuthModal;

window.closeAuthModal =
closeAuthModal;

window.showRegister =
showRegister;

window.showLogin =
showLogin;

window.register =
register;

window.login =
login;

window.spinWheel =
spinWheel;