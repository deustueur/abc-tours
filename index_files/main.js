
// ── ABC TOURS — main.js (clean rebuild, no gsap, no locomotive, no slick) ──
// All slider init → patch.js
// All gradients → patch.js  
// All lazy images → patch.js
// Header scroll → patch.js

jQuery(document).ready(function($) {

  // ── HAMBURGER MENU ──
  const hams = document.querySelectorAll('.ham');
  const hamclose = document.querySelector('.hamclose');
  const menu = document.querySelector('.main-menu');
  const overlay = document.querySelector('.menu-overlay');

  function openMenu() {
    if (!menu || !overlay) return;
    menu.style.visibility = 'visible';
    menu.style.opacity = '1';
    let menuWidth = window.innerWidth < 600 ? '100%' : window.innerWidth < 1025 ? '50%' : '30vw';
    menu.style.width = menuWidth;
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    hams.forEach(h => h.classList.add('is-active'));
    if (hamclose) hamclose.classList.add('is-active');
  }

  function closeMenu() {
    if (!menu || !overlay) return;
    menu.style.opacity = '0';
    menu.style.width = '0';
    setTimeout(() => { menu.style.visibility = 'hidden'; }, 300);
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    hams.forEach(h => h.classList.remove('is-active'));
    if (hamclose) hamclose.classList.remove('is-active');
  }

  hams.forEach(ham => ham.addEventListener('click', openMenu));
  if (hamclose) hamclose.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', function(e) {
    if (menu && !menu.contains(e.target)) closeMenu();
  });

  // ── MEGA MENU ──
  const hamIcons = document.querySelectorAll('.ham');
  const megaMenu = document.querySelector('#walkers-mega-menu');
  const megaClose = document.querySelector('#mega-close');

  if (megaMenu) {
    hamIcons.forEach(ham => {
      ham.addEventListener('click', () => megaMenu.classList.add('active'));
    });
  }
  if (megaClose) {
    megaClose.addEventListener('click', () => {
      megaMenu.classList.remove('active');
      hamIcons.forEach(ham => ham.classList.remove('is-active'));
    });
  }

  // ── SEARCH TOGGLE ──
  $('.search-btn').on('click', function() {
    $('#header').toggleClass('openmenu');
  });

  // ── NAVBAR TOGGLER ──
  $('.navbar-toggler').on('click', function() {
    $('#header').toggleClass('open');
    $('#scroll-toggler').toggleClass('open');
    $('#header-toggler').toggleClass('open');
    $('#scroll-in-toggler').toggleClass('open');
  });

  // ── OFFCANVAS CLOSE ──
  $('.offcanvas').on('hidden.bs.offcanvas', function() {
    $('#header').removeClass('open');
    $('#scroll-toggler').removeClass('open');
    $('#header-toggler').removeClass('open');
    $('#scroll-in-toggler').removeClass('open');
  });

  // ── SCROLL TO TOP ──
  var scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── SUBMENU COLLAPSE ──
  document.querySelectorAll('.menu-item-has-children').forEach(function(menuItem) {
    var toggleButton = menuItem.querySelector('.toggle-btn-slide');
    var submenu = menuItem.querySelector('.submenu');
    if (!submenu || !toggleButton) return;

    function closeOtherSubmenus(currentSubmenu, currentToggle) {
      document.querySelectorAll('.submenu.show').forEach(function(openSubmenu) {
        if (openSubmenu !== currentSubmenu) {
          new bootstrap.Collapse(openSubmenu, { toggle: false }).hide();
        }
      });
      document.querySelectorAll('.toggle-btn-slide.active').forEach(function(btn) {
        if (btn !== currentToggle) btn.classList.remove('active');
      });
    }

    toggleButton.addEventListener('click', function(e) {
      e.stopPropagation();
      var collapse = new bootstrap.Collapse(submenu, { toggle: false });
      if (submenu.classList.contains('show')) {
        collapse.hide();
        toggleButton.classList.remove('active');
      } else {
        closeOtherSubmenus(submenu, toggleButton);
        collapse.show();
        toggleButton.classList.add('active');
      }
    });
  });

  // ── FANCYBOX ──
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind('[data-fancybox]');
  }

  // ── COUNTER ANIMATION ──
  $(window).scroll(function() {
    var nav = $('.counter-box');
    if (!nav.length) return;
    var oTop = $('.counter-box').offset().top - window.innerHeight;
    if ($(window).scrollTop() > oTop) {
      $('.counter').each(function() {
        var $this = $(this), countTo = $this.attr('data-number');
        if ($this.attr('data-counted')) return;
        $this.attr('data-counted', true);
        $({ countNum: $this.text() }).animate({ countNum: countTo }, {
          duration: 850,
          easing: 'swing',
          step: function() { $this.text(Math.ceil(this.countNum).toLocaleString('en')); },
          complete: function() { $this.text(Math.ceil(this.countNum).toLocaleString('en')); }
        });
      });
    }
  });

  // ── SCROLL ANIMATION (.js-scroll) ──
  var scrollElements = document.querySelectorAll('.js-scroll');
  function handleScrollAnimation() {
    var isLargeScreen = window.innerWidth > 1025;
    var viewFactor = isLargeScreen ? 1.2 : 1;
    scrollElements.forEach(function(el) {
      var elementTop = el.getBoundingClientRect().top;
      var inView = elementTop <= (window.innerHeight || document.documentElement.clientHeight) / viewFactor;
      if (inView) el.classList.add('scrolled');
    });
  }
  window.addEventListener('DOMContentLoaded', handleScrollAnimation);
  window.addEventListener('scroll', handleScrollAnimation);

  // ── REMOVED-ANCHOR REPLACEMENT ──
  document.querySelectorAll('li.removed-anchor').forEach(function(li) {
    var anchor = li.querySelector('a');
    if (!anchor) return;
    var span = document.createElement('span');
    span.innerHTML = anchor.innerHTML;
    span.className = anchor.className;
    for (var i = 0; i < anchor.attributes.length; i++) {
      var attr = anchor.attributes[i];
      if (attr.name !== 'href') span.setAttribute(attr.name, attr.value);
    }
    anchor.replaceWith(span);
  });

  // ── LAZY BACKGROUND IMAGES ──
  var lazyBackgrounds = document.querySelectorAll('.lazyBackground');
  if ('IntersectionObserver' in window && lazyBackgrounds.length) {
    var bgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.backgroundImage = 'url(' + el.dataset.imgsrc + ')';
          el.classList.remove('lazyBackground');
          el.classList.add('visibleImg');
          bgObserver.unobserve(el);
        }
      });
    }, { rootMargin: '500px', threshold: 0.05 });
    lazyBackgrounds.forEach(function(el) { bgObserver.observe(el); });
  }

});
