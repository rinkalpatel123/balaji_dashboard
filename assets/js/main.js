/**
 * main.js
 * Handles opening/closing the sidebar, backdrop clicks, Esc handling, and ARIA updates.
 * Vanilla JS, accessible, minimal dependencies.
 */

const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('appSidebar');
const backdrop = document.getElementById('sidebarBackdrop');
const closeBtn = document.getElementById('sidebarCloseBtn');

// Defensive checks
if (!hamburgerBtn || !sidebar || !backdrop) {
  console.warn('Missing required sidebar elements. Expected IDs: hamburgerBtn, appSidebar, sidebarBackdrop');
}

/**
 * Open the sidebar with animation and accessibility changes
 */
function openSidebar() {
  sidebar.classList.add('is-open');
  backdrop.classList.add('is-visible');

  // ARIA and focus management
  hamburgerBtn?.setAttribute('aria-expanded', 'true');
  sidebar?.setAttribute('aria-hidden', 'false');

  // Prevent page scroll on mobile when overlayed
  if (window.matchMedia('(max-width: 991px)').matches) {
    document.body.style.overflow = 'hidden';
  }

  // Move focus into the sidebar (close button)
  closeBtn?.focus();
}

/**
 * Close the sidebar and restore states
 */
function closeSidebar() {
  sidebar.classList.remove('is-open');
  backdrop.classList.remove('is-visible');

  hamburgerBtn?.setAttribute('aria-expanded', 'false');
  // If on desktop the sidebar remains aria-hidden=false by default; keep false here for mobile
  sidebar?.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';

  // Return focus to hamburger for accessibility
  hamburgerBtn?.focus();
}

/**
 * Toggle handler
 */
function toggleSidebar() {
  if (sidebar.classList.contains('is-open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

// Event listeners
hamburgerBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleSidebar();
});

closeBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  closeSidebar();
});

// Clicking backdrop should close sidebar
backdrop?.addEventListener('click', () => {
  closeSidebar();
});

// Prevent clicks inside the sidebar from bubbling to document (avoid accidental close)
sidebar?.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    if (sidebar.classList.contains('is-open')) {
      closeSidebar();
    }
  }
});

// When resizing, ensure body scroll/aria states are correct
window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 1200px)').matches) {
    // On very large screens keep sidebar closed (per requirement) but restore scroll
    document.body.style.overflow = '';
    sidebar?.setAttribute('aria-hidden', 'true');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    backdrop?.classList.remove('is-visible');
    sidebar?.classList.remove('is-open');
  } else {
    // On small screens, if not open keep aria-hidden
    if (!sidebar.classList.contains('is-open')) {
      sidebar?.setAttribute('aria-hidden', 'true');
    }
  }
});

// Initialize ARIA attributes on load
(function init() {
  if (window.matchMedia('(min-width: 1200px)').matches) {
    sidebar?.setAttribute('aria-hidden', 'true');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
  } else {
    sidebar?.setAttribute('aria-hidden', 'true');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
  }
})();


///////////////bannner image change/////////////// 
let mySlider = document.querySelector('#mainSlider');
let slider = new bootstrap.Carousel(mySlider, {
  interval: 4000,
  ride: 'carousel'
});


// optional: initialize with custom interval (4s)
document.addEventListener('DOMContentLoaded', function () {
  const el = document.querySelector('#mainSlider');
  if (el) {
    new bootstrap.Carousel(el, { interval: 4000, ride: 'carousel' });
  }
});


///////////////////////////////////////////
