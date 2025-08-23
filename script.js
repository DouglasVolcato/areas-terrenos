// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function () {

    // Configuração do Intersection Observer para animações de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer para elementos com data-aos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observa todos os elementos com data-aos
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    // window.addEventListener('scroll', () => {
    //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //     // Adiciona sombra ao header quando rola
    //     if (scrollTop > 100) {
    //         header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    //         header.style.background = 'rgba(255, 255, 255, 0.98)';
    //     } else {
    //         header.style.boxShadow = 'none';
    //         header.style.background = 'rgba(255, 255, 255, 0.95)';
    //     }

    //     // Hide/show header on scroll
    //     if (scrollTop > lastScrollTop && scrollTop > 200) {
    //         header.style.transform = 'translateY(-100%)';
    //     } else {
    //         header.style.transform = 'translateY(0)';
    //     }

    //     lastScrollTop = scrollTop;
    // });

    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Parallax effect para o hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }

    // Animação de digitação para o título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Inicia a animação após um pequeno delay
        setTimeout(typeWriter, 500);
    }

    // Contador animado para estatísticas (se houver)
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Observer para contadores
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const countersSection = document.querySelector('.counters');
    if (countersSection) {
        counterObserver.observe(countersSection);
    }

    // Efeito de hover nos cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito de ripple nos botões
    const buttons = document.querySelectorAll('.whatsapp-btn, .contact-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Lazy loading para imagens (se houver)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: #2c3e50;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 1.2rem;
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Preloader (opcional)
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #2c3e50;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;

    preloader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid #25d366;
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    document.body.appendChild(preloader);

    // Remove preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });

    // Form validation (se houver formulários)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validação básica
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#25d366';
                }
            });

            if (isValid) {
                // Aqui você pode adicionar a lógica de envio do formulário
                console.log('Formulário válido - pronto para envio');
            }
        });
    });

    // Adiciona classe para elementos visíveis
    const revealElements = document.querySelectorAll('.service-card, .about-item, .cta-content');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Performance optimization - debounce scroll events
    let ticking = false;

    function updateScrollEffects() {
        // Aqui você pode adicionar outros efeitos de scroll
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    console.log('Landing page carregada com sucesso!');
});

// CSS adicional para efeitos
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .nav.active ul {
        flex-direction: column;
        gap: 1rem;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .scroll-to-top:hover {
        background: #25d366 !important;
        transform: translateY(-3px);
    }
    
    @media (max-width: 768px) {
        .nav {
            display: none;
        }
    }
`;

// Adiciona os estilos adicionais
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

const audio = document.getElementById("audio");

function enableAudio() {
    // play precisa ser chamado dentro do evento
    audio.play().then(() => {
        console.log("Áudio iniciado!");
    }).catch(err => {
        console.log("Erro ao iniciar áudio:", err);
    });

    // remove os listeners depois do primeiro play
    document.removeEventListener("click", enableAudio);
    document.removeEventListener("scroll", enableAudio);
}

document.addEventListener("click", enableAudio, { once: true });
document.addEventListener("scroll", enableAudio, { once: true });