// patch.js — lazy image fix + package-list grid fix

// ─── BLOCK 1: LAZY IMAGE FIX (unchanged) ─────────────────────────────────────
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
    'Deep Dive into the Wild': 'https://walkerstours.eme-devops.com/2025/09/Wildlife-01.jpg?w=465&h=550&fit=crop&fit=crop&crop=right&auto=format,compress,enhance&q=50',
    'A quick escape to the Hills': 'https://walkerstours.eme-devops.com/2025/09/Ella-1.jpg?w=465&h=550&fit=crop&fit=crop&crop=right&auto=format,compress,enhance&q=50',
    'Family Escapade in Paradise': 'https://walkerstours.eme-devops.com/2025/09/Safari-02-scaled.jpg?w=465&h=550&fit=crop&fit=crop&crop=center&auto=format,compress,enhance&q=50',
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPatches);
  } else {
    applyPatches();
  }
  setTimeout(applyPatches, 500);
  window.addEventListener('load', function() {
    setTimeout(applyPatches, 300);
  });

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.addedNodes.length) applyPatches();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();


// ─── BLOCK 2: PACKAGE-LIST GRID FIX ──────────────────────────────────────────
// Runs after window load + 800ms delay so slick has fully settled.
// Kills slick on .package-list, rewrites clean 6-item grid, injects CSS fix.
(function() {
  function applyPackageListFix() {
    var container = document.querySelector('.package-list');
    if (!container) return;

    // Already patched — don't run twice
    if (container.getAttribute('data-patched') === 'true') return;

    // Kill slick if initialized
    try {
      if (window.jQuery && jQuery(container).hasClass('slick-initialized')) {
        jQuery(container).slick('unslick');
      }
    } catch(e) {}

    // Wipe slick classes
    container.className = 'package-list';

    // Inject clean 6-item grid HTML
    container.innerHTML = [
      '<div class="list-item featured-list-item-wrap">',
        '<div class="featured-list-item position-relative">',
          '<a href="#" class="hover-box d-block" title="View Deep Dive into the Wild">',
            '<picture>',
              '<img class="w-100 hover-box__img" src="https://walkerstours.eme-devops.com/2025/09/Wildlife-01.jpg?w=465&h=550&fit=crop&crop=right&auto=format,compress,enhance&q=50" alt="Deep Dive into the Wild">',
            '</picture>',
            '<div class="hover-box__details">',
              '<div class="hover-box__details_visible">',
                '<p class="all-caps m-0 paragraph--14 font-color--white font-weight--500">Wildlife Tours</p>',
                '<p class="heading--24 font-weight--600 font-color--white all-caps para--white-line">Deep Dive into the Wild</p>',
                '<p class="paragraph--20 font-color--white font-weight--300 padding-bottom--20 m-0">16 Nights &amp; 17 Days</p>',
              '</div>',
            '</div>',
            '<div class="featured-text">',
              '<p class="m-0 all-caps font-weight--600 heading--22 font-color--white">Most Popular Tour</p>',
            '</div>',
          '</a>',
        '</div>',
      '</div>',

      '<div class="list-item">',
        '<a href="#" class="hover-box d-block" title="View A quick escape to the Hills">',
          '<picture>',
            '<img class="w-100 hover-box__img" src="https://walkerstours.eme-devops.com/2025/09/Ella-1.jpg?w=465&h=550&fit=crop&crop=right&auto=format,compress,enhance&q=50" alt="A quick escape to the Hills">',
          '</picture>',
          '<div class="hover-box__details">',
            '<div class="hover-box__details_visible">',
              '<p class="all-caps m-0 paragraph--14 font-color--white font-weight--500">Hill Country Tours</p>',
              '<p class="heading--24 font-weight--600 font-color--white all-caps para--white-line">A quick escape to the Hills</p>',
              '<p class="paragraph--20 font-color--white font-weight--300 padding-bottom--20 m-0">08 Nights &amp; 09 Days</p>',
            '</div>',
          '</div>',
        '</a>',
      '</div>',

      '<div class="list-item">',
        '<a href="#" class="hover-box d-block" title="View Family Escapade in Paradise">',
          '<picture>',
            '<img class="w-100 hover-box__img" src="https://walkerstours.eme-devops.com/2025/09/Safari-02-scaled.jpg?w=465&h=550&fit=crop&crop=center&auto=format,compress,enhance&q=50" alt="Family Escapade in Paradise">',
          '</picture>',
          '<div class="hover-box__details">',
            '<div class="hover-box__details_visible">',
              '<p class="all-caps m-0 paragraph--14 font-color--white font-weight--500">Family Tours</p>',
              '<p class="heading--24 font-weight--600 font-color--white all-caps para--white-line">Family Escapade in Paradise</p>',
              '<p class="paragraph--20 font-color--white font-weight--300 padding-bottom--20 m-0">18 Nights &amp; 19 Days</p>',
            '</div>',
          '</div>',
        '</a>',
      '</div>',

      '<div class="list-item">',
        '<a href="#" class="hover-box d-block" title="View The Cultural Odyssey">',
          '<picture>',
            '<img class="w-100 hover-box__img" src="https://walkerstours.eme-devops.com/2025/09/Culture-04-scaled.jpg?w=465&h=550&fit=crop&crop=center&auto=format,compress,enhance&q=50" alt="The Cultural Odyssey">',
          '</picture>',
          '<div class="hover-box__details">',
            '<div class="hover-box__details_visible">',
              '<p class="all-caps m-0 paragraph--14 font-color--white font-weight--500">Cultural Tours</p>',
              '<p class="heading--24 font-weight--600 font-color--white all-caps para--white-line">The Cultural Odyssey</p>',
              '<p class="paragraph--20 font-color--white font-weight--300 padding-bottom--20 m-0">08 Nights &amp; 09 Days</p>',
            '</div>',
          '</div>',
        '</a>',
      '</div>',

      '<div class="list-item">',
        '<a href="#" class="hover-box d-block" title="View Wander &amp; Awaken">',
          '<picture>',
            '<img class="w-100 hover-box__img" src="https://walkerstours.eme-devops.com/2025/09/Ayurevedic-05-scaled.jpg?w=465&h=550&fit=crop&crop=center&auto=format,compress,enhance&q=50" alt="Wander &amp; Awaken">',
          '</picture>',
          '<div class="hover-box__details">',
            '<div class="hover-box__details_visible">',
              '<p class="all-caps m-0 paragraph--14 font-color--white font-weight--500">Ayurvedic Tours</p>',
              '<p class="heading--24 font-weight--600 font-color--white all-caps para--white-line">Wander &amp; Awaken</p>',
              '<p class="paragraph--20 font-color--white font-weight--300 padding-bottom--20 m-0">10 Nights &amp; 11 Days</p>',
            '</div>',
          '</div>',
        '</a>',
      '</div>',

      '<div class="list-item">',
        '<a href="#" class="hover-box d-block" title="View Adventure, Culture &amp; love">',
          '<picture>',
            '<img class="w-100 hover-box__img" src="https://walkerstours.eme-devops.com/2025/09/Adventure-scaled.jpg?w=465&h=550&fit=crop&crop=center&auto=format,compress,enhance&q=50" alt="Adventure, Culture &amp; love">',
          '</picture>',
          '<div class="hover-box__details">',
            '<div class="hover-box__details_visible">',
              '<p class="all-caps m-0 paragraph--14 font-color--white font-weight--500">Honeymoon Tours</p>',
              '<p class="heading--24 font-weight--600 font-color--white all-caps para--white-line">Adventure, Culture &amp; love</p>',
              '<p class="paragraph--20 font-color--white font-weight--300 padding-bottom--20 m-0">16 Nights &amp; 17 Days</p>',
            '</div>',
          '</div>',
        '</a>',
      '</div>'
    ].join('');

    // CSS anti-clip patch
    if (document.getElementById('anti-clip-patch')) {
      document.getElementById('anti-clip-patch').remove();
    }
    var style = document.createElement('style');
    style.id = 'anti-clip-patch';
    style.innerHTML = [
      '.package-list .hover-box__details { bottom: 15px !important; }',
      '.package-list .hover-box__details_visible { padding-bottom: 15px !important; }',
      '.package-list .hover-box { min-height: 100% !important; height: auto !important; }'
    ].join(' ');
    document.head.appendChild(style);

    // Mark as patched so MutationObserver doesn't re-trigger
    container.setAttribute('data-patched', 'true');
    console.log('✅ patch.js: package-list grid applied');
  }

  // Fire after full load + 800ms — replicates manual console timing
  window.addEventListener('load', function() {
    setTimeout(applyPackageListFix, 800);
  });
})();


