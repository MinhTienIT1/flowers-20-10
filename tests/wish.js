/**
 * File tự mở lời chúc 20/10 khi bấm/chạm vào hoa
 */
(() => {
  'use strict';

  // Danh sách các lời chúc dịu dàng ngày Phụ nữ Việt Nam 20/10
  const FLOWER_WISHES = [
    "Chúc bạn ngày 20/10 luôn rạng rỡ, bình an và ngập tràn niềm vui!",
    "Mong bạn luôn được yêu thương từ những điều nhỏ bé nhất.",
    "Chúc bạn luôn tự tin, xinh đẹp và mỉm cười theo cách riêng của mình.",
    "Một bông hoa nở thay cho ngàn lời chúc dịu dàng nhất gửi tới bạn.",
    "Mong mỗi ngày của bạn trôi qua đều bình yên, nhẹ nhàng và hạnh phúc.",
    "Chúc bạn đủ tự tin để theo đuổi ước mơ, đủ tĩnh lặng để tận hưởng cuộc sống.",
    "Cảm ơn vì sự xuất hiện của bạn đã làm cho thế giới này thêm dịu dàng.",
    "Chúc bạn một ngày 20/10 ngọt ngào, ý nghĩa bên những người thân yêu!"
  ];

  // Thêm style cho Popup hiển thị lời chúc
  const style = document.createElement('style');
  style.textContent = `
    .flower-wish-overlay {
      position: fixed; inset: 0; z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      background: rgba(112, 58, 80, 0.25);
      backdrop-filter: blur(4px);
      padding: 20px;
      animation: wishFadeIn 0.35s ease;
    }
    .flower-wish-card {
      position: relative; width: min(420px, 100%);
      background: #fffdfc; border: 1px solid #ecd3db;
      border-radius: 16px; padding: 28px 24px 24px;
      text-align: center; color: #703a50;
      box-shadow: 0 16px 48px rgba(112, 58, 80, 0.2);
      animation: wishPopIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .flower-wish-card::before {
      content: '❀'; display: block; font-size: 28px;
      color: #c66388; margin-bottom: 8px;
    }
    .flower-wish-text {
      font-family: "Noto Serif", Georgia, serif;
      font-size: 16px; line-height: 1.65;
      font-style: italic; margin: 0 0 20px;
      color: #703a50;
    }
    .flower-wish-close {
      border: 1px solid #dcb9c8; background: #fffdfc;
      color: #703a50; border-radius: 20px;
      padding: 8px 20px; font-size: 13px; cursor: pointer;
      transition: background 0.2s;
    }
    .flower-wish-close:hover { background: #fae7ef; }
    @keyframes wishFadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes wishPopIn { from { opacity: 0; transform: scale(0.85) translateY(10px); } to { opacity: 1; transform: none; } }
  `;
  document.head.appendChild(style);

  let activeOverlay = null;
  let autoCloseTimer = null;

  // Hàm mở Popup Lời chúc khi chạm/ấn hoa
  function openWishPopup(customMessage) {
    if (activeOverlay) {
      activeOverlay.remove();
      clearTimeout(autoCloseTimer);
    }

    const wishText = customMessage || FLOWER_WISHES[Math.floor(Math.random() * FLOWER_WISHES.length)];

    const overlay = document.createElement('div');
    overlay.className = 'flower-wish-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    overlay.innerHTML = `
      <div class="flower-wish-card">
        <p class="flower-wish-text">${wishText}</p>
        <button type="button" class="flower-wish-close">Cảm ơn ♡</button>
      </div>
    `;

    const closeBtn = overlay.querySelector('.flower-wish-close');
    const closeWish = () => {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.25s ease';
      setTimeout(() => {
        overlay.remove();
        if (activeOverlay === overlay) activeOverlay = null;
      }, 250);
    };

    closeBtn.addEventListener('click', closeWish);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeWish();
    });

    document.body.appendChild(overlay);
    activeOverlay = overlay;

    // Tự đóng lời chúc sau 6 giây
    autoCloseTimer = setTimeout(closeWish, 6000);
  }

  // Lắng nghe sự kiện click/touch hoa trên cả 2 trang (index.html và garden.html)
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Dành cho trang garden.html (Nút hoa giữa hoặc Canvas vườn hoa)
    const gardenBloomBtn = document.getElementById('bloom');
    if (gardenBloomBtn) {
      gardenBloomBtn.addEventListener('click', () => {
        setTimeout(() => openWishPopup(), 600);
      });
    }

    // 2. Tự động nhận sự kiện chọn hoa từ bouquet (index.html)
    document.addEventListener('bouquet:rose', (e) => {
      if (e.detail && e.detail.message) {
        openWishPopup(e.detail.message);
      } else {
        openWishPopup();
      }
    });
  });

  // Export hàm để mở lời chúc từ bên ngoài nếu cần
  window.openFlowerWish = openWishPopup;
})();