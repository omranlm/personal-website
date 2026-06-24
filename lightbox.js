(function () {
  var overlay, lbImg, lbCaption, lbPrev, lbNext;
  var images = [];
  var current = 0;

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');

    overlay.innerHTML =
      '<button class="lb-close" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>' +
      '<button class="lb-nav lb-prev" aria-label="Previous image">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
      '</button>' +
      '<div class="lb-stage">' +
        '<img class="lb-img" alt="" />' +
        '<p class="lb-caption"></p>' +
      '</div>' +
      '<button class="lb-nav lb-next" aria-label="Next image">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</button>';

    document.body.appendChild(overlay);

    lbImg     = overlay.querySelector('.lb-img');
    lbCaption = overlay.querySelector('.lb-caption');
    lbPrev    = overlay.querySelector('.lb-prev');
    lbNext    = overlay.querySelector('.lb-next');

    overlay.querySelector('.lb-close').addEventListener('click', close);
    lbPrev.addEventListener('click', function (e) { e.stopPropagation(); navigate(-1); });
    lbNext.addEventListener('click', function (e) { e.stopPropagation(); navigate(1); });

    // Click backdrop (not stage) to close
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('lb-open')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  function show(imgs, index) {
    if (!overlay) buildOverlay();
    images  = imgs;
    current = index;
    render();
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.lb-close').focus();
  }

  function close() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function navigate(dir) {
    if (images.length < 2) return;
    current = (current + dir + images.length) % images.length;
    lbImg.classList.add('lb-switching');
    var self = lbImg;
    setTimeout(function () {
      render();
      self.classList.remove('lb-switching');
    }, 120);
  }

  function render() {
    var img = images[current];
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = img.alt || '';
    lbCaption.style.display = img.alt ? '' : 'none';
    var multi = images.length > 1;
    lbPrev.style.display = multi ? '' : 'none';
    lbNext.style.display = multi ? '' : 'none';
  }

  function init() {
    var figures = document.querySelectorAll('.talk-featured-img, .talk-featured-gallery');
    figures.forEach(function (fig) {
      var imgs = Array.from(fig.querySelectorAll('img'));
      imgs.forEach(function (img, idx) {
        img.classList.add('lb-trigger');
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'View full size' + (img.alt ? ': ' + img.alt : ''));
        img.addEventListener('click', function () { show(imgs, idx); });
        img.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(imgs, idx); }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
