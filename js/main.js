// Hack the Heights 2026 — placeholder site interactions

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initActiveNavLink();
  initCountdown();
  initScheduleTabs();
  initFaqAccordion();
  initFaqFilter();
});

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const toggle = document.getElementById('navbarToggle');
  const links = document.getElementById('navbarLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Highlight active nav link on scroll ---------- */
function initActiveNavLink() {
  const sections = ['about', 'tracks', 'schedule', 'faq', 'sponsors', 'apply']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const links = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Countdown timer ---------- */
function initCountdown() {
  // Placeholder target date — update once the real 2026 date is set.
  const targetDate = new Date('2026-10-24T09:00:00').getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  if (!daysEl) return;

  function pad(n) { return String(Math.max(n, 0)).padStart(2, '0'); }

  function tick() {
    const distance = targetDate - Date.now();
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------- Schedule day tabs ---------- */
function initScheduleTabs() {
  const tabs = document.querySelectorAll('#scheduleTabs .tab-btn');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const day = tab.dataset.day;
      document.querySelectorAll('.timeline').forEach((tl) => {
        tl.hidden = tl.id !== `timeline-${day}`;
      });
    });
  });
}

/* ---------- FAQ accordion ---------- */
function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    const toggle = item.querySelector('.faq-toggle');
    question.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      toggle.textContent = isOpen ? '−' : '+';
    });
  });
}

/* ---------- FAQ category filter ---------- */
function initFaqFilter() {
  const tabs = document.querySelectorAll('#faqTabs .tab-btn');
  const items = document.querySelectorAll('.faq-item');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.cat;
      items.forEach((item) => {
        item.style.display = cat === 'all' || item.dataset.cat === cat ? '' : 'none';
      });
    });
  });
}
