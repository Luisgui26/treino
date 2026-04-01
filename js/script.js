/* =========================================
   MENU MOBILE TOGGLE
   ========================================= */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

// Toggle menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/* =========================================
   HEADER FIXO (SCROLL)
   ========================================= */
const scrollHeader = () => {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
};
window.addEventListener('scroll', scrollHeader);

/* =========================================
   SCROLL SUAVE E HIGHLIGHT DO MENU ATIVO
   ========================================= */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.style.setProperty('color', 'var(--color-primary-dark)');
        } else {
            link?.style.removeProperty('color');
        }
    });
};
window.addEventListener('scroll', scrollActive);

/* =========================================
   ANIMAÇÃO DE SCROLL (INTERSECTION OBSERVER)
   ========================================= */
const scrollElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    threshold: 0.15, // 15% do elemento na tela para disparar
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // Para animar apenas 1 vez
        }
    });
}, observerOptions);

scrollElements.forEach(el => scrollObserver.observe(el));

/* =========================================
   VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   ========================================= */
const contatoForm = document.getElementById('contato-form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');
const successMessage = document.getElementById('success-message');

// Emails válidos: regex básico
const validateEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

// Remove mensagem de erro ao digitar
[nomeInput, emailInput, mensagemInput].forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('invalid');
        const errorSpan = document.getElementById(`error-${input.id}`);
        if(errorSpan) errorSpan.style.display = 'none';
    });
});

if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validar Nome
        if (nomeInput.value.trim() === '') {
            nomeInput.classList.add('invalid');
            document.getElementById('error-nome').style.display = 'block';
            isValid = false;
        }

        // Validar Email
        if (!validateEmail(emailInput.value.trim())) {
            emailInput.classList.add('invalid');
            document.getElementById('error-email').style.display = 'block';
            isValid = false;
        }

        // Validar Mensagem
        if (mensagemInput.value.trim() === '') {
            mensagemInput.classList.add('invalid');
            document.getElementById('error-mensagem').style.display = 'block';
            isValid = false;
        }

        // Sucesso
        if (isValid) {
            successMessage.style.display = 'block';
            contatoForm.reset();
            
            // Oculta a mensagem após 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
}
