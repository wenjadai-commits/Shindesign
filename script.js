document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const category = btn.dataset.filter;

      // 更新按鈕 active 狀態
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // 顯示 / 隱藏作品卡片
      projectCards.forEach(function (card) {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
