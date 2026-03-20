
document.addEventListener('DOMContentLoaded', () => {

  /* Custom Cursor  */
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Expand cursor on interactive elements
  const interactiveEls = document.querySelectorAll('a, button, .skill-card, .project-card, .release-card');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '16px';
      cursor.style.height = '16px';
      cursorRing.style.width  = '48px';
      cursorRing.style.height = '48px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '10px';
      cursor.style.height = '10px';
      cursorRing.style.width  = '32px';
      cursorRing.style.height = '32px';
    });
  });

  /* Scroll Fade-Up Animation */
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 80);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));

  
  const staggerSelectors = [
    '.skills-grid .fade-up',
    '.projects-grid .fade-up',
    '.stats-bar .fade-up',
    '.music-releases .fade-up',
  ];
  staggerSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = (i * 80) + 'ms';
    });
  });

  /* Active Nav Link on Scroll */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        currentId = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + currentId
        ? 'var(--teal)'
        : '';
    });
  });

});
