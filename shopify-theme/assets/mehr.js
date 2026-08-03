/* ===========================================================
   MEHR — theme behaviour. Vanilla JS, no dependencies.
   =========================================================== */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const money = (cents) =>
    (window.Shopify && window.Shopify.currency ? '' : '') +
    new Intl.NumberFormat(document.documentElement.lang || 'en', {
      style: 'currency',
      currency: (window.mehrCurrency || 'PKR'),
      maximumFractionDigits: 0,
    }).format(cents / 100);

  /* ---------- Sticky header state ---------- */
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = (Math.min(i, 6) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Mobile nav ---------- */
  const mnav = $('[data-mobile-nav]');
  $$('[data-mobile-nav-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const open = mnav.classList.toggle('is-open');
      document.body.style.overflow = open ? 'hidden' : '';
    })
  );

  /* ---------- Search overlay ---------- */
  const search = $('[data-search-overlay]');
  const openSearch = () => {
    if (!search) return;
    search.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const input = $('input[name="q"]', search);
    if (input) setTimeout(() => input.focus(), 60);
  };
  const closeSearch = () => {
    if (!search) return;
    search.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  $$('[data-search-open]').forEach((b) => b.addEventListener('click', openSearch));
  $$('[data-search-close]').forEach((b) => b.addEventListener('click', closeSearch));
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
      closeCart();
      $$('.modal.is-open').forEach((m) => m.classList.remove('is-open'));
    }
  });

  /* live predictive search */
  const searchInput = search && $('input[name="q"]', search);
  const searchResults = search && $('[data-search-results]');
  let searchTimer;
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      const q = searchInput.value.trim();
      if (q.length < 2) {
        searchResults.innerHTML = '';
        return;
      }
      searchTimer = setTimeout(() => {
        fetch(
          '/search/suggest?q=' +
            encodeURIComponent(q) +
            '&resources[type]=product&resources[limit]=6&section_id=predictive-search'
        )
          .then((r) => r.text())
          .then((html) => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const inner = doc.querySelector('[data-predictive-inner]');
            searchResults.innerHTML = inner ? inner.innerHTML : '';
          })
          .catch(() => {});
      }, 220);
    });
  }

  /* ---------- Cart drawer ---------- */
  const drawer = $('[data-cart-drawer]');
  const backdrop = $('[data-cart-backdrop]');
  function openCart() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    backdrop && backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    backdrop && backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  $$('[data-cart-open]').forEach((b) =>
    b.addEventListener('click', (e) => {
      if (!drawer) return;
      e.preventDefault();
      refreshCart().then(openCart);
    })
  );
  $$('[data-cart-close]').forEach((b) => b.addEventListener('click', closeCart));
  backdrop && backdrop.addEventListener('click', closeCart);

  function refreshCart() {
    return fetch('/?section_id=cart-drawer')
      .then((r) => r.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const fresh = doc.querySelector('[data-cart-inner]');
        const current = $('[data-cart-inner]');
        if (fresh && current) current.innerHTML = fresh.innerHTML;
        return fetch('/cart.js').then((r) => r.json());
      })
      .then((cart) => {
        $$('[data-cart-count]').forEach((el) => {
          el.textContent = cart.item_count;
          el.hidden = cart.item_count === 0;
        });
        return cart;
      })
      .catch(() => {});
  }

  /* add to cart (product forms + quick add) */
  document.addEventListener('submit', function (e) {
    const form = e.target.closest('form[action*="/cart/add"]');
    if (!form || !drawer) return;
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const label = btn ? btn.textContent : '';
    if (btn) {
      btn.classList.add('is-disabled');
      btn.textContent = 'Adding…';
    }
    fetch('/cart/add.js', { method: 'POST', body: new FormData(form) })
      .then((r) => r.json())
      .then(() => refreshCart())
      .then(() => {
        openCart();
      })
      .finally(() => {
        if (btn) {
          btn.classList.remove('is-disabled');
          btn.textContent = label;
        }
      });
  });

  /* qty / remove inside drawer */
  document.addEventListener('click', function (e) {
    const change = e.target.closest('[data-line-change]');
    if (change) {
      e.preventDefault();
      const line = change.getAttribute('data-line');
      const qty = change.getAttribute('data-line-change');
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: Number(line), quantity: Number(qty) }),
      })
        .then(() => refreshCart())
        .catch(() => {});
    }
  });

  /* ---------- Quantity steppers ---------- */
  document.addEventListener('click', function (e) {
    const step = e.target.closest('[data-qty]');
    if (!step) return;
    const input = step.parentElement.querySelector('input');
    if (!input) return;
    const next = Math.max(1, (parseInt(input.value, 10) || 1) + parseInt(step.dataset.qty, 10));
    input.value = next;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ---------- Hero slideshow ---------- */
  $$('[data-slideshow]').forEach(function (root) {
    const slides = $$('[data-slide]', root);
    const dots = $$('[data-slide-dot]', root);
    if (slides.length < 2) return;
    let i = 0;
    let timer;
    const speed = parseInt(root.dataset.speed || '5500', 10);
    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle('is-active', idx === i));
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
      const counter = $('[data-slide-counter]', root);
      if (counter) counter.textContent = String(i + 1).padStart(2, '0');
    }
    function play() {
      clearInterval(timer);
      timer = setInterval(() => go(i + 1), speed);
    }
    dots.forEach((d, idx) =>
      d.addEventListener('click', () => {
        go(idx);
        play();
      })
    );
    go(0);
    play();
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', play);
  });

  /* ---------- Product page: variants ---------- */
  $$('[data-product-form]').forEach(function (root) {
    const dataEl = $('[data-variants]', root);
    if (!dataEl) return;
    const variants = JSON.parse(dataEl.textContent);
    const idInput = $('[data-variant-id]', root);
    const priceEl = $('[data-price]', root);
    const comparePriceEl = $('[data-compare-price]', root);
    const submit = $('[data-add-button]', root);

    function selectedOptions() {
      return $$('[data-option-index]', root)
        .map((group) => {
          const sel = $('.is-selected', group);
          return sel ? sel.dataset.value : null;
        })
        .filter((v) => v !== null);
    }

    function update() {
      const opts = selectedOptions();
      const variant = variants.find((v) => v.options.every((o, i) => o === opts[i]));
      if (!variant) return;
      if (idInput) idInput.value = variant.id;
      if (priceEl) priceEl.textContent = money(variant.price);
      if (comparePriceEl) {
        const show = variant.compare_at_price && variant.compare_at_price > variant.price;
        comparePriceEl.hidden = !show;
        if (show) comparePriceEl.textContent = money(variant.compare_at_price);
      }
      if (submit) {
        submit.disabled = !variant.available;
        submit.textContent = variant.available ? submit.dataset.labelAdd : submit.dataset.labelSoldOut;
      }
      const url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url);
    }

    $$('[data-option-index] .opt-pill', root).forEach((pill) =>
      pill.addEventListener('click', () => {
        if (pill.classList.contains('is-hard-disabled')) return;
        $$('.opt-pill', pill.parentElement).forEach((p) => p.classList.remove('is-selected'));
        pill.classList.add('is-selected');
        update();
      })
    );
    update();
  });

  /* ---------- PDP gallery (mobile dots + desktop thumbs) ---------- */
  $$('[data-gallery]').forEach(function (root) {
    const slider = $('[data-gallery-slider]', root);
    const dots = $$('[data-gallery-dot]', root);
    const thumbs = $$('[data-gallery-thumb]', root);
    if (!slider) return;
    slider.addEventListener(
      'scroll',
      () => {
        const idx = Math.round(slider.scrollLeft / slider.clientWidth);
        dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
      },
      { passive: true }
    );
    thumbs.forEach((t, i) =>
      t.addEventListener('click', () => {
        thumbs.forEach((x) => x.classList.remove('is-active'));
        t.classList.add('is-active');
        const target = $$('img', slider)[i];
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      })
    );
  });

  /* ---------- Sticky mobile buy bar ---------- */
  const stickyBar = $('[data-sticky-buy]');
  const buyAnchor = $('[data-buy-anchor]');
  if (stickyBar && buyAnchor && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => stickyBar.classList.toggle('is-visible', !entry.isIntersecting),
      { rootMargin: '-120px 0px 0px 0px' }
    ).observe(buyAnchor);
  }

  /* ---------- Modals ---------- */
  $$('[data-modal-open]').forEach((b) =>
    b.addEventListener('click', () => {
      const m = document.getElementById(b.dataset.modalOpen);
      if (m) m.classList.add('is-open');
    })
  );
  $$('[data-modal-close]').forEach((b) =>
    b.addEventListener('click', () => b.closest('.modal').classList.remove('is-open'))
  );

  /* ---------- Collection sort ---------- */
  const sortSelect = $('[data-sort]');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', sortSelect.value);
      url.searchParams.delete('page');
      window.location.href = url.toString();
    });
  }

  /* ---------- Facet auto submit ---------- */
  const facetForm = $('[data-facet-form]');
  if (facetForm) {
    facetForm.addEventListener('change', () => facetForm.submit());
  }
})();
