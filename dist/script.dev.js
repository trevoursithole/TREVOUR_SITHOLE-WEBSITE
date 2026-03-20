"use strict";

document.addEventListener('DOMContentLoaded', function () {
  /* Custom Cursor  */
  var cursor = document.getElementById('cursor');
  var cursorRing = document.getElementById('cursor-ring');
  var mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0;
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursorRing);
  }

  animateCursorRing(); // Expand cursor on interactive elements

  var interactiveEls = document.querySelectorAll('a, button, .skill-card, .project-card, .release-card');
  interactiveEls.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursorRing.style.width = '48px';
      cursorRing.style.height = '48px';
    });
    el.addEventListener('mouseleave', function () {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursorRing.style.width = '32px';
      cursorRing.style.height = '32px';
    });
  });
  /* Scroll Fade-Up Animation */

  var fadeEls = document.querySelectorAll('.fade-up');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          return entry.target.classList.add('visible');
        }, 80);
      }
    });
  }, {
    threshold: 0.1
  });
  fadeEls.forEach(function (el) {
    return observer.observe(el);
  });
  var staggerSelectors = ['.skills-grid .fade-up', '.projects-grid .fade-up', '.stats-bar .fade-up', '.music-releases .fade-up'];
  staggerSelectors.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.style.transitionDelay = i * 80 + 'ms';
    });
  });
  /* Active Nav Link on Scroll */

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', function () {
    var currentId = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 100) {
        currentId = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.style.color = link.getAttribute('href') === '#' + currentId ? 'var(--teal)' : '';
    });
  });
});
//# sourceMappingURL=script.dev.js.map
