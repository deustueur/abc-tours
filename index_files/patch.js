
// patch.js — lazy image fix, runs after main.js
(function() {
  const patches = {
    'Hill Country Tours': 'https://walkerstours.eme-devops.com/2025/09/main-listing-page-features-4.jpg?w=465&h=550&fit=crop&fit=crop&crop=center&auto=format,compress,enhance&q=80',
    'Ayurvedic Tours': 'https://walkerstours.eme-devops.com/2025/09/main-listing-page-features-12.jpg?w=465&h=550&fit=crop&fit=crop&crop=center&auto=format,compress,enhance&q=80',
    'Honeymoon Tours': 'https://walkerstours.eme-devops.com/2025/09/main-listing-page-features-8.jpg?w=465&h=550&fit=crop&fit=crop&crop=center&auto=format,compress,enhance&q=80',
    'Golf Tours': 'https://walkerstours.eme-devops.com/2025/09/main-listing-page-features-7.jpg?w=465&h=550&fit=crop&fit=crop&crop=center&auto=format,compress,enhance&q=80',
    'Ramayana Tours': 'https://walkerstours.eme-devops.com/2025/09/randika-premaratne-3y3xIYeHzpQ-unsplash.jpg?w=465&h=550&fit=crop&fit=crop&crop=center&auto=format,compress,enhance&q=80',
    'The Cultural Odyssey': 'https://walkerstours.eme-devops.com/2025/09/Culture-04-scaled.jpg?w=465&h=550&fit=crop&fit=crop&crop=center&auto=format,compress,enhance&q=80',
    'Wander & Awaken': 'https://walkerstours.eme-devops.com/2025/09/Ayurevedic-05-scaled.jpg?w=465&h=550&fit=crop&fit=crop&crop=center&auto=format,compress,enhance&q=80',
    'Adventure, Culture & love': 'https://walkerstours.eme-devops.com/2025/09/Adventure-scaled.jpg?w=465&h=550&fit=crop&fit=crop&crop=center&auto=format,compress,enhance&q=80',
    'Deep Dive into the Wild': 'https://walkerstours.eme-devops.com/2025/09/Wildlife-01.jpg?w=465&h=550&fit=crop&fit=crop&crop=center&auto=format,compress,enhance&q=80',
  };

  function applyPatches() {
    document.querySelectorAll('img[data-imgsrc], img.lazyImg').forEach(function(img) {
      const alt = img.getAttribute('alt') || '';
      const dataSrc = img.getAttribute('data-imgsrc') || '';
      const real = patches[alt] || dataSrc;
      if (real && (img.src.includes('placeholder') || img.classList.contains('lazyImg'))) {
        img.src = real;
        img.classList.remove('lazyImg');
        img.classList.add('visibleImg');
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPatches);
  } else {
    applyPatches();
  }

  // Also run after slick initializes (500ms delay)
  setTimeout(applyPatches, 500);

  // And again after full page load
  window.addEventListener('load', function() {
    setTimeout(applyPatches, 300);
  });

  // Watch for slick reinit via MutationObserver
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.addedNodes.length) applyPatches();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();
