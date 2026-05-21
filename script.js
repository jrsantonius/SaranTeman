document.addEventListener('DOMContentLoaded', function () {

  // ========================================
  // LOADER
  // ========================================
  var loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('hidden');
    }, 800);
  });

  // Fallback: hide loader after 3s max
  setTimeout(function () {
    loader.classList.add('hidden');
  }, 3000);

  // ========================================
  // NAVBAR
  // ========================================
  var navbar = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  var navLinkItems = navLinks.querySelectorAll('a');
  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ========================================
  // SCROLL REVEAL (Intersection Observer)
  // ========================================
  var revealElements = document.querySelectorAll('.reveal-up, .reveal-text');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ========================================
  // ANIMATED COUNTERS
  // ========================================
  function animateCounter(element, target, isDecimal, suffix, duration) {
    duration = duration || 2000;
    var start = 0;
    var startTime = null;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      if (!startTime) startTime = currentTime;
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var easedProgress = easeOutCubic(progress);
      var current = start + (target - start) * easedProgress;

      if (isDecimal) {
        element.textContent = current.toFixed(2) + suffix;
      } else {
        element.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (isDecimal) {
          element.textContent = target.toFixed(2) + suffix;
        } else {
          element.textContent = target + suffix;
        }
      }
    }

    requestAnimationFrame(update);
  }

  // About section counters
  var aboutCounters = document.querySelectorAll('.about-stat-number');
  var aboutObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target, false, '', 2000);
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  aboutCounters.forEach(function (el) {
    aboutObserver.observe(el);
  });

  // Impact section counters
  var impactCounters = document.querySelectorAll('.impact-number');
  var impactObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var target = parseFloat(entry.target.getAttribute('data-target'));
        var suffix = entry.target.getAttribute('data-suffix') || '';
        var isDecimal = entry.target.getAttribute('data-decimal') === 'true';
        animateCounter(entry.target, target, isDecimal, suffix, 2500);
        impactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  impactCounters.forEach(function (el) {
    impactObserver.observe(el);
  });

  // ========================================
  // SERVICE CARD TILT EFFECT
  // ========================================
  var serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = (y - centerY) / 20;
      var rotateY = (centerX - x) / 20;
      card.style.transform = 'perspective(1000px) rotateX(' + (-rotateX) + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  // ========================================
  // BACK TO TOP
  // ========================================
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========================================
  // CONTACT FORM → WHATSAPP
  // ========================================
  var contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('formName').value.trim();
    var company = document.getElementById('formCompany').value.trim();
    var email = document.getElementById('formEmail').value.trim();
    var phone = document.getElementById('formPhone').value.trim();
    var service = document.getElementById('formService').value;
    var message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !service || !message) {
      shakeButton(contactForm.querySelector('.btn'));
      return;
    }

    var waMessage = 'Hi Saran Teman! 👋\n\n';
    waMessage += '📌 *New Project Inquiry*\n\n';
    waMessage += '*Name:* ' + name + '\n';
    if (company) waMessage += '*Company:* ' + company + '\n';
    waMessage += '*Email:* ' + email + '\n';
    if (phone) waMessage += '*Phone:* ' + phone + '\n';
    waMessage += '*Service:* ' + service + '\n';
    waMessage += '*Message:* ' + message;

    var waUrl = 'https://wa.me/628561660100?text=' + encodeURIComponent(waMessage);
    window.open(waUrl, '_blank');
  });

  function shakeButton(btn) {
    btn.style.animation = 'shake 0.5s';
    btn.addEventListener('animationend', function () {
      btn.style.animation = '';
    }, { once: true });
  }

  // Add shake keyframes dynamically
  var shakeStyle = document.createElement('style');
  shakeStyle.textContent = '@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }';
  document.head.appendChild(shakeStyle);

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 20;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ========================================
  // ACTIVE NAV LINK ON SCROLL
  // ========================================
  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset + 200;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-links a[href="#' + id + '"]');
      if (link && !link.classList.contains('nav-cta')) {
        if (scrollY >= top && scrollY < top + height) {
          link.style.opacity = '1';
        } else {
          link.style.opacity = '';
        }
      }
    });
  });

});
