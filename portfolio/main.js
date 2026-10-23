// Interrupteur de langue FR / EN et visionneuse d'images
(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('lang-toggle');

  var titles = {
    fr: 'Gauthier Humeau · Ingénieur systèmes',
    en: 'Gauthier Humeau · Systems engineer'
  };
  var cvFiles = {
    fr: 'cv/CV_Gauthier_Humeau_FR.pdf',
    en: 'cv/CV_Gauthier_Humeau_EN.pdf'
  };

  function apply(lang) {
    root.lang = lang;
    document.title = titles[lang];
    toggle.setAttribute('aria-checked', lang === 'en' ? 'true' : 'false');
    document.querySelectorAll('[data-cv]').forEach(function (a) { a.href = cvFiles[lang]; });
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  apply(root.lang === 'en' ? 'en' : 'fr');

  toggle.addEventListener('click', function () {
    apply(root.lang === 'en' ? 'fr' : 'en');
  });

  // Visionneuse
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.zoom').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      boxImg.src = btn.getAttribute('data-full');
      boxImg.alt = img ? img.alt : '';
      if (typeof box.showModal === 'function') box.showModal();
      else window.open(btn.getAttribute('data-full'), '_blank');
    });
  });
  // Clic en dehors de l'image : fermer
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
})();
