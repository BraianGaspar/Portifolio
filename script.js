// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Animação de entrada dos cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".projeto-card, .skill-category, .timeline-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });

// Atualizar ano automaticamente no footer
const footerYear = document.querySelector("footer p:first-child");
if (footerYear) {
  footerYear.innerHTML = `© ${new Date().getFullYear()} Braian Gaspar da Rosa | Desenvolvedor Full Stack`;
}

// FUNCIONALIDADE DO FORMULÁRIO DE CONTATO - APENAS ASSUNTO E MENSAGEM
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const sendBtn = document.getElementById("sendBtn");
    const feedback = document.getElementById("formFeedback");
    const originalText = sendBtn.innerHTML;

    // Coletando apenas assunto e mensagem
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;

    // Validação
    if (!assunto) {
      feedback.innerHTML = "❌ Por favor, digite um assunto.";
      feedback.className = "feedback error";
      return;
    }

    if (!mensagem) {
      feedback.innerHTML = "❌ Por favor, digite sua mensagem.";
      feedback.className = "feedback error";
      return;
    }

    // Desabilitar botão e mostrar loading
    sendBtn.disabled = true;
    sendBtn.innerHTML = "Enviando... 📨";
    feedback.innerHTML = "";

    try {
      // Enviar via WhatsApp com apenas assunto e mensagem
      const texto = `*Novo contato do Portfólio!*%0A%0A*Assunto:* ${assunto}%0A*Mensagem:* ${mensagem}%0A%0A*Responder para:* braian_gaspar@hotmail.com`;
      const whatsappUrl = `https://wa.me/5545988353553?text=${texto}`;

      // Abrir WhatsApp em nova aba
      window.open(whatsappUrl, "_blank");

      // Feedback de sucesso
      feedback.innerHTML =
        "✅ Mensagem preparada! O WhatsApp será aberto para você enviar.";
      feedback.className = "feedback success";

      // Limpar formulário
      contactForm.reset();
    } catch (error) {
      feedback.innerHTML =
        "❌ Erro ao enviar. Você pode me contatar diretamente pelo WhatsApp: (45) 98835-3553";
      feedback.className = "feedback error";
    } finally {
      // Reativar botão após 3 segundos
      setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.innerHTML = originalText;
      }, 3000);
    }
  });
}

// Efeito de digitação no título (opcional - descomente a última linha para ativar)
const titles = [
  "Desenvolvedor Full Stack",
  "PHP • Node.js • Flutter",
  "Engenheiro de Software",
  "Criador de Soluções",
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroTitle = document.querySelector(".hero h2");

if (heroTitle && titles.length > 0) {
  function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(typeEffect, 500);
      return;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }

  // typeEffect(); // Descomente esta linha se quiser o efeito de digitação
}
