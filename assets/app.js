/* app.js — shared interactions across every page.
   Each page loads this via <script src="app.js" defer></script>.
   Page-specific behavior (canvas, modals, role rotation, DAG nav,
   project filters, etc.) stays in each page's own <script> block. */

(function applyTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
})();

(function wireThemeToggle() {
  const buttons = document.querySelectorAll("[data-set-theme]");
  if (!buttons.length) return;
  const current = document.documentElement.getAttribute("data-theme") || "light";
  buttons.forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.setTheme === current ? "true" : "false")
  );
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.setTheme;
      document.documentElement.setAttribute("data-theme", t);
      buttons.forEach((b) =>
        b.setAttribute("aria-pressed", b === btn ? "true" : "false")
      );
      localStorage.setItem("theme", t);
    });
  });
})();

(function customCursor() {
  const ring = document.querySelector(".cur-ring");
  const dot = document.querySelector(".cur-dot");
  if (!ring || !dot) return;

  let mx = innerWidth / 2,
    my = innerHeight / 2,
    rx = mx,
    ry = my;

  addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  (function tick() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  })();

  const targets =
    "a, button, .menu-item, .work-card, .book, .card, .photo, .dag-node, .pill, .cell, .profile-photo, .contact-icon, .lead-item";
  document.querySelectorAll(targets).forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("big"));
    el.addEventListener("mouseleave", () => ring.classList.remove("big"));
  });
})();

(function magneticHover() {
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
})();

(function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;
  const obs = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  reveals.forEach((r) => obs.observe(r));
})();
