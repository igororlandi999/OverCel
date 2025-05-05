document.addEventListener('DOMContentLoaded', function() {
    // Detecta o nível da página para ajustar o caminho
    const pathLevel = window.location.pathname.split('/').length - 1;
    const relativePath = '../'.repeat(pathLevel - 1);
    
    // Carrega o footer
    fetch(relativePath + 'footer-template.html')
        .then(response => response.text())
        .then(html => {
            // Cria um container para o footer
            const footerContainer = document.querySelector('#footer-container') || document.body;
            
            // Insere o footer no documento
            footerContainer.innerHTML += html;
            
            // Ajusta os caminhos das imagens e links
            adjustPaths();
        })
        .catch(error => console.error('Erro ao carregar footer:', error));
});

// Função para ajustar caminhos relativos
function adjustPaths() {
    const pathLevel = window.location.pathname.split('/').length - 1;
    const relativePath = '../'.repeat(pathLevel - 1);
    
    // Ajusta imagens
    document.querySelectorAll('footer img').forEach(img => {
        const src = img.getAttribute('src');
        if (src.startsWith('/assets')) {
            img.src = relativePath + src.substring(1);
        }
    });
    
    // Ajusta links
    document.querySelectorAll('footer a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
            link.href = relativePath + href.substring(1);
        }
    });
}