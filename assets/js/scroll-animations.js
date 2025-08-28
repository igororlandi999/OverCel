/**
 * Overcel - Animações de Scroll
 * Script separado para lidar apenas com as animações de scroll
 */

// Esperar o documento estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Não fazer nada aqui - vamos esperar o preloader terminar
});

// Função para inicializar as animações de scroll
// Esta função será chamada após o preloader terminar
function initScrollAnimations() {
    // Selecionar elementos para animar (incluindo novos elementos da seção de novidades)
    const elementsToAnimate = document.querySelectorAll(`
        .section-header:not(.hero-section .section-header), 
        .produto-card, 
        .aplicacao-card, 
        .sobre-text, 
        .sobre-image, 
        .porque-item,
        .novidades-text,
        .novidade-card,
        .feature-item,
        .faq-item,
        .contato-card,
        .contato-form
    `);
    
    // Esconder os elementos inicialmente
    elementsToAnimate.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });
    
    // Animação especial para a seção de novidades
    const novidadesSection = document.querySelector('.novidades-section');
    if (novidadesSection) {
        novidadesSection.style.opacity = "0";
        novidadesSection.style.transform = "translateY(50px)";
        novidadesSection.style.transition = "all 0.8s ease-out";
    }
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Elemento está pelo menos 20% visível na viewport
        return (
            rect.top <= windowHeight * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Função para revelar elementos visíveis
    function revealVisibleElements() {
        elementsToAnimate.forEach((el, index) => {
            if (isElementInViewport(el) && el.style.opacity === "0") {
                // Diferentes tipos de animação baseados na classe
                let animationType = 'fadeInUp';
                let delay = (index % 3) * 150; // 0ms, 150ms ou 300ms de delay
                
                if (el.classList.contains('novidade-card')) {
                    animationType = 'slideInScale';
                    delay = (index % 2) * 200;
                } else if (el.classList.contains('feature-item')) {
                    animationType = 'slideInLeft';
                    delay = index * 100;
                } else if (el.classList.contains('produto-card')) {
                    animationType = 'bounceInUp';
                    delay = (index % 4) * 100;
                }
                
                // Aplicar animação baseada no tipo
                setTimeout(() => {
                    applyAnimation(el, animationType);
                }, delay);
            }
        });
        
        // Animação especial para seção de novidades
        if (novidadesSection && isElementInViewport(novidadesSection) && novidadesSection.style.opacity === "0") {
            setTimeout(() => {
                novidadesSection.style.opacity = "1";
                novidadesSection.style.transform = "translateY(0)";
                
                // Animar elementos internos em sequência
                animateNovidadesElements();
            }, 300);
        }
    }
    
    // Função para aplicar diferentes tipos de animação
    function applyAnimation(el, type) {
        switch(type) {
            case 'fadeInUp':
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                break;
                
            case 'slideInScale':
                el.style.opacity = "1";
                el.style.transform = "translateY(0) scale(1)";
                el.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                break;
                
            case 'slideInLeft':
                el.style.opacity = "1";
                el.style.transform = "translateX(0)";
                el.style.transition = "all 0.5s ease-out";
                // Inicialmente vem da esquerda
                if (el.style.transform.includes('translateY')) {
                    el.style.transform = "translateX(-30px) translateY(30px)";
                    setTimeout(() => {
                        el.style.transform = "translateX(0) translateY(0)";
                    }, 50);
                }
                break;
                
            case 'bounceInUp':
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                el.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                break;
                
            default:
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
        }
    }
    
    // Função para animar elementos da seção de novidades em sequência
    function animateNovidadesElements() {
        const novidadesText = document.querySelector('.novidades-text');
        const featureItems = document.querySelectorAll('.feature-item');
        const novidadeCards = document.querySelectorAll('.novidade-card');
        const novidadesCTA = document.querySelector('.novidades-cta');
        
        // Animar texto primeiro
        if (novidadesText) {
            setTimeout(() => {
                novidadesText.style.opacity = "1";
                novidadesText.style.transform = "translateX(0)";
            }, 200);
        }
        
        // Animar features em sequência
        featureItems.forEach((item, index) => {
            // Inicialmente vem da esquerda
            item.style.transform = "translateX(-50px)";
            
            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
            }, 400 + (index * 150));
        });
        
        // Animar cards dos produtos
        novidadeCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
                
                // Efeito de brilho após aparecer
                setTimeout(() => {
                    card.style.boxShadow = "0 15px 30px rgba(0, 170, 255, 0.2)";
                    setTimeout(() => {
                        card.style.boxShadow = "";
                    }, 500);
                }, 200);
            }, 600 + (index * 200));
        });
        
        // Animar CTA por último
        if (novidadesCTA) {
            setTimeout(() => {
                novidadesCTA.style.opacity = "1";
                novidadesCTA.style.transform = "translateY(0) scale(1)";
            }, 1000);
        }
    }
    
    // Animação para contadores (stats)
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(stat.textContent.replace(/\D/g, '')) || 0;
                        animateCounter(stat, target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        });
    }
    
    // Função para animar contador individual
    function animateCounter(element, target) {
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            
            // Manter o símbolo original
            const originalText = element.getAttribute('data-target') || element.textContent;
            if (originalText.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (originalText.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Função para animação de progresso/loading bars (se houver)
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progress = bar.getAttribute('data-progress') || '0';
                        bar.style.width = progress + '%';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    }
    
    // Verificar elementos visíveis no carregamento inicial
    // Pequeno delay para garantir que o preloader já terminou
    setTimeout(revealVisibleElements, 100);
    
    // Inicializar outras animações
    setTimeout(() => {
        animateCounters();
        animateProgressBars();
    }, 500);
    
    // Adicionar listener de scroll com throttling para melhor performance
    let scrollTimeout;
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                revealVisibleElements();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Adicionar animações de hover para elementos interativos
    initHoverAnimations();
}

// Função para inicializar animações de hover
function initHoverAnimations() {
    // Animações para cards de produto
    const productCards = document.querySelectorAll('.produto-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 170, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
            this.style.boxShadow = '0 15px 30px rgba(0, 170, 255, 0.15)';
        });
    });
    
    // Animações para cards de novidades
    const novidadeCards = document.querySelectorAll('.novidade-card');
    novidadeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.novidade-img');
            if (img) {
                img.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.novidade-img');
            if (img) {
                img.style.transform = 'scale(1.1) rotate(0deg)';
            }
        });
    });
    
    // Animações para botões CTA
    const ctaButtons = document.querySelectorAll('.btn-cta');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    // Animação para badges "Novo"
    const newBadges = document.querySelectorAll('.produto-badge.new, .novidade-badge');
    newBadges.forEach(badge => {
        // Adicionar pulsação periódica
        setInterval(() => {
            badge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    });
}

// Função para reinicializar animações (útil para SPAs)
function reinitializeAnimations() {
    // Resetar todos os elementos
    const allElements = document.querySelectorAll(`
        .section-header:not(.hero-section .section-header), 
        .produto-card, 
        .aplicacao-card, 
        .sobre-text, 
        .sobre-image, 
        .porque-item,
        .novidades-text,
        .novidade-card,
        .feature-item
    `);
    
    allElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
    });
    
    // Reinicializar
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
}

// Exportar as funções para serem usadas pelo script principal
window.initScrollAnimations = initScrollAnimations;
window.reinitializeAnimations = reinitializeAnimations;