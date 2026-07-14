/* ═══════════════════════════════════════════════════════════════
   book.js — KreativSales Book a Call page
═══════════════════════════════════════════════════════════════ */

// ── Dynamic year
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', targetTheme);
    themeToggle.textContent = targetTheme === 'light' ? '🌓' : '☀️';
  });
}

// Modal logic removed

// ── Sticky bar logic removed (bar is now permanently fixed via CSS)

// ── FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', function () {
    const isOpen = this.getAttribute('aria-expanded') === 'true';
    const answerId = this.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);

    // Close all others
    document.querySelectorAll('.faq-q').forEach(otherBtn => {
      const otherId = otherBtn.getAttribute('aria-controls');
      const otherAnswer = document.getElementById(otherId);
      otherBtn.setAttribute('aria-expanded', 'false');
      if (otherAnswer) otherAnswer.hidden = true;
    });

    // Toggle this one
    if (!isOpen) {
      this.setAttribute('aria-expanded', 'true');
      if (answer) answer.hidden = false;
    }
  });
});

// Form logic removed

// ── Scroll fade-in for cards
const fadeEls = document.querySelectorAll(
  '.client-card, .highlight-pill, .faq-item, .proof-box'
);

const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
  fadeObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.in-view').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});

// Triggered by observer
document.querySelectorAll('.client-card, .highlight-pill, .faq-item, .proof-box')
  .forEach(el => {
    el.addEventListener('transitionend', () => {}, { once: true });
  });

// Removed document.body observer that caused position: fixed to break

// Simplified: just re-observe
fadeEls.forEach(el => {
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  }, { threshold: 0.1 }).observe(el);
});
