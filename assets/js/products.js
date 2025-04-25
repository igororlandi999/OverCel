// Product Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 800);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    }

    // Product Thumbnails
    const thumbnails = document.querySelectorAll('.produto-thumbnail');
    const mainImage = document.querySelector('.produto-main-image');

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image
                mainImage.src = this.src;
                
                // Update active state
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Product Tabs
    const tabItems = document.querySelectorAll('.produto-tab-item');
    const tabContents = document.querySelectorAll('.produto-tab-content');

    if (tabItems.length > 0) {
        tabItems.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab
                tabItems.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// Função para destacar a coluna selecionada na tabela de comparação
function highlightProductColumn(productId) {
    console.log("Destacando coluna:", productId); // Para debug
    
    // Remove o destaque de todas as colunas
    const table = document.getElementById('comparison-table');
    if (!table) {
        console.log("Tabela não encontrada");
        return;
    }
    
    // Remove todas as classes highlighted
    const allHeaders = table.querySelectorAll('.product-header');
    allHeaders.forEach(header => {
        header.classList.remove('highlighted');
    });
    
    const allCells = table.querySelectorAll('td[data-product]');
    allCells.forEach(cell => {
        cell.classList.remove('highlighted');
    });
    
    // Remove todos os badges
    const allBadges = table.querySelectorAll('.product-highlight-badge');
    allBadges.forEach(badge => {
        badge.remove();
    });
    
    // Adiciona o destaque à coluna selecionada
    const selectedHeaders = table.querySelectorAll(`.product-header[data-product="${productId}"]`);
    console.log("Headers encontrados:", selectedHeaders.length);
    
    selectedHeaders.forEach(header => {
        header.classList.add('highlighted');
        
        // Adiciona o badge "Visualizando"
        const badge = document.createElement('div');
        badge.className = 'product-highlight-badge';
        badge.textContent = '';
        header.appendChild(badge);
    });
    
    const selectedCells = table.querySelectorAll(`td[data-product="${productId}"]`);
    console.log("Células encontradas:", selectedCells.length);
    
    selectedCells.forEach(cell => {
        cell.classList.add('highlighted');
    });
    
    // Atualiza os botões
    const allButtons = table.querySelectorAll('.product-btn');
    allButtons.forEach(btn => {
        const btnProductId = btn.getAttribute('data-product');
        
        if (btnProductId === productId) {
            btn.className = 'btn btn-primary btn-sm product-btn';
            btn.textContent = 'Produto Atual';
            btn.href = '#';
        } else {
            btn.className = 'btn btn-outline btn-sm product-btn';
            btn.textContent = 'Ver Detalhes';
            
            // Ajusta os links corretamente
            if (btnProductId === '26v') {
                btn.href = '/pages/18650.html';
            } else if (btnProductId === '33v') {
                btn.href = '/pages/18650-33v.html';
            } else if (btnProductId === '35v') {
                btn.href = '/pages/18650-35v.html';
            }
        }
    });
}

// Função para verificar se o script está sendo executado na página correta
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado");
    
    const comparisonTable = document.getElementById('comparison-table');
    if (!comparisonTable) {
        console.log("Tabela de comparação não encontrada");
        return;
    }
    
    console.log("Tabela de comparação encontrada");
    
    // Adiciona event listeners aos links de produtos na navegação contextual
    const contextualLinks = document.querySelectorAll('.contextual-product-link');
    contextualLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verifica se estamos na página de comparação
            if (comparisonTable) {
                e.preventDefault();
                
                // Remove a classe 'active' de todos os links
                contextualLinks.forEach(l => {
                    l.classList.remove('active');
                });
                
                // Adiciona a classe 'active' ao link clicado
                this.classList.add('active');
                
                // Extrai o ID do produto da URL
                const href = this.getAttribute('href');
                let productId;
                
                if (href.includes('18650.html')) {
                    productId = '26v';
                } else if (href.includes('18650-33v')) {
                    productId = '33v';
                } else if (href.includes('18650-35v')) {
                    productId = '35v';
                }
                
                console.log("ID do produto:", productId);
                
                // Destaca a coluna correspondente
                if (productId) {
                    highlightProductColumn(productId);
                    
                    // Rola até a tabela de comparação
                    comparisonTable.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Inicializa o destaque com base na URL atual
    const currentUrl = window.location.pathname;
    console.log("URL atual:", currentUrl);
    
    let initialProductId;
    if (currentUrl.includes('18650-35v')) {
        initialProductId = '35v';
    } else if (currentUrl.includes('18650-33v')) {
        initialProductId = '33v';
    } else {
        // Assume que é a página 26V (18650.html)
        initialProductId = '26v';
    }
    
    console.log("ID do produto inicial:", initialProductId);
    highlightProductColumn(initialProductId);
});