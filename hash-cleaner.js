(function() {
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return;
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (window.location.hash) {
    var id = window.location.hash.slice(1);
    if (document.getElementById(id)) {
      setTimeout(function() {
        scrollToId(id);
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }, 300);
    }
  }

  document.addEventListener('click', function(e) {
    var a = e.target.closest('a[href^="#"]');
    if (a && a.getAttribute('href') !== '#') {
      var id = a.getAttribute('href').slice(1);
      if (document.getElementById(id)) {
        e.preventDefault();
        scrollToId(id);
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  });
})();
