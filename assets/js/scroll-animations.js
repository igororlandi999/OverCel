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
    // Selecionar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.section-header:not(.hero-section .section-header), .produto-card, .aplicacao-card, .sobre-text, .sobre-image, .porque-item');
    
    // Esconder os elementos inicialmente
    elementsToAnimate.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });
    
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
                // Adicionar delay baseado no índice para efeito cascata
                setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }, (index % 3) * 150); // 0ms, 150ms ou 300ms de delay
            }
        });
    }
    
    // Verificar elementos visíveis no carregamento inicial
    // Pequeno delay para garantir que o preloader já terminou
    setTimeout(revealVisibleElements, 100);
    
    // Adicionar listener de scroll com throttling para melhor performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                revealVisibleElements();
                scrollTimeout = null;
            }, 100); // Throttle de 100ms
        }
    });
}

// Exportar a função para ser chamada pelo script principal
window.initScrollAnimations = initScrollAnimations;