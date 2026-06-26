// === ABC TOURS: patch.js (NATIVE GRIDS) ===
console.log('🚀 patch.js: Waking up...');

// 1. CAROUSEL BURNER -> NATIVE GRIDS
function buildNativeGrids() {
  const sliders = document.querySelectorAll('.four-item-slider, .three-item-slider, .seven-item-slider, .one-item-slider');
  
  sliders.forEach(grid => {
    // Strip toxic classes
    grid.classList.remove('slick-initialized', 'slick-slider');
    
    // Force native grid
    grid.style.setProperty('display', 'grid', 'important');
    grid.style.setProperty('gap', '20px', 'important');
    grid.style.setProperty('align-items', 'stretch', 'important');
    grid.style.setProperty('padding', '20px 0', 'important');
    
    // Set columns
    if (grid.className.includes('four-item')) {
      grid.style.setProperty('grid-template-columns', 'repeat(auto-fit, minmax(240px, 1fr))', 'important');
    } else if (grid.className.includes('three-item')) {
      grid.style.setProperty('grid-template-columns', 'repeat(auto-fit, minmax(300px, 1fr))', 'important');
    } else if (grid.className.includes('seven-item')) {
      grid.style.setProperty('grid-template-columns', 'repeat(auto-fit, minmax(120px, 1fr))', 'important');
    } else if (grid.className.includes('one-item')) {
      grid.style.setProperty('grid-template-columns', '1fr', 'important');
    }

    // Clean children widths
    Array.from(grid.children).forEach(child => {
      child.style.setProperty('width', '100%', 'important');
      child.style.setProperty('max-width', '100%', 'important');
      child.style.setProperty('margin', '0', 'important'); 
    });
  });
  console.log('✅ patch.js: Intercept successful. Stacks converted to CSS Grids.');
}

// 2. PACKAGE & BLOG GRIDS 
function fixOtherGrids() {
    const pkgList = document.querySelectorAll('.package-list, .package-list-zombie-dead, .blog-grid');
    pkgList.forEach(el => {
        el.classList.remove('slick-initialized', 'slick-slider');
        el.style.setProperty('display', 'grid', 'important');
        el.style.setProperty('grid-template-columns', 'repeat(auto-fit, minmax(300px, 1fr))', 'important');
        el.style.setProperty('gap', '20px', 'important');
    });
    console.log('✅ patch.js: Package and Blog grids fixed.');
}

// 3. GRADIENTS 
function applyGradients() {
   document.querySelectorAll('section.bg-white, section.about-us-section').forEach(el => {
     el.style.setProperty('background', 'hsla(49, 100%, 48%, 1)', 'important');
     el.style.setProperty('color', '#000', 'important');
   });
   console.log('✅ patch.js: Gradients applied.');
}

// === FIRE EVERYTHING INSTANTLY ===
buildNativeGrids();
fixOtherGrids();
applyGradients();
