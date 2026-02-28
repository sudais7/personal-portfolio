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

  // --- Contact form (Formspree) - matches Formspree recommended pattern ---
  var contactForm = document.getElementById('contact-form');
  var formStatus = document.getElementById('form-status');
  var formSubmitBtn = document.getElementById('form-submit-btn');

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formSubmitBtn) {
      formSubmitBtn.disabled = true;
      formSubmitBtn.textContent = 'Sending...';
    }
    if (formStatus) {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: event.target.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        if (formStatus) {
          formStatus.textContent = 'Thanks for your submission! I\'ll get back to you soon.';
          formStatus.className = 'form-status form-status-success';
        }
        contactForm.reset();
      } else {
        return response.json().then(function (data) {
          if (formStatus) {
            if (data.errors && data.errors.length) {
              formStatus.textContent = data.errors.map(function (e) { return e.message; }).join(', ');
            } else {
              formStatus.textContent = 'Oops! There was a problem submitting your form.';
            }
            formStatus.className = 'form-status form-status-error';
          }
        });
      }
    }).catch(function () {
      if (formStatus) {
        formStatus.textContent = 'Oops! There was a problem submitting your form.';
        formStatus.className = 'form-status form-status-error';
      }
    }).finally(function () {
      if (formSubmitBtn) {
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = 'Send Message';
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // --- QR Code: generate from current page URL ---
  const qrImg = document.getElementById('qr-code');
  if (qrImg) {
    const portfolioUrl = window.location.href.split('#')[0];
    qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(portfolioUrl);
  }
})();
