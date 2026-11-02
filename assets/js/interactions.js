(function ($) {
  function validateForm(form) {
    let ok = true;
    form.querySelectorAll("[required]").forEach(function (field) {
      const error = field.parentElement.querySelector(".field-error");
      let message = "";
      if (!field.value.trim()) message = "This field is required.";
      else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) message = "Enter a valid email address.";
      else if (field.type === "tel" && field.value.replace(/\D/g, "").length < 7) message = "Enter a valid phone number.";
      if (error) error.textContent = message;
      if (message) ok = false;
    });
    return ok;
  }

  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.setAttribute("novalidate", "novalidate");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const success = form.querySelector(".form-success");
      if (!validateForm(form)) {
        if (success) success.style.display = "none";
        return;
      }
      if (success) {
        success.style.display = "block";
        success.focus();
      }
      form.reset();
    });
  });

  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      const group = chip.parentElement;
      group.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-on"); });
      chip.classList.add("is-on");
      const summary = document.querySelector("[data-summary]");
      if (!summary) return;
      const picks = {};
      document.querySelectorAll(".chooser").forEach(function (chooser) {
        const on = chooser.querySelector(".chip.is-on");
        if (on) picks[chooser.getAttribute("data-key")] = on.textContent.trim();
      });
      const valNodes = summary.querySelectorAll("[data-summary-val]");
      if (valNodes.length) {
        valNodes.forEach(function (node) {
          const key = node.getAttribute("data-summary-val");
          node.textContent = picks[key] || "—";
        });
      } else {
        summary.innerHTML = "<h3>Your selection</h3><p>Zone: " + (picks.zone || "—") + "</p><p>Duration: " + (picks.duration || "—") + "</p><p>Players: " + (picks.players || "—") + "</p><p>Refreshments: " + (picks.food || "—") + "</p><p>Decor: " + (picks.decor || "—") + "</p><p>Extra activity: " + (picks.extra || "—") + "</p><p class='demo-note'>This summary is a visual planner. It is not a confirmed booking.</p>";
      }
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = btn.getAttribute("data-lightbox");
      lightboxImg.alt = btn.getAttribute("data-alt") || "Gallery preview";
      window.arcadeOpenModal("lightbox");
    });
  });

  document.querySelectorAll("[data-tilt]").forEach(function (card) {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    card.addEventListener("pointermove", function (e) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = "perspective(900px) rotateY(" + (x * 8) + "deg) rotateX(" + (-y * 8) + "deg)";
    });
    card.addEventListener("pointerleave", function () { card.style.transform = ""; });
  });

  document.querySelectorAll(".hotspot").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".hotspot").forEach(function (h) { h.classList.remove("is-on"); });
      btn.classList.add("is-on");
      const imgUrl = btn.getAttribute("data-img");
      const title = btn.getAttribute("data-title");
      const tag = btn.getAttribute("data-tag");
      const mainImg = document.getElementById("arena-main-img");
      if (mainImg && imgUrl) {
        mainImg.style.opacity = "0.25";
        mainImg.style.transform = "scale(0.98)";
        setTimeout(function () {
          mainImg.src = imgUrl;
          if (title) mainImg.alt = title;
          mainImg.style.opacity = "1";
          mainImg.style.transform = "scale(1)";
        }, 120);
      }
      const captionTitle = document.getElementById("arena-caption-title");
      if (captionTitle && title) captionTitle.textContent = title;
      const captionTag = document.getElementById("arena-caption-tag");
      if (captionTag && tag) captionTag.textContent = tag;
    });
  });

  $(".accordion details").on("toggle", function () {
    if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = this.querySelector("p");
    if (this.open && panel) gsap.fromTo(panel, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.3 });
  });

  if (window.Swiper && document.querySelector(".testimonial-swiper")) {
    new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? false : { delay: 5200 },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: { 768: { slidesPerView: 2, spaceBetween: 24 }, 1100: { slidesPerView: 2, spaceBetween: 28 } }
    });
  }
})(jQuery);
