(function ($) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const backToTop = document.querySelector(".back-to-top");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 240);
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      if (window.arcadeLenis) {
        window.arcadeLenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  if (window.Lenis && !reduced) {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    window.arcadeLenis = lenis;
    lenis.on("scroll", function () {
      onScroll();
      if (window.ScrollTrigger) ScrollTrigger.update();
    });
    if (window.gsap) {
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }
  } else {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  onScroll();

  const toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      const open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".nav-drawer a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const cursor = document.querySelector(".cursor");
  if (cursor && window.matchMedia("(pointer:fine)").matches && !reduced) {
    cursor.style.display = "block";
    window.addEventListener("pointermove", function (e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("data-lenis-prevent", "");
    document.body.style.overflow = "hidden";
    if (window.arcadeLenis) window.arcadeLenis.stop();
    const focusable = modal.querySelector("input, select, textarea");
    if (focusable) focusable.focus();
  }

  function closeModal(modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (window.arcadeLenis) window.arcadeLenis.start();
  }

  window.arcadeOpenModal = openModal;

  document.addEventListener("click", function (e) {
    const opener = e.target.closest("[data-modal]");
    if (opener) {
      e.preventDefault();
      const id = opener.getAttribute("data-modal");
      const preset = opener.getAttribute("data-preset");
      openModal(id);
      if (preset) {
        const select = document.querySelector("#" + id + " [data-preset-target]");
        if (select) select.value = preset;
      }
      return;
    }
    if (e.target.closest("[data-close]")) {
      const modal = e.target.closest(".modal");
      if (modal) closeModal(modal);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.is-open").forEach(closeModal);
    }
  });

  $("img[data-src]").each(function () {
    this.src = this.getAttribute("data-src");
  });
})(jQuery);
