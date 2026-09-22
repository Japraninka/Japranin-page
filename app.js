
(function () {
  "use strict";
 
  /* Mobile menu */
 
  var toggle = document.getElementById("mobile-menu");
  var menu = document.querySelector(".navbar__menu");
 
  if (toggle && menu) {
    var setMenu = function (open) {
      toggle.classList.toggle("is-active", open);
      menu.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      document.body.classList.toggle("nav-open", open);
    };
 
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("active"));
    });
 
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenu(false);
      }
    });
 
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("active")) {
        setMenu(false);
        toggle.focus();
      }
    });
 
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && menu.classList.contains("active")) {
        setMenu(false);
      }
    });
  }
 
  /* Footer year */
 
  var yearFields = document.querySelectorAll("[data-year]");
  var currentYear = String(new Date().getFullYear());
  for (var i = 0; i < yearFields.length; i++) {
    yearFields[i].textContent = currentYear;
  }
 
  /* Gallery lightbox */
 
  var gallery = document.getElementById("gallery");
  if (!gallery) {
    return;
  }
 
  var items = Array.prototype.slice.call(
    gallery.querySelectorAll(".gallery__item img")
  );
  if (items.length === 0) {
    return;
  }
 
  var index = 0;
  var lastFocused = null;
 
  var lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Bildansicht");
  lightbox.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Schließen">&times;</button>' +
    '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Vorheriges Bild">&#8249;</button>' +
    '<img alt="" />' +
    '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Nächstes Bild">&#8250;</button>';
  document.body.appendChild(lightbox);
 
  var view = lightbox.querySelector("img");
  var closeBtn = lightbox.querySelector(".lightbox__close");
  var prevBtn = lightbox.querySelector(".lightbox__nav--prev");
  var nextBtn = lightbox.querySelector(".lightbox__nav--next");
 
  var show = function (next) {
    index = (next + items.length) % items.length;
    view.src = items[index].src;
    view.alt = items[index].alt || "";
  };
 
  var open = function (next) {
    lastFocused = document.activeElement;
    show(next);
    lightbox.classList.add("is-open");
    document.body.classList.add("nav-open");
    closeBtn.focus();
  };
 
  var close = function () {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    view.removeAttribute("src");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  };
 
  gallery.addEventListener("click", function (event) {
    var button = event.target.closest(".gallery__item");
    if (!button) {
      return;
    }
    var image = button.querySelector("img");
    var position = items.indexOf(image);
    if (position > -1) {
      open(position);
    }
  });
 
  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () {
    show(index - 1);
  });
  nextBtn.addEventListener("click", function () {
    show(index + 1);
  });
 
  // Close on backdrop click only, not on the image itself.
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      close();
    }
  });
 
  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("is-open")) {
      return;
    }
    if (event.key === "Escape") {
      close();
    } else if (event.key === "ArrowLeft") {
      show(index - 1);
    } else if (event.key === "ArrowRight") {
      show(index + 1);
    }
  });
})();
 
