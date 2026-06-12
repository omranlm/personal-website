(function () {
  var STORAGE_KEY      = 'cookie_consent';
  var STORAGE_DATE_KEY = 'cookie_consent_date';

  function updateConsent(granted) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
  }

  function recordDate() {
    localStorage.setItem(STORAGE_DATE_KEY, new Date().toISOString());
  }

  function hideBanner(banner) {
    banner.classList.remove('cookie-banner--show');
    banner.classList.add('cookie-banner--hide');
    setTimeout(function () { if (banner.parentNode) banner.parentNode.removeChild(banner); }, 400);
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="cookie-banner__bar">' +
        '<p class="cookie-banner__text">' +
          '<svg class="cookie-banner__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
            '<circle cx="12" cy="12" r="10"/>' +
            '<circle cx="8.5" cy="13.5" r="1" fill="currentColor" stroke="none"/>' +
            '<circle cx="12" cy="8.5" r="1" fill="currentColor" stroke="none"/>' +
            '<circle cx="15.5" cy="13.5" r="1" fill="currentColor" stroke="none"/>' +
          '</svg>' +
          'We use anonymous cookies to understand how visitors use this site. No personal data is collected.' +
        '</p>' +
        '<div class="cookie-banner__actions">' +
          '<button class="cookie-btn cookie-btn--more" type="button">More details</button>' +
          '<button class="cookie-btn cookie-btn--accept" type="button">Ok for anonymous cookies</button>' +
        '</div>' +
      '</div>' +
      '<div class="cookie-banner__details" aria-hidden="true">' +
        '<h3 class="cookie-details__title">What cookies do we use and why?</h3>' +
        '<p class="cookie-details__intro">This website uses <strong>Google Analytics</strong> in anonymous mode to understand how visitors interact with its pages. Here is exactly what that means:</p>' +
        '<ul class="cookie-details__list">' +
          '<li><span class="cookie-check">✓</span> <strong>No personal data is collected</strong> — no name, email address, IP address, or any identifying information is stored or processed.</li>' +
          '<li><span class="cookie-check">✓</span> <strong>No advertising or cross-site tracking</strong> — cookies are never used to show you ads or track you across other websites.</li>' +
          '<li><span class="cookie-check">✓</span> <strong>Fully anonymous statistics only</strong> — we see aggregated numbers like total visits and popular pages, never individual visitor identities.</li>' +
          '<li><span class="cookie-check">✓</span> <strong>Data is never sold or shared</strong> — analytics data stays within Google Analytics and is not passed to any third party.</li>' +
        '</ul>' +
        '<p class="cookie-details__tech"><strong>Cookies set on acceptance:</strong> <code>_ga</code> (2-year expiry, distinguishes unique visits) · <code>_ga_MZ648EEXYB</code> (session state)</p>' +
        '<p class="cookie-details__withdraw">You can withdraw your consent at any time by clearing your browser cookies for this site.</p>' +
        '<div class="cookie-details__actions">' +
          '<button class="cookie-btn cookie-btn--accept cookie-btn--accept-lg" type="button">Ok for anonymous cookies</button>' +
          '<button class="cookie-btn cookie-btn--decline-text" type="button">No thanks, decline</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { banner.classList.add('cookie-banner--show'); });
    });

    var detailsPanel = banner.querySelector('.cookie-banner__details');
    var moreBtn = banner.querySelector('.cookie-btn--more');

    // Toggle details panel
    moreBtn.addEventListener('click', function () {
      var open = detailsPanel.classList.toggle('cookie-banner__details--open');
      detailsPanel.setAttribute('aria-hidden', String(!open));
      moreBtn.textContent = open ? 'Hide details' : 'More details';
    });

    // Accept (both bar and details panel)
    banner.querySelectorAll('.cookie-btn--accept').forEach(function (btn) {
      btn.addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, 'accepted');
        recordDate();
        updateConsent(true);
        hideBanner(banner);
      });
    });

    // Decline (details panel only)
    banner.querySelector('.cookie-btn--decline-text').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'declined');
      recordDate();
      updateConsent(false);
      hideBanner(banner);
    });
  }

  function init() {
    var choice = localStorage.getItem(STORAGE_KEY);
    var date   = localStorage.getItem(STORAGE_DATE_KEY);

    if (choice === 'accepted' && date) {
      // Valid consent with timestamp — restore GA and skip banner
      updateConsent(true);
    } else if (choice === 'accepted' && !date) {
      // Legacy acceptance without timestamp — re-show banner to re-capture consent date
      showBanner();
    } else if (choice === 'declined' && !date) {
      // Legacy decline without timestamp — record date silently, no banner
      recordDate();
    } else if (!choice) {
      showBanner();
    }
    // 'declined' with date — GA stays in denied mode, no banner
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

