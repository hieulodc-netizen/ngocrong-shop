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