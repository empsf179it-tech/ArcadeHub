(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  if (reduced) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  gsap.utils.toArray(".hero h1, .hero .lead, .hero .btn-row, .page-hero h1, .page-hero .lead").forEach(function (el, i) {
    gsap.from(el, { y: 36, opacity: 0, duration: 0.9, delay: 0.12 * i, ease: "power3.out" });
  });

  gsap.utils.toArray(".reveal").forEach(function (el) {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 86%" }
    });
  });

  document.querySelectorAll("[data-count]").forEach(function (el) {
    const target = Number(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "+";
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: function () {
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.4,
          ease: "power1.out",
          onUpdate: function () { el.textContent = Math.round(obj.n) + suffix; }
        });
      }
    });
  });

  document.querySelectorAll("[data-hscroll]").forEach(function (section) {
    const track = section.querySelector(".hscroll-track");
    if (!track || window.innerWidth < 1024) {
      if (track) {
        section.style.overflowX = "auto";
      }
      return;
    }
    const tween = gsap.to(track, {
      x: function () { return -(track.scrollWidth - section.clientWidth); },
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: function () { return "+=" + Math.max(track.scrollWidth - section.clientWidth, 1); },
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
    window.addEventListener("resize", function () { tween.scrollTrigger && tween.scrollTrigger.refresh(); });
  });
})();
