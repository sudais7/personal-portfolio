/**
 * Portfolio - Main Script
 * Handles: navigation, smooth scroll, mobile menu, form
 */

(function () {
  'use strict';

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }

      // Close mobile menu if open
      document.getElementById('nav-menu').classList.remove('active');
    });
  });

  // --- Mobile navigation toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });
  }

  // --- Close mobile menu when clicking outside ---
  document.addEventListener('click', function (e) {
    if (navMenu && navMenu.classList.contains('active')) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    }
  });

  // --- Contact form (Formspree) ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Form submits to Formspree; no preventDefault needed
      // Optional: show success message via Formspree's redirect or JSON response
    });
  }

  // --- QR Code: generate from current page URL ---
  const qrImg = document.getElementById('qr-code');
  if (qrImg) {
    const portfolioUrl = window.location.href.split('#')[0];
    qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(portfolioUrl);
  }
})();
