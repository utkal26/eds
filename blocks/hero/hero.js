export default function decorate(block) {
  const rows = [...block.children];

  // ===== GET VALUES =====
  const imageRow = rows[0];
  const titleRow = rows[1];
  const subtitleRow = rows[2];

  // ===== IMAGE (FROM LINK OR TEXT) =====
  let imgSrc = '';

  const link = imageRow.querySelector('a');
  if (link) {
    imgSrc = link.href;
  } else {
    imgSrc = imageRow.textContent.trim();
  }

  // ===== BACKGROUND =====
  const bg = document.createElement('div');
  bg.className = 'hero-bg';

  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = 'hero background';

  bg.append(img);

  // ===== OVERLAY =====
  const overlay = document.createElement('div');
  overlay.className = 'hero-overlay';

  // ===== CONTENT =====
  const content = document.createElement('div');
  content.className = 'hero-content';

  const title = document.createElement('h1');
  title.className = 'hero-title';
  title.textContent = titleRow.textContent;

  const subtitle = document.createElement('p');
  subtitle.className = 'hero-subtitle';
  subtitle.textContent = subtitleRow.textContent;

  content.append(title, subtitle);

  // ===== SCROLL INDICATOR =====
  const scroll = document.createElement('div');
  scroll.className = 'hero-scroll';
  scroll.innerHTML = '↓';

  // ===== FINAL WRAPPER =====
  const container = document.createElement('div');
  container.className = 'hero';

  container.append(bg, overlay, content, scroll);

  block.textContent = '';
  block.append(container);
}