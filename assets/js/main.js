/**
 * Overcel - Website
 * Scripts principais para funcionalidades interativas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        
        // Habilitar animações após o preloader
        setTimeout(function() {
            document.body.classList.add('loaded');
            initAnimations();
        }, 300);
    }, 1500);
    
    // Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Alternar ícone do menu
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fechar menu ao clicar no overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Resetar ícone do menu
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Resetar ícone do menu
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Efeito de navbar com scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Mostrar/ocultar botão "voltar ao topo"
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Accordion para FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
        });
    });
    
    // Validação do formulário de contato
    const contatoForm = document.getElementById('contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            let isValid = true;
            const requiredFields = contatoForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validação de email
            const emailField = contatoForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Aqui você pode adicionar código para enviar o formulário via AJAX
                // ou simplesmente mostrar uma mensagem de sucesso
                
                // Simular envio bem-sucedido
                const submitBtn = contatoForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    // Resetar formulário
                    contatoForm.reset();
                    
                    // Mostrar mensagem de sucesso
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
                    
                    contatoForm.appendChild(successMessage);
                    
                    // Restaurar botão
                    submitBtn.innerHTML = 'Enviar Mensagem';
                    submitBtn.disabled = false;
                    
                    // Remover mensagem após alguns segundos
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Animação das partículas de energia no hero
    initEnergyParticles();
});

// Inicializar animações com interseção observer
function initAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .produto-card, .aplicacao-card, .sobre-text, .sobre-image, .porque-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Adicionar delays diferentes para criar um efeito cascata
    animatedElements.forEach((el, index) => {
        // Adicionar classes de delay baseadas no índice
        if (index % 3 === 0) {
            el.classList.add('animate-delay-1');
        } else if (index % 3 === 1) {
            el.classList.add('animate-delay-2');
        } else {
            el.classList.add('animate-delay-3');
        }
        
        observer.observe(el);
    });
}

// Criar e animar partículas de energia na seção hero
function initEnergyParticles() {
    const energyParticles = document.querySelector('.energy-particles');
    if (!energyParticles) return;
    
    // Criar partículas
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'energy-particle';
        
        // Estilo aleatório para cada partícula
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.boxShadow = '0 0 10px rgba(0, 170, 255, 0.8)';
        
        // Animação
        particle.style.animation = `
            particleMove${Math.random() > 0.5 ? 1 : 2} ${Math.random() * 4 + 6}s infinite ease-in-out,
            particleFade ${Math.random() * 2 + 2}s infinite ease-in-out
        `;
        
        energyParticles.appendChild(particle);
    }
}

// Simular efeitos de carregamento para elementos UI
function simulateLoading(element, callback) {
    element.classList.add('loading');
    
    setTimeout(() => {
        element.classList.remove('loading');
        if (typeof callback === 'function') {
            callback();
        }
    }, 1500);
}

// Função de mascara para telefone no formulário
function mascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, '');
    let formatado = '';
    
    if (valor.length > 0) {
        formatado = '(' + valor.substring(0, 2);
    }
    
    if (valor.length > 2) {
        formatado += ') ' + valor.substring(2, 7);
    }
    
    if (valor.length > 7) {
        formatado += '-' + valor.substring(7, 11);
    }
    
    input.value = formatado;
}

// Adicionar máscara ao campo de telefone quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            mascaraTelefone(this);
        });
    }
});