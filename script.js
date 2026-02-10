// =========================
// ===== JAVASCRIPT ========
// =========================

// 1) Monta links do WhatsApp (menu + CTAs)
(function setupWhatsappLinks(){
  // pega do <script> do HTML
  const num = (window.WHATSAPP_NUMBER || "5500000000000").toString();
  const base = `https://wa.me/${num}`;

  const menu = document.getElementById("menuWhatsapp");
  const hero = document.getElementById("ctaHero");
  const sobre = document.getElementById("ctaSobre");
  //const contato = document.getElementById("ctaContato");

  if (menu) menu.href = base;
  if (hero) hero.href = base;
  if (sobre) sobre.href = base;
  //if (contato) contato.href = base;

  const footerW1 = document.getElementById("footerWhatsapp");
  const footerW2 = document.getElementById("footerWhatsapp2");
  if (footerW1) footerW1.href = base;
  if (footerW2) footerW2.href = base;

  // Links dos mini-whats com mensagem pronta por serviço
  document.querySelectorAll(".mini-whats").forEach(link => {
    const service = link.getAttribute("data-service") || "um serviço";
    const msg = `Olá! Gostaria de agendar ${service}. Poderia me informar os horários disponíveis?`;
    link.href = `${base}?text=${encodeURIComponent(msg)}`;
  });
})();

// 2) Scroll suave somente para âncoras internas (#...)
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

// 3) Flip cards - Serviços ("Pra você")
//    + impede que clicar no mini-whats vire o card
document.querySelectorAll(".svc-card").forEach(card => {
  card.querySelectorAll(".mini-whats").forEach(link => {
    link.addEventListener("click", (e) => {
      e.stopPropagation(); // não flipar
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
