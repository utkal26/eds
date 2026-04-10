import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

let lastScroll = 0;

function handleScroll(header) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add background when scrolled
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }

    lastScroll = currentScroll;
  });
}

function applyCTA(nav) {
  const items = nav.querySelectorAll('.nav-sections li');

  items.forEach((li) => {
    const strong = li.querySelector('strong');
    if (strong) {
      strong.replaceWith(...strong.childNodes);
      const link = li.querySelector('a');
      if (link) link.classList.add('header-button');
    }
  });
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';

  const fragment = await loadFragment(navPath);

  block.textContent = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';

  while (fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  // Assign structure classes
  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // Apply CTA logic (**bold → button)
  applyCTA(nav);

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';

  wrapper.append(nav);
  block.append(wrapper);

  // Scroll behavior
  handleScroll(wrapper);

  // ===== MOBILE MENU =====

// Create hamburger
const hamburger = document.createElement('div');
hamburger.className = 'nav-hamburger';
hamburger.innerHTML = `
  <span></span>
  <span></span>
  <span></span>
`;

// Create mobile menu
const mobileMenu = document.createElement('div');
mobileMenu.className = 'nav-mobile';

// ✅ Close button
const closeBtn = document.createElement('div');
closeBtn.className = 'nav-close';
closeBtn.innerHTML = '✕';

// Clone nav links
const mobileLinks = nav.querySelector('.nav-sections').cloneNode(true);

// Append
mobileMenu.append(closeBtn, mobileLinks);

// Toggle open
hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

// Close button click
closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});

// Close on link click
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Append
wrapper.append(hamburger);
document.body.append(mobileMenu);
}