// ─── BLOCK 3: BLOG-GRID SLICK FIX ────────────────────────────────────────────
(function() {
  function applyBlogGridFix() {
    var grid = document.querySelector('.blog-grid');
    if (!grid) return;
    if (grid.getAttribute('data-patched') === 'true') return;

    var originalSlides = Array.from(grid.querySelectorAll('.slick-slide:not(.slick-cloned)'));
    if (originalSlides.length === 0) return;

    var pureHTML = originalSlides.map(function(slide) {
      var clone = slide.cloneNode(true);
      clone.className = clone.className.replace(/slick-[^\s]+/g, '').trim();
      clone.removeAttribute('data-slick-index');
      clone.removeAttribute('id');
      clone.removeAttribute('aria-hidden');
      clone.removeAttribute('tabindex');
      clone.style = '';
      return clone.outerHTML;
    }).join('');

    grid.innerHTML = pureHTML;
    grid.className = 'blog-grid';
    grid.setAttribute('data-patched', 'true');
    console.log('✅ patch.js: blog-grid rebuilt (' + originalSlides.length + ' articles)');
  }

  window.addEventListener('load', function() {
    setTimeout(applyBlogGridFix, 800);
  });
})();


// ─── BLOCK 4: HEADER SCROLL STATE FIX ───────────────────────────────────────
(function() {
  function fixHeader() {
    var header = document.querySelector('header.header');
    if (!header) return;
    header.classList.remove('header-scrolled');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) header.classList.add('header-scrolled');
      else header.classList.remove('header-scrolled');
    }, { passive: true });
    console.log('✅ patch.js: header scroll fixed');
  }
  window.addEventListener('load', function() { setTimeout(fixHeader, 100); });
})();


