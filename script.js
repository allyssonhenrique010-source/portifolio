// ===========================
// SUAVIZAÇÃO DE SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// EFEITO PARALLAX NA HERO
// ===========================
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ===========================
// ANIMAÇÃO DE NÚMEROS (COUNTER)
// ===========================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===========================
// ANIMAÇÃO AO SCROLL (OBSERVADOR)
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar seções
document.querySelectorAll('.section, .skill-card, .education-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===========================
// MENU MOBILE RESPONSIVO
// ===========================
function handleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', handleMobileMenu);

// ===========================
// VALIDAÇÃO DE LINKS DE CONTATO
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    const whatsappLink = document.querySelector('a[href^="https://wa.me/"]');

    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            console.log('Email clicado:', emailLink.href);
        });
    }

    if (whatsappLink) {
        whatsappLink.addEventListener('click', (e) => {
            console.log('WhatsApp clicado');
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            const submitButton = contactForm.querySelector('button[type="submit"]');

            if (!nome || !email || !mensagem) {
                formStatus.textContent = 'Por favor, preencha todos os campos antes de enviar.';
                formStatus.classList.remove('success');
                formStatus.classList.add('error');
                return;
            }

            formStatus.textContent = 'Enviando mensagem...';
            formStatus.classList.remove('error', 'success');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao enviar a mensagem.');
                }

                formStatus.innerHTML = '<strong>Obrigado pela mensagem!</strong> Em breve retornarei.';
                formStatus.classList.remove('error');
                formStatus.classList.add('success');
                contactForm.reset();
            } catch (error) {
                formStatus.textContent = 'Não foi possível enviar a mensagem. Tente novamente mais tarde.';
                formStatus.classList.remove('success');
                formStatus.classList.add('error');
                console.error(error);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar mensagem';
            }
        });
    }
});

// ===========================
// EFEITO HOVER NAS SKILL BARS
// ===========================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const progressBar = this.querySelector('.skill-progress');
        if (progressBar) {
            progressBar.style.width = progressBar.style.width;
        }
    });
});

// ===========================
// LOG DE BOAS-VINDAS
// ===========================
console.log('%c🚀 Bem-vindo ao portfólio HenriCode!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ por Allysson Henrique', 'font-size: 14px; color: #10b981;');
console.log('%cEmail: allyssonhenrique010@gmail.com', 'font-size: 12px; color: #6b7280;');
console.log('%cWhatsApp: (81) 99112-9265', 'font-size: 12px; color: #6b7280;');
