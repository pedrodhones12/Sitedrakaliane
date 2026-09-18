// Configure aqui o número com DDI + DDD, somente números.
const WHATSAPP_NUMBER = "55SEUNUMERO";

function whatsappUrl(message = "Olá, Dra. Kaliane! Gostaria de saber mais sobre uma avaliação de fisioterapia.") {
  if (WHATSAPP_NUMBER === "55SEUNUMERO") return "#contato";
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }));
  }

  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    link.href = whatsappUrl();
    if (WHATSAPP_NUMBER !== "55SEUNUMERO") link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const form = document.getElementById("contactForm");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value.trim();
    const text = `Olá, Dra. Kaliane! Meu nome é ${nome}. Gostaria de falar sobre: ${assunto}.${mensagem ? " Mensagem: " + mensagem : ""}`;
    const url = whatsappUrl(text);
    if (url === "#contato") {
      alert("Configure o número do WhatsApp no arquivo script.js antes de enviar.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
