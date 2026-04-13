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

// FUNCIONALIDADE DO FORMULÁRIO DE CONTATO
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const sendBtn = document.getElementById("sendBtn");
    const feedback = document.getElementById("formFeedback");
    const originalText = sendBtn.innerHTML;

    // Coletando dados
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto =
      document.getElementById("assunto").value || "Contato pelo Portfólio";
    const mensagem = document.getElementById("mensagem").value;

    // Desabilitar botão e mostrar loading
    sendBtn.disabled = true;
    sendBtn.innerHTML = "Enviando... 📨";
    feedback.innerHTML = "";

    try {
      // Opção 1: Enviar via WhatsApp (mais simples e funcional)
      const texto = `*Novo contato do Portfólio!*%0A%0A*Nome:* ${nome}%0A*E-mail:* ${email}%0A*Assunto:* ${assunto}%0A*Mensagem:* ${mensagem}`;
      const whatsappUrl = `https://wa.me/5545988353553?text=${texto}`;

      // Abrir WhatsApp em nova aba
      window.open(whatsappUrl, "_blank");

      // Feedback de sucesso
      feedback.innerHTML =
        "✅ Mensagem preparada! O WhatsApp será aberto para você enviar.";
      feedback.className = "feedback success";

      // Limpar formulário
      document.getElementById("contactForm").reset();

      // Opção 2: Enviar por e-mail (fallback/complementar)
      // Descomente abaixo se quiser também enviar email
      /*
        const response = await fetch('https://formspree.io/f/seu-form-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, assunto, mensagem })
        });
        
        if (response.ok) {
            feedback.innerHTML = '✅ Mensagem enviada com sucesso! Entrarei em contato em breve.';
            feedback.className = 'feedback success';
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Erro no envio');
        }
        */
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

// Máscara para telefone (opcional)
function formatPhone(phone) {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return phone;
}

// Efeito de digitação no título (opcional)
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

  // typeEffect(); // Descomente se quiser o efeito de digitação
}
