// تفاعلات الواجهة الرئيسية فقط — دون أي منطق تعليمي أو بيانات.
(function () {
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'فتح القائمة');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.hidden === false;
      if (isOpen) {
        closeMenu();
      } else {
        mobileMenu.hidden = false;
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'إغلاق القائمة');
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ظل خفيف للرأس عند التمرير (تأثير بصري فقط)
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // تمييز الرابط النشط حسب القسم الظاهر
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = ['home', 'curriculum', 'dictionary', 'quizzes', 'about']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length && links.length) {
    var map = {};
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && href.charAt(0) === '#') map[href.slice(1)] = a;
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { obs.observe(s); });
  }

  // سنة الحقوق
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
