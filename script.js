// ===== CONFIGURAÇÃO =====
const WHATSAPP_NUMBER = "55SEUNUMERO";

function whatsappUrl(message = "Olá, Dra. Kaliane! Gostaria de saber mais sobre uma avaliação de fisioterapia.") {
  if (WHATSAPP_NUMBER === "55SEUNUMERO") return "#contato";
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  // Menu mobile
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Links de WhatsApp
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    link.href = whatsappUrl();
    if (WHATSAPP_NUMBER !== "55SEUNUMERO") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  // Formulário para WhatsApp
  const form = document.getElementById("contactForm");

  form?.addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.getElementById("nome")?.value.trim();
    const assunto = document.getElementById("assunto")?.value;
    const mensagem = document.getElementById("mensagem")?.value.trim();

    if (!nome) return;

    const text =
      `Olá, Dra. Kaliane! Meu nome é ${nome}. Gostaria de falar sobre: ${assunto}.` +
      (mensagem ? ` Mensagem: ${mensagem}` : "");

    const url = whatsappUrl(text);

    if (url === "#contato") {
      alert("Configure o número do WhatsApp no arquivo script.js antes de enviar.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  });

  // Ano automático
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Animações suaves de entrada
  const revealItems = document.querySelectorAll(
    ".intro-grid, .about-grid, .card, .gallery figure, .content-card, .contact-grid"
  );

  revealItems.forEach(item => item.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Cabeçalho muda discretamente ao rolar
  const header = document.querySelector(".header");

  const updateHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Seção ativa no menu
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // Botão voltar ao topo
  const backTop = document.createElement("button");
  backTop.type = "button";
  backTop.className = "back-top";
  backTop.setAttribute("aria-label", "Voltar ao topo");
  backTop.innerHTML = "↑";
  document.body.appendChild(backTop);

  const updateBackTop = () => {
    backTop.classList.toggle("show", window.scrollY > 600);
  };

  updateBackTop();
  window.addEventListener("scroll", updateBackTop, { passive: true });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
