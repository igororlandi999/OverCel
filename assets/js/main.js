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
            
            // Inicializar animações apenas após o preloader
            // Verificar se a função existe (para garantir que o script foi carregado)
            if (typeof window.initScrollAnimations === 'function') {
                window.initScrollAnimations();
            }
        }, 500); // Aumentado para 500ms para garantir que o preloader tenha tempo suficiente
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
                    field.classList.add('form-error');
                    showFieldError(field, 'Este campo é obrigatório');
                } else {
                    field.classList.remove('form-error');
                    hideFieldError(field);
                }
            });
            
            // Validação de email
            const emailField = contatoForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('form-error');
                    showFieldError(emailField, 'Por favor, insira um email válido');
                }
            }
            
            if (isValid) {
                // Simular envio bem-sucedido
                const submitBtn = contatoForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    // Resetar formulário
                    contatoForm.reset();
                    
                    // Mostrar mensagem de sucesso
                    showSuccessMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    
                    // Restaurar botão
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Animação das partículas de energia no hero
    initEnergyParticles();
    
    // Inicializar animações da seção de novidades
    initNovidadesAnimations();
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (validateEmail(emailInput.value)) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Inscrevendo...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showSuccessMessage('Inscrição realizada com sucesso!');
                    emailInput.value = '';
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            } else {
                showError('Por favor, insira um email válido');
            }
        });
    }
});

// Funções auxiliares para formulários
function showFieldError(field, message) {
    // Remove mensagem de erro anterior
    hideFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    // Encontrar o formulário ativo ou usar o primeiro disponível
    const form = document.querySelector('#contato-form') || document.querySelector('form');
    if (form) {
        form.appendChild(successDiv);
        
        // Remover mensagem após 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

function showError(message) {
    // Implementar notificação de erro se necessário
    alert(message);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
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

// Inicializar animações da seção de novidades
function initNovidadesAnimations() {
    const novidadeCards = document.querySelectorAll('.novidade-card');
    
    novidadeCards.forEach((card, index) => {
        // Animação de entrada escalonada
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
    
    // Efeito de hover aprimorado para features
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Simular efeitos de carregamento para elementos UI
function simulateLoading(element, callback) {
    element.classList.add('btn-loading');
    
    setTimeout(() => {
        element.classList.remove('btn-loading');
        if (typeof callback === 'function') {
            callback();
        }
    }, 1500);
}

// Função de máscara para telefone no formulário
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

// Função para destacar novos produtos
function highlightNewProducts() {
    const newBadges = document.querySelectorAll('.produto-badge.new');
    
    newBadges.forEach(badge => {
        // Adicionar efeito pulsante
        setInterval(() => {
            badge.style.animation = 'pulse-glow 1s ease-in-out';
            
            setTimeout(() => {
                badge.style.animation = 'pulse-glow 2s infinite';
            }, 1000);
        }, 5000);
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(highlightNewProducts, 2000); // Executar após 2 segundos
});

// Função para scroll suave personalizado para botões CTA
function smoothScrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Adicionar funcionalidade aos botões de "Confira as Novidades"
document.addEventListener('DOMContentLoaded', function() {
    const novidadesCTA = document.querySelector('.novidades-cta .btn-cta');
    if (novidadesCTA) {
        novidadesCTA.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToSection('#produtos');
            
            // Destacar produtos novos após o scroll
            setTimeout(() => {
                const newProducts = document.querySelectorAll('.produto-card .produto-badge.new');
                newProducts.forEach(badge => {
                    const card = badge.closest('.produto-card');
                    card.style.animation = 'glow 1s ease-in-out';
                    
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 1000);
                });
            }, 800);
        });
    }
});

// Função para animação de contador nos stats - REMOVIDA
// Esta função foi removida pois causava problemas de fluidez e valores incorretos

// Inicializar contador quando a seção estiver visível - REMOVIDO
// Esta função foi removida

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Removido initCounterAnimation para evitar animação problemática nos stats
});