// ─── BLOCK 5: SECTION BACKGROUND GRADIENTS ───────────────────────────────────
(function() {
  var gradient = 'linear-gradient(90deg, hsla(49, 100%, 48%, 1) 0%, hsla(226, 69%, 30%, 1) 100%)';

  function findByHeading(text) {
    var headings = document.querySelectorAll('h1,h2,h3,h4');
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].textContent.trim().includes(text)) {
        var el = headings[i].parentElement;
        while (el && el.tagName !== 'SECTION' && el.tagName !== 'HEADER' && el.tagName !== 'FOOTER') {
          el = el.parentElement;
        }
        return el;
      }
    }
    return null;
  }

  function applyGradients() {
    // Hero
    var hero = document.querySelector('section.banner-section');
    if (hero) {
      hero.querySelectorAll('video, .video-container, .video-poster, div[class*="video"]').forEach(function(v) {
        v.style.setProperty('display', 'none', 'important');
        v.style.setProperty('opacity', '0', 'important');
      });
      hero.style.setProperty('background', gradient, 'important');
      hero.style.setProperty('min-height', '100vh', 'important');
    }

    // Class-based sections
    var classTargets = [
      'section.bg-color--light-blue',
      'section.image-content-sec',
      'section.padding-left--5perc',
      'section.bg-color--dark-green',
      'section.faq-sec',
    ];
    classTargets.forEach(function(sel) {
      var el = document.querySelector(sel);
      if (el) el.style.setProperty('background', gradient, 'important');
    });

    // Heading-based sections
    var headingTargets = [
      'Leading Destination',
      'Why Book',
      'Symphony',
      'LatestNews',
      'Accolades',
      'Journey of Excellence',
    ];
    headingTargets.forEach(function(text) {
      var el = findByHeading(text);
      if (el) el.style.setProperty('background', gradient, 'important');
    });

    console.log('✅ patch.js: section gradients applied');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyGradients);
  } else {
    applyGradients();
  }
  window.addEventListener('load', function() { setTimeout(applyGradients, 400); });
})();


// ─── BLOCK 5: SLICK FULL REINIT — strip baked state, reinit all sliders ──────
(function() {
  function stripAndReinitSliders() {

    // Strip all baked-in slick state from HTML snapshot
    document.querySelectorAll('.slick-initialized').forEach(function(el) {
      el.classList.remove('slick-initialized', 'slick-slider');
      el.querySelectorAll('.slick-prev, .slick-next, .slick-dots').forEach(function(a) { a.remove(); });
      var list = el.querySelector('.slick-list');
      if (list) {
        var track = list.querySelector('.slick-track');
        if (track) {
          Array.from(track.children)
            .filter(function(c) { return !c.classList.contains('slick-cloned'); })
            .forEach(function(slide) {
              slide.classList.remove('slick-slide','slick-current','slick-active','slick-visible','slick-cloned');
              slide.removeAttribute('data-slick-index');
              slide.removeAttribute('aria-hidden');
              slide.removeAttribute('tabindex');
              slide.removeAttribute('role');
              slide.removeAttribute('aria-describedby');
              slide.style.width = '';
              el.appendChild(slide);
            });
        }
        list.remove();
      }
    });

    if (!window.jQuery) return;

    // Four-item sliders (Tour Categories + Journey of Excellence)
    try {
      jQuery('.four-item-slider').slick({
        slidesToShow: 4, slidesToScroll: 1, arrows: true, dots: false, infinite: true,
        responsive: [
          { breakpoint: 1025, settings: { slidesToShow: 2, slidesToScroll: 1 } },
          { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
      });
    } catch(e) { console.warn('⚠️ four-item-slider:', e.message); }

    // Three-item slider (A Symphony of Exclusive Experiences)
    try {
      jQuery('.three-item-slider').slick({
        slidesToShow: 3, slidesToScroll: 1, arrows: true, dots: false, infinite: true,
        responsive: [
          { breakpoint: 1025, settings: { slidesToShow: 2, slidesToScroll: 1 } },
          { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
      });
    } catch(e) { console.warn('⚠️ three-item-slider:', e.message); }

    // One-item slider (Real Experiences / Reviews)
    try {
      jQuery('.one-item-slider').slick({
        slidesToShow: 1, slidesToScroll: 1, arrows: true, dots: true, infinite: true,
        autoplay: true, autoplaySpeed: 4000
      });
    } catch(e) { console.warn('⚠️ one-item-slider:', e.message); }

    // Seven-item slider (Accolades and Memberships)
    try {
      jQuery('.seven-item-slider').slick({
        slidesToShow: 7, slidesToScroll: 1, arrows: true, dots: false, infinite: true,
        autoplay: true, autoplaySpeed: 2000,
        responsive: [
          { breakpoint: 1025, settings: { slidesToShow: 4, slidesToScroll: 1 } },
          { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } }
        ]
      });
    } catch(e) { console.warn('⚠️ seven-item-slider:', e.message); }

    // Hide reviews dots — invisible and non-interactive
    var dotsStyle = document.createElement('style');
    dotsStyle.innerHTML = '.one-item-slider .slick-dots { pointer-events: none; opacity: 0; visibility: hidden; }';
    document.head.appendChild(dotsStyle);

    console.log('✅ patch.js: all sliders reinitialised');
  }

  // Must run before main.js touches the DOM — use DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', stripAndReinitSliders);
  } else {
    stripAndReinitSliders();
  }
})();