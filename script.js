(function () {
    'use strict';

    // === LOADER ===
    window.addEventListener('load', function () {
        setTimeout(function () {
            var l = document.getElementById('loader');
            if (l) { l.classList.add('hidden'); setTimeout(function () { l.remove() }, 700) }
            document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el) });
        }, 600);
    });

    // === CUSTOM CURSOR ===
    var cur = document.getElementById('cursor');
    if (window.matchMedia('(pointer:fine)').matches && cur) {
        document.addEventListener('mousemove', function (e) {
            cur.style.left = e.clientX + 'px';
            cur.style.top = e.clientY + 'px';
        }, { passive: true });
        document.querySelectorAll('a,button,.service-card,.btn,.faq-q').forEach(function (el) {
            el.addEventListener('mouseenter', function () { cur.classList.add('hover') });
            el.addEventListener('mouseleave', function () { cur.classList.remove('hover') });
        });
    } else if (cur) { cur.style.display = 'none' }

    // === SCROLL REVEAL ===
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
        });
    }, { threshold: 0.12 });

    // === PARALLAX ===
    var heroBg = document.getElementById('heroBg');
    var pBgs = document.querySelectorAll('[data-parallax]');
    function onScroll() {
        var sy = window.scrollY;
        if (heroBg) heroBg.style.transform = 'translateY(' + sy * 0.4 + 'px)';
        pBgs.forEach(function (el) {
            var rate = parseFloat(el.dataset.parallax) || 0.2;
            var rect = el.closest('section').getBoundingClientRect();
            el.style.transform = 'translateY(' + rect.top * rate + 'px)';
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // === MOBILE MENU ===
    var toggle = document.getElementById('menuToggle');
    var navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        toggle.addEventListener('click', function () {
            var open = navLinks.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open);
            toggle.textContent = open ? '✕' : '☰';
            document.body.style.overflow = open ? 'hidden' : '';
        });
        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                navLinks.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.textContent = '☰';
                document.body.style.overflow = '';
            });
        });
    }

    // === FAQ ACCORDION ===
    document.querySelectorAll('.faq-q').forEach(function (q) {
        function toggleFaq() {
            var item = q.closest('.faq-item');
            var isOpen = item.classList.toggle('open');
            q.setAttribute('aria-expanded', isOpen);
        }
        q.addEventListener('click', toggleFaq);
        q.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq() } });
    });

    // === CONTACT FORM ===
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = form.querySelector('#name').value.trim();
            var phone = form.querySelector('#phone').value.trim();
            var service = form.querySelector('#service').value;
            var msg = form.querySelector('#message').value.trim();
            if (!name || !phone) { alert('Please fill in your name and phone number.'); return; }
            var waMsg = encodeURIComponent('Hi GR7! I\'m ' + name + ' (' + phone + '). Service: ' + (service || 'General Enquiry') + '. ' + (msg || ''));
            window.open('https://wa.me/917358182759?text=' + waMsg, '_blank', 'noopener,noreferrer');
        });
    }

    // === ACTIVE NAV HIGHLIGHT ===
    var sections = document.querySelectorAll('section[id]');
    var navAs = document.querySelectorAll('.nav-links a[href^="#"]');
    var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                navAs.forEach(function (a) {
                    a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--yellow)' : '';
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(function (s) { io2.observe(s) });

})();
