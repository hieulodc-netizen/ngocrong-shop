document.addEventListener('DOMContentLoaded', loadNickDetail);

async function loadNickDetail() {

  const params = new URLSearchParams(window.location.search);

  const id = params.get('id');

  try {

    const response = await fetch('data/nicks.json');

    const nicks = await response.json();

    const nick = nicks.find(item => item.id == id);

    if (!nick) {
      document.getElementById('nick-detail').innerHTML = `
        <h2>Không tìm thấy nick</h2>
      `;
      return;
    }

    displayNick(nick);

  } catch (error) {

    console.error(error);

    document.getElementById('nick-detail').innerHTML = `
      <h2>Lỗi tải dữ liệu</h2>
    `;
  }
}

function displayNick(nick) {

  const container = document.getElementById('nick-detail');

  container.innerHTML = `
  
    <div class="detail-card">

      <img src="${nick.image}" alt="${nick.name}">

      <div class="detail-info">

        <h2>${nick.name}</h2>

        <p><strong>Server:</strong> ${nick.server}</p>

        <p><strong>Hành tinh:</strong> ${nick.planet}</p>

        <p><strong>Sức mạnh SP:</strong> ${nick.sp}</p>

        <p><strong>Sức mạnh ĐT:</strong> ${nick.dt}</p>

        <p><strong>Mô tả:</strong> ${nick.description}</p>

        <h3 class="price">
          ${formatPrice(nick.price)}
        </h3>

        <button onclick="buyNick(${nick.id})">
          Mua ngay
        </button>

      </div>

    </div>
  `;
}

function formatPrice(price) {
  return Number(price).toLocaleString('vi-VN') + 'đ';
}

function buyNick(id) {
  alert('Liên hệ Zalo 0352202571 để mua nick #' + id);
}