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
        formSubmitBtn.textContent = 'Send Inquiry';
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // --- QR Code: always link to live portfolio (not localhost) ---
  const qrImg = document.getElementById('qr-code');
  if (qrImg) {
    const LIVE_PORTFOLIO_URL = 'https://joyful-jalebi-2f13b7.netlify.app/';
    qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(LIVE_PORTFOLIO_URL);
  }

  // --- Projects: filter tabs + pagination ---
  var projectsGrid = document.getElementById('projects-grid');
  var filterBtns = document.querySelectorAll('.filter-btn');
  var pagePrev = document.getElementById('page-prev');
  var pageNext = document.getElementById('page-next');
  var pageInfo = document.getElementById('page-info');
  var PER_PAGE = 6;
  var currentFilter = 'all';
  var currentPage = 1;

  function getVisibleCards() {
    if (!projectsGrid) return [];
    var cards = projectsGrid.querySelectorAll('.project-card');
    return Array.from(cards).filter(function (card) {
      if (currentFilter === 'all') return true;
      return card.getAttribute('data-category') === currentFilter;
    });
  }

  function updateProjects() {
    var cards = projectsGrid ? projectsGrid.querySelectorAll('.project-card') : [];
    var visible = getVisibleCards();
    var totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));

    currentPage = Math.min(currentPage, totalPages);
    var start = (currentPage - 1) * PER_PAGE;
    var end = start + PER_PAGE;

    cards.forEach(function (card) {
      var cat = card.getAttribute('data-category');
      var matchesFilter = currentFilter === 'all' || cat === currentFilter;
      var idx = visible.indexOf(card);
      var onCurrentPage = idx >= start && idx < end;
      card.classList.toggle('hidden', !matchesFilter || !onCurrentPage);
    });

    if (pagePrev) {
      pagePrev.disabled = currentPage <= 1;
    }
    if (pageNext) {
      pageNext.disabled = currentPage >= totalPages;
    }
    if (pageInfo) {
      pageInfo.textContent = currentPage + ' of ' + totalPages;
    }

    var pagination = document.getElementById('projects-pagination');
    if (pagination) {
      pagination.classList.toggle('hidden', visible.length <= PER_PAGE && currentFilter !== 'all');
    }
  }

  function setFilter(filter) {
    currentFilter = filter;
    currentPage = 1;
    filterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });
    updateProjects();
  }

  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setFilter(btn.getAttribute('data-filter'));
      });
    });
  }

  if (pagePrev) {
    pagePrev.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--;
        updateProjects();
      }
    });
  }

  if (pageNext) {
    pageNext.addEventListener('click', function () {
      var visible = getVisibleCards();
      if (currentPage < Math.ceil(visible.length / PER_PAGE)) {
        currentPage++;
        updateProjects();
      }
    });
  }

  updateProjects();

  // --- Dynamic footer year ---
  var footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
})();
