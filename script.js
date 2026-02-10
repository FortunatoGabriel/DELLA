// =========================
// ===== JAVASCRIPT ========
// =========================

// ========================
// WhatsApp links (menu + CTAs + mini cards)
// ========================
(function setupWhatsappLinks(){
  const num = (window.WHATSAPP_NUMBER || "5500000000000").toString();
  const base = `https://wa.me/${num}`;

  const menu = document.getElementById("menuWhatsapp");
  const menuMobile = document.getElementById("menuWhatsappMobile");
  const hero = document.getElementById("ctaHero");
  const sobre = document.getElementById("ctaSobre");

  if (menu) menu.href = base;
  if (menuMobile) menuMobile.href = base;
  if (hero) hero.href = base;
  if (sobre) sobre.href = base;

  const footerW1 = document.getElementById("footerWhatsapp");
  const footerW2 = document.getElementById("footerWhatsapp2");
  if (footerW1) footerW1.href = base;
  if (footerW2) footerW2.href = base;

  // Mini Whats com mensagem por serviço
  document.querySelectorAll(".mini-whats").forEach(link => {
    const service = link.getAttribute("data-service") || "um serviço";
    const msg = `Olá! Gostaria de agendar ${service}. Poderia me informar os horários disponíveis?`;
    link.href = `${base}?text=${encodeURIComponent(msg)}`;
  });
})();

// ========================
// Scroll suave (âncoras internas)
// ========================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ========================
// Flip cards - Serviços
// ========================
document.querySelectorAll(".svc-card").forEach(card => {
  card.querySelectorAll(".mini-whats").forEach(link => {
    link.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  card.addEventListener("click", () => {
    const isFlipped = card.classList.contains("is-flipped");

    document.querySelectorAll(".svc-card.is-flipped").forEach(openCard => {
      if (openCard !== card) {
        openCard.classList.remove("is-flipped");
        openCard.setAttribute("aria-pressed", "false");
      }
    });

    card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(!isFlipped));
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

// ========================
// MENU MOBILE (hamburguer drawer)
// ========================
(function mobileMenu(){
  const toggle = document.getElementById("navToggle");
  const closeBtn = document.getElementById("navClose");
  const drawer = document.getElementById("mobileMenu");
  const panel = drawer?.querySelector(".mobile-menu__panel");

  if (!toggle || !drawer || !panel) return;

  const open = () => {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";

    const firstLink = drawer.querySelector(".mobile-link, .mobile-cta");
    if (firstLink) firstLink.focus();
  };

  const close = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    toggle.focus();
  };

  toggle.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);

  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) close();
  });

  drawer.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => close());
  });
})();
