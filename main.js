/* ═══════════════════════════════════════════════════════════
   GIGAglas — main.js
   - Horizontal panel navigation (desktop) + arrow key / wheel
   - Mobile burger menu
   - Product card slider
   - Contact form with validation
   - Footer year
   - NL/EN language toggle
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Footer year ────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ══════════════════════════════════════════════════════
  //  TRANSLATIONS
  // ══════════════════════════════════════════════════════
  var currentLang = 'nl';
  var _restartWordCycle = null;   // set by word-cycle init below

  var T = {
    nl: {
      'nav-about':        'Over ons',
      'nav-references':   'Referenties',
      'nav-products':     'Producten',
      'nav-why':          'Waarom GIGAglas',
      'nav-cta':          'Offerte aanvragen',
      'hero-eyebrow':     'Internationale Veiligheidsglasgroothandel',
      'hero-headline':    'Glas dat<br /><span class="text-accent">presteert</span><br />op elke schaal.',
      'hero-sub':         'Van oversized geharde panelen tot 18\u202Fm, gebogen beglazing, brandwerende barri\xe8res tot precisie gelamineerd en zeefdruk glas \u2014 GIGAglas levert het volledige spectrum veiligheidsbeglazing tegen groothandelsprijzen in Europa.',
      'hero-btn-explore': 'Bekijk producten',
      'hero-btn-quote':   'Offerte aanvragen',
      'hero-caption':     'CS Arnhem \u2014 gebogen glazen dakconstructie',
      'scroll-label':     'Scroll',
      'about-eyebrow':    'Wie wij zijn',
      'about-title':      'Uw strategische<br />partner in<br />veiligheidsbeglazing.',
      'about-body1':      'GIGAglas is een internationale glasgroothandel met diepgaande expertise in gecertificeerd veiligheidsglas. Door de juiste productiepartnerschappen in Europa en daarbuiten op te bouwen, ontsluiten wij productiecapaciteiten en prijzen die via conventionele kanalen simpelweg niet beschikbaar zijn.',
      'about-body2':      'Of u nu \xe9\xe9n hoogwaardige gevel beglaasd of een grootschalig bouwprogramma uitvoert, wij matchen uw exacte specificatie \u2014 technisch, logistiek en commercieel.',
      'about-check1':     'CE-gecertificeerde producten conform EN-normen',
      'about-check2':     'Directe fabrieksaccess \u2014 geen tussenhandelsmarge',
      'about-check3':     'Maatgerichte logistiek voor groot- en kwetsbaar transport',
      'about-check4':     'Technische ondersteuning van specificatie tot levering',
      'stat1':            'Max. lengte gehard paneel',
      'stat2':            'Gecertificeerd',
      'stat3':            'Max. brandweerstandsklasse',
      'stat4':            'Groothandeldistributie',
      'ref-eyebrow':      'Ons werk',
      'ref-title':        'Projecten<br />in Europa.',
      'ref-sub':          'Markante beglazing geleverd<br />op elke schaal.',
      'ref-type1':        'Gelamineerde gevelbeglazing',
      'ref-type2':        'Constructief gehard glas',
      'ref-type3':        'Zeefdruk glas',
      'ref-type4':        'Gordijngevelglazing',
      'ref-type5':        'Brandwerend glas',
      'ref-type6':        'Gelaagd glas',
      'ref-type7':        'Gebogen glas',
      'ref-type8':        'Gehard glas',
      'prod-eyebrow':     'Wat wij bieden',
      'prod-title':       'Ons product<br />assortiment',
      'prod-sub':         'Gespecialiseerd in gecertificeerde veiligheidsbeglazing voor grootschalige architectuur- en bouwprojecten. Van oversized geharde panelen tot brandwerende systemen \u2014 altijd op maat geproduceerd, CE-gecertificeerd en direct uit de fabriek geleverd.',
      'prod-tempered':    'Gehard Glas',
      'prod-laminated':   'Gelaagd Glas',
      'prod-fire':        'Brandwerend Glas',
      'prod-screen':      'Zeefdruk glas',
      'prod-enquire':     'Informeer \u2192',
      'why-eyebrow':      'Ons voordeel',
      'why-title':        'Waarom<br />GIGAglas?',
      'why-sub':          'De juiste partnerschappen maken het verschil. Die van ons vertalen zich direct in waarde voor u.',
      'why-c1-title':     'Internationaal Bereik',
      'why-c1-body':      'Export naar projecten door heel Europa en daarbuiten \u2014 van Rotterdam tot Londen.',
      'why-c2-title':     'Concurrerende Prijzen',
      'why-c2-body':      'Directe fabrieksaccess elimineert de tussenhandelsmarge \u2014 rechtstreeks voor u.',
      'why-c3-title':     'Technische Expertise',
      'why-c3-body':      'Diepgaande kennis van EN-normen, tussenlaag technologie\xebn en constructieve beglazing.',
      'why-c4-title':     'Gecertificeerde Kwaliteit',
      'why-c4-body':      'CE-gecertificeerde producten conform EN\u202F12150, EN\u202F14449, EN\u202F1634 en meer.',
      'why-c5-title':     'Maatwerkformaten',
      'why-c5-body':      'Oversized, gebogen, bedrukt of brandwerend \u2014 wij matchen uw exacte specificatie.',
      'why-c6-title':     'Persoonlijke Service',
      'why-c6-body':      'E\xe9n aanspreekpunt van specificatie tot levering. Reactie binnen \xe9\xe9n werkdag.',
      'contact-eyebrow':  'Neem contact op',
      'contact-title':    'Vraag een<br />offerte aan.',
      'contact-body':     'Geef ons uw specificatie, hoeveelheden en leveringsbestemming. Ons team geeft binnen \xe9\xe9n werkdag een reactie met prijzen en levertijden.',
      'form-name-label':  'Volledige naam *',
      'form-name-ph':     'Jan Peeters',
      'form-company-label':'Bedrijf',
      'form-company-ph':  'Uw bedrijf',
      'form-email-label': 'E-mailadres *',
      'form-phone-label': 'Telefoonnummer',
      'form-product-label':'Productinteresse',
      'form-select-default':'— Selecteer een productcategorie —',
      'form-select-other': 'Meerdere / overige',
      'form-msg-label':   'Uw specificatie / bericht *',
      'form-msg-ph':      'Afmetingen, hoeveelheden, tussenlaagtype, leveringsland\u2026',
      'form-submit':      'Verstuur aanvraag',
      'form-note':        '* Verplichte velden. Wij reageren binnen 1 werkdag.',
      'footer-tagline':   'Internationale veiligheidsglasgroothandel.<br />Concurrerende prijzen. Gecertificeerde kwaliteit.',
      'footer-cta':       'Offerte aanvragen',
      'footer-col-products':'Producten',
      'footer-col-company':'Bedrijf',
      'footer-col-contact':'Neem contact op',
      'footer-about-link':'Over GIGAglas',
      'footer-contact-link':'Contact',
      'footer-rights':    'Alle rechten voorbehouden.',
    },
    en: {
      'nav-about':        'About',
      'nav-references':   'References',
      'nav-products':     'Products',
      'nav-why':          'Why GIGAglas',
      'nav-cta':          'Get a Quote',
      'hero-eyebrow':     'International Safety Glass Wholesale',
      'hero-headline':    'Glass that<br /><span class="text-accent">performs</span><br />at every scale.',
      'hero-sub':         'From oversized tempered panels up to 18\u202Fm, curved glazing, fire-rated barriers to precision laminated and screen-printed glass \u2014 GIGAglas delivers the full spectrum of safety glazing at wholesale prices across Europe.',
      'hero-btn-explore': 'Explore Products',
      'hero-btn-quote':   'Request a Quote',
      'hero-caption':     'CS Arnhem \u2014 curved glass roof structure',
      'scroll-label':     'Scroll',
      'about-eyebrow':    'Who we are',
      'about-title':      'Your strategic<br />partner in<br />safety glazing.',
      'about-body1':      'GIGAglas is an international glass wholesaler with deep expertise in certified safety glass. By cultivating the right manufacturing partnerships across Europe and beyond, we unlock production capacities and price points that simply aren\u2019t available through conventional channels.',
      'about-body2':      'Whether you\u2019re glazing a single high-spec fa\xe7ade or fulfilling a large-scale construction programme, we match your exact specification \u2014 technical, logistical, and commercial.',
      'about-check1':     'CE-certified products to EN standards',
      'about-check2':     'Direct factory access \u2014 no middleman margin',
      'about-check3':     'Tailored logistics for oversized and fragile freight',
      'about-check4':     'Technical support from specification to delivery',
      'stat1':            'Max tempered panel length',
      'stat2':            'Certified',
      'stat3':            'Max fire-resistance rating',
      'stat4':            'Wholesale distribution',
      'ref-eyebrow':      'Our work',
      'ref-title':        'Projects<br />across Europe.',
      'ref-sub':          'Landmark glazing delivered<br />at every scale.',
      'ref-type1':        'Laminated fa\xe7ade glazing',
      'ref-type2':        'Structural tempered glazing',
      'ref-type3':        'Screen-printed glass',
      'ref-type4':        'Curtain wall glazing',
      'ref-type5':        'Fire-resistant glazing',
      'ref-type6':        'Laminated glazing',
      'ref-type7':        'Curved glazing',
      'ref-type8':        'Tempered glazing',
      'prod-eyebrow':     'What we offer',
      'prod-title':       'Our product<br />range',
      'prod-sub':         'Specialised in certified safety glazing for large-scale architectural and construction projects. From oversized tempered panels to fire-resistant systems \u2014 always made to specification, CE-certified and delivered direct from the factory.',
      'prod-tempered':    'Tempered Glazing',
      'prod-laminated':   'Laminated Glazing',
      'prod-fire':        'Fire-Resistant Glazing',
      'prod-screen':      'Screen-Printed Glass',
      'prod-enquire':     'Enquire \u2192',
      'why-eyebrow':      'Our advantage',
      'why-title':        'Why<br />GIGAglas?',
      'why-sub':          'The right partnerships make all the difference. Ours translate directly into value for you.',
      'why-c1-title':     'International Reach',
      'why-c1-body':      'Export to projects across Europe and beyond \u2014 from Rotterdam to London.',
      'why-c2-title':     'Competitive Pricing',
      'why-c2-body':      'Direct factory access eliminates the middleman margin \u2014 passed straight to you.',
      'why-c3-title':     'Technical Expertise',
      'why-c3-body':      'Deep knowledge of EN standards, interlayer technologies, and structural glazing systems.',
      'why-c4-title':     'Certified Quality',
      'why-c4-body':      'CE-certified products conforming to EN\u202F12150, EN\u202F14449, EN\u202F1634 and more.',
      'why-c5-title':     'Custom Formats',
      'why-c5-body':      'Oversized, curved, printed, or fire-rated \u2014 we match your exact specification.',
      'why-c6-title':     'Dedicated Service',
      'why-c6-body':      'One point of contact from specification through delivery. Response within one business day.',
      'contact-eyebrow':  'Let\u2019s talk',
      'contact-title':    'Request a quote<br />or ask a question.',
      'contact-body':     'Tell us your specification, quantities, and delivery destination. Our team will come back with pricing and lead times within one business day.',
      'form-name-label':  'Full name *',
      'form-name-ph':     'Jan Peeters',
      'form-company-label':'Company',
      'form-company-ph':  'Your company',
      'form-email-label': 'Email address *',
      'form-phone-label': 'Phone',
      'form-product-label':'Product interest',
      'form-select-default':'— Select a product category —',
      'form-select-other': 'Multiple / other',
      'form-msg-label':   'Your specification / message *',
      'form-msg-ph':      'Dimensions, quantities, interlayer type, delivery country\u2026',
      'form-submit':      'Send Enquiry',
      'form-note':        '* Required fields. We respond within 1 business day.',
      'footer-tagline':   'International safety glass wholesale.<br />Competitive prices. Certified quality.',
      'footer-cta':       'Get a Quote',
      'footer-col-products':'Products',
      'footer-col-company':'Company',
      'footer-col-contact':'Get in touch',
      'footer-about-link':'About GIGAglas',
      'footer-contact-link':'Contact',
      'footer-rights':    'All rights reserved.',
    }
  };

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (T[lang][key] !== undefined) el.innerHTML = T[lang][key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (T[lang][key] !== undefined) el.innerHTML = T[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (T[lang][key] !== undefined) el.placeholder = T[lang][key];
    });

    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = lang === 'nl' ? 'EN' : 'NL';

    // Re-render product cards in new language
    var container = document.getElementById('productCards');
    if (container) { container.innerHTML = ''; initProductCards(); }

    // Restart hero word cycle in new language
    if (_restartWordCycle) _restartWordCycle(lang);
  }

  // Language toggle button
  var langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      applyLang(currentLang === 'nl' ? 'en' : 'nl');
    });
  }

  // ══════════════════════════════════════════════════════
  //  PANEL NAVIGATION
  // ══════════════════════════════════════════════════════
  const track = document.getElementById('scrollTrack');

  function isDesktop() { return window.innerWidth >= 1024; }

  function scrollToPanel(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    if (isDesktop() && track) {
      track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    } else {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 68;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
    }
  }

  function registerPanelLinks(root) {
    (root || document).querySelectorAll('[data-panel-link]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          scrollToPanel(href);
          closeMobileMenu();
        }
      });
    });
  }

  registerPanelLinks();

  // ── Mousewheel → horizontal scroll (desktop) ──────────
  if (track) {
    track.addEventListener('wheel', function (e) {
      if (!isDesktop()) return;
      e.preventDefault();
      track.scrollBy({ left: e.deltaY + e.deltaX, behavior: 'auto' });
    }, { passive: false });
  }

  // ── Arrow key navigation (desktop) ────────────────────
  document.addEventListener('keydown', function (e) {
    if (!isDesktop() || !track) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      track.scrollBy({ left: window.innerWidth * 0.85, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      track.scrollBy({ left: -window.innerWidth * 0.85, behavior: 'smooth' });
    }
  });

  // ── Mobile burger ──────────────────────────────────────
  const burger   = document.querySelector('.nav__burger');
  const navLinks = document.querySelector('.nav__links');

  function closeMobileMenu() {
    if (!navLinks || !burger) return;
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // ══════════════════════════════════════════════════════
  //  INTERACTIVE GLOBE  (cobe — vanilla JS)
  //  Markers: England · Netherlands · Belgium · France · Germany
  // ══════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════
  //  REFERENCE PHOTOS ARROW NAV
  // ══════════════════════════════════════════════════════
  // ── Reference photos arrow nav ─────────────────────────
  (function () {
    var strip = document.getElementById('refPhotos');
    var prev  = document.getElementById('refPrev');
    var next  = document.getElementById('refNext');
    if (!strip || !prev || !next) return;

    function stepWidth() {
      var photo = strip.querySelector('.ref__photo');
      return photo ? photo.offsetWidth : strip.offsetWidth * 0.22;
    }

    prev.addEventListener('click', function () {
      strip.scrollBy({ left: -stepWidth(), behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      strip.scrollBy({ left: stepWidth(), behavior: 'smooth' });
    });
  })();

  function initProductCards() {
    var container = document.getElementById('productCards');
    if (!container) return;

    var productData = {
      nl: [
        { num: '01', title: 'Gehard Glas',        image: 'Brand_assets/References/GIGAglas-cooltoren-rotterdam.jpg',                                                         specs: ['Oversized tot 18\u202Fm lengte', 'Gebogen / gevormd gehard', 'Constructieve gevel & balustrade', 'EN\u202F12150 gecertificeerd'] },
        { num: '02', title: 'Gelaagd Glas',        image: 'Brand_assets/References/GIGAglas-gehardglas-gelamineerdglas-gebogenglas-zeefdrukglas-pontsteiger-amsterdam.jpg',    specs: ['PVB \u2014 standaard & akoestisch', 'EVA \u2014 vochtbestendig', 'SentryGlas\xae (SGP)', 'DG41 \u2014 superieure helderheid'] },
        { num: '03', title: 'Brandwerend Glas',    image: 'Brand_assets/References/GIGAglas-gehardglas-gelamineerdglas-gebogenglas-zeefdrukglas-cs-arnhem.jpg',              specs: ['EW / EI integriteitsklassen', '30 \u2013 120 minuten klassen', 'Brandwerende omlijsting', 'EN\u202F1634 getest'] },
        { num: '04', title: 'Zeefdruk glas',       image: 'Brand_assets/References/GIGAglas-gehardglas-gelamineerdglas-gebogenglas-zeefdrukglas-stadionkwartier-eindhoven.jpg', specs: ['Volledige bedrukkingsdekking', 'RAL / maatwerkkleur', 'Gecombineerd met harden', 'Buiten- & binnentoepassing'] },
        { num: '05', title: 'Gebogen Glas',         image: 'Brand_assets/References/GIGAglas-gehardglas-gelamineerdglas-gebogenglas-zeefdrukglas (11).jpg',                       specs: ['Enkelvoudig & dubbel gebogen', 'Gebogen & gelaagd gecombineerd', 'Radius op maat', 'Gevel, dak & interieur'] },
      ],
      en: [
        { num: '01', title: 'Tempered Glazing',       image: 'Brand_assets/References/GIGAglas-cooltoren-rotterdam.jpg',                                                        specs: ['Oversized up to 18\u202Fm length', 'Curved / bent tempered', 'Structural fa\xe7ade & balustrade', 'EN\u202F12150 certified'] },
        { num: '02', title: 'Laminated Glazing',       image: 'Brand_assets/References/GIGAglas-gehardglas-gelamineerdglas-gebogenglas-zeefdrukglas-pontsteiger-amsterdam.jpg',   specs: ['PVB \u2014 standard & acoustic', 'EVA \u2014 moisture-resistant', 'SentryGlas\xae (SGP)', 'DG41 \u2014 advanced clarity'] },
        { num: '03', title: 'Fire-Resistant Glazing',  image: 'Brand_assets/References/GIGAglas-gehardglas-gelamineerdglas-gebogenglas-zeefdrukglas-cs-arnhem.jpg',              specs: ['EW / EI integrity ratings', '30 \u2013 120 minute ratings', 'Fire-rated framing', 'EN\u202F1634 tested'] },
        { num: '04', title: 'Screen-Printed Glass',    image: 'Brand_assets/References/GIGAglas-gehardglas-gelamineerdglas-gebogenglas-zeefdrukglas-stadionkwartier-eindhoven.jpg', specs: ['Full-coverage printing', 'RAL / custom colour', 'Combined with tempering', 'Exterior & interior'] },
        { num: '05', title: 'Curved Glazing',           image: 'Brand_assets/References/GIGAglas-gehardglas-gelamineerdglas-gebogenglas-zeefdrukglas (11).jpg',                       specs: ['Single & double curved', 'Curved & laminated combined', 'Custom radius', 'Façade, roof & interior'] },
      ]
    };

    var products = productData[currentLang];
    var enquireLabel = T[currentLang]['prod-enquire'];

    // Build flat cards
    products.forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML =
        '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy" />' +
        '<div class="product-card__body">' +
          '<span class="product-card__num">' + p.num + '</span>' +
          '<h3 class="product-card__title">' + p.title + '</h3>' +
          '<ul class="product-card__specs">' +
            p.specs.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
          '</ul>' +
          '<a href="#contact" class="product-card__link" data-panel-link>' + enquireLabel + '</a>' +
        '</div>';
      container.appendChild(card);
    });

    registerPanelLinks(container);

    // Prev / Next scroll
    var prevBtn = document.getElementById('galleryPrev');
    var nextBtn = document.getElementById('galleryNext');

    function cardWidth() {
      var c = container.querySelector('.product-card');
      return c ? c.offsetWidth + 20 : 280; // card width + gap
    }

    if (prevBtn) prevBtn.addEventListener('click', function () {
      container.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
    });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      container.scrollBy({ left: cardWidth(), behavior: 'smooth' });
    });
  }

  // ══════════════════════════════════════════════════════
  //  CONTACT FORM
  // ══════════════════════════════════════════════════════
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn      = form.querySelector('button[type="submit"]');
      var required = form.querySelectorAll('[required]');
      var valid    = true;

      required.forEach(function (field) {
        if (!field.value.trim()) { field.classList.add('error'); valid = false; }
        else                     { field.classList.remove('error'); }
      });

      if (!valid) return;

      var origText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = '✓ Enquiry Sent!';
        btn.style.background   = 'var(--teal)';
        btn.style.borderColor  = 'var(--teal)';
        form.reset();
        setTimeout(function () {
          btn.textContent      = origText;
          btn.disabled         = false;
          btn.style.background = '';
          btn.style.borderColor= '';
        }, 4000);
      }, 1200);
    });

    form.querySelectorAll('[required]').forEach(function (f) {
      f.addEventListener('input', function () { this.classList.remove('error'); });
    });
  }

  // ══════════════════════════════════════════════════════
  //  STAT COUNTER ANIMATION
  // ══════════════════════════════════════════════════════
  function animateStatCounters() {
    document.querySelectorAll('.stat__num[data-count]').forEach(function (el) {
      var target   = parseInt(el.getAttribute('data-count'), 10);
      var prefix   = el.getAttribute('data-prefix') || '';
      var suffix   = el.getAttribute('data-suffix') || '';
      var start    = null;
      var DURATION = 1400;

      function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

      function tick(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / DURATION, 1);
        el.textContent = prefix + Math.round(easeOut(progress) * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  // ══════════════════════════════════════════════════════
  //  ENTRANCE ANIMATIONS
  // ══════════════════════════════════════════════════════
  // Apply data-delay values as CSS transition-delays
  document.querySelectorAll('.anim[data-delay]').forEach(function(el) {
    el.style.transitionDelay = el.getAttribute('data-delay') + 'ms';
  });

  // IntersectionObserver: add panel--visible when panel enters view
  if ('IntersectionObserver' in window) {
    var panelObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('panel--visible');
          if (entry.target.id === 'about') animateStatCounters();
        }
      });
    }, { threshold: 0.25 });

    document.querySelectorAll('.panel').forEach(function(p) {
      panelObserver.observe(p);
    });
  } else {
    // Fallback: show everything immediately
    document.querySelectorAll('.panel').forEach(function(p) {
      p.classList.add('panel--visible');
    });
  }

  // ══════════════════════════════════════════════════════
  //  HERO WORD CYCLE
  // ══════════════════════════════════════════════════════
  (function () {
    var wordSets = {
      nl: ['Zeefdruk glas', 'Gebogen glas', 'Gelaagd glas', 'Gehard glas', 'Brandwerend glas'],
      en: ['Screen-printed glazing', 'Curved glazing', 'Laminated glazing', 'Tempered glazing', 'Fire-resistant glazing']
    };
    var afterText = {
      nl: '<br />dat presteert<br />op elke schaal.',
      en: '<br />that performs<br />at every scale.'
    };

    var cycleEl = document.getElementById('wordCycle');
    var afterEl = document.getElementById('heroCycleAfter');
    if (!cycleEl || !afterEl) return;

    var timer        = null;
    var idx          = 0;
    var activeWords  = wordSets[currentLang];
    var INTERVAL     = 2000;  // ms between words
    var EXIT_MS      = 310;   // must exceed wcOut animation duration

    function showWord(word, animate) {
      cycleEl.classList.remove('wc-exit', 'wc-enter');
      // Force reflow so removing + re-adding the class restarts the animation
      void cycleEl.offsetWidth;
      cycleEl.innerHTML = word;
      if (animate) cycleEl.classList.add('wc-enter');
    }

    function step() {
      cycleEl.classList.remove('wc-enter');
      void cycleEl.offsetWidth;
      cycleEl.classList.add('wc-exit');

      setTimeout(function () {
        idx = (idx + 1) % activeWords.length;
        showWord(activeWords[idx], true);
      }, EXIT_MS);
    }

    function start(lang) {
      if (timer) clearInterval(timer);
      activeWords       = wordSets[lang];
      afterEl.innerHTML = afterText[lang];
      idx               = 0;
      showWord(activeWords[0], true);
      timer = setInterval(step, INTERVAL);
    }

    // Kick off immediately
    start(currentLang);

    // Expose so applyLang() can restart with new language
    _restartWordCycle = start;
  })();

  // ══════════════════════════════════════════════════════
  //  INIT
  // ══════════════════════════════════════════════════════
  initProductCards();

})();
