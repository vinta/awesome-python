/**
 * Awesome Python — Futuristic Theme Enhancements
 * Floating particles, intersection observers, and dynamic effects
 */

(function () {
  'use strict';

  // --- Floating Particle System ---
  function initParticles() {
    var canvas = document.getElementById('futuristic-canvas');
    if (!canvas) {
      canvas = document.createElement('div');
      canvas.id = 'futuristic-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.appendChild(canvas);
    }

    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '0',
      overflow: 'hidden'
    });

    var particleCount = window.innerWidth < 768 ? 15 : 30;

    for (var i = 0; i < particleCount; i++) {
      createParticle(canvas);
    }
  }

  function createParticle(container) {
    var particle = document.createElement('div');
    var size = Math.random() * 3 + 1;
    var colors = [
      'rgba(0, 240, 255, 0.4)',
      'rgba(255, 0, 229, 0.3)',
      'rgba(77, 124, 255, 0.35)',
      'rgba(180, 77, 255, 0.3)'
    ];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var duration = Math.random() * 20 + 15;
    var delay = Math.random() * -20;

    Object.assign(particle.style, {
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      background: color,
      borderRadius: '50%',
      boxShadow: '0 0 ' + (size * 3) + 'px ' + color,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animation: 'particleFloat ' + duration + 's ease-in-out ' + delay + 's infinite',
      opacity: '0'
    });

    container.appendChild(particle);

    // Fade in
    requestAnimationFrame(function () {
      particle.style.transition = 'opacity 2s ease';
      particle.style.opacity = String(Math.random() * 0.6 + 0.2);
    });
  }

  // Inject keyframes for particles
  function injectParticleKeyframes() {
    var style = document.createElement('style');
    style.textContent =
      '@keyframes particleFloat {' +
      '  0%, 100% { transform: translate(0, 0) scale(1); }' +
      '  25% { transform: translate(' + (Math.random() * 100 - 50) + 'px, ' + (Math.random() * -80 - 20) + 'px) scale(1.2); }' +
      '  50% { transform: translate(' + (Math.random() * 60 - 30) + 'px, ' + (Math.random() * -150 - 30) + 'px) scale(0.8); }' +
      '  75% { transform: translate(' + (Math.random() * -80 + 40) + 'px, ' + (Math.random() * -60 - 10) + 'px) scale(1.1); }' +
      '}';
    document.head.appendChild(style);
  }

  // --- Intersection Observer for Scroll Animations ---
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    // Observe all h2 elements and list items
    document.querySelectorAll('.md-typeset h2').forEach(function (el) {
      el.classList.add('scroll-reveal');
      observer.observe(el);
    });
  }

  // Inject scroll animation styles
  function injectScrollStyles() {
    var style = document.createElement('style');
    style.textContent =
      '.scroll-reveal {' +
      '  opacity: 0;' +
      '  transform: translateY(20px);' +
      '  transition: opacity 0.6s ease, transform 0.6s ease;' +
      '}' +
      '.scroll-reveal.visible {' +
      '  opacity: 1;' +
      '  transform: translateY(0);' +
      '}';
    document.head.appendChild(style);
  }

  // --- Category Counter Badge ---
  function addCategoryCounters() {
    document.querySelectorAll('.md-typeset h2').forEach(function (h2) {
      var nextEl = h2.nextElementSibling;

      // Skip past italic description paragraphs
      while (nextEl && nextEl.tagName === 'P') {
        nextEl = nextEl.nextElementSibling;
      }

      if (nextEl && nextEl.tagName === 'UL') {
        var count = nextEl.children.length;
        var badge = document.createElement('span');
        badge.textContent = count;
        badge.title = count + ' libraries';
        Object.assign(badge.style, {
          display: 'inline-block',
          marginLeft: '10px',
          padding: '2px 10px',
          fontSize: '0.55em',
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: '500',
          color: '#00f0ff',
          background: 'rgba(0, 240, 255, 0.08)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '12px',
          verticalAlign: 'middle',
          letterSpacing: '0'
        });
        h2.appendChild(badge);
      }
    });
  }

  // --- Typing Effect for H1 ---
  function initTypingEffect() {
    var h1 = document.querySelector('.md-typeset h1');
    if (!h1) return;

    var badge = h1.querySelector('a');
    var originalText = h1.childNodes[0];
    if (!originalText || originalText.nodeType !== 3) return;

    var text = originalText.textContent.trim();
    originalText.textContent = '';

    var cursor = document.createElement('span');
    cursor.textContent = '|';
    Object.assign(cursor.style, {
      color: '#00f0ff',
      animation: 'cursorBlink 1s step-end infinite',
      fontWeight: '300',
      marginLeft: '2px'
    });

    h1.insertBefore(cursor, badge || null);

    // Inject cursor blink style
    var style = document.createElement('style');
    style.textContent =
      '@keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }';
    document.head.appendChild(style);

    // Type out characters
    var i = 0;
    var textNode = document.createTextNode('');
    h1.insertBefore(textNode, cursor);

    function typeChar() {
      if (i < text.length) {
        textNode.textContent += text[i];
        i++;
        setTimeout(typeChar, 50 + Math.random() * 40);
      } else {
        // Remove cursor after typing completes
        setTimeout(function () {
          cursor.style.transition = 'opacity 1s ease';
          cursor.style.opacity = '0';
          setTimeout(function () { cursor.remove(); }, 1000);
        }, 2000);
      }
    }

    setTimeout(typeChar, 500);
  }

  // --- Initialization ---
  function init() {
    injectParticleKeyframes();
    injectScrollStyles();
    initParticles();
    initScrollAnimations();
    addCategoryCounters();
    initTypingEffect();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
