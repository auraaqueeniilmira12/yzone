// frontend/js/navbar.js

async function loadNavbar() {
    try {
        const response = await fetch('/frontend/components/navbar.html');
        const navbarHtml = await response.text();
        
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = navbarHtml;
            highlightActiveMenu();
            setupMobileMenu();
            
            setTimeout(() => {
                if (window.YZONE_AUTH && typeof window.YZONE_AUTH.updateNavbarForAuth === 'function') {
                    window.YZONE_AUTH.updateNavbarForAuth();
                }
            }, 50);
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = `
                <nav class="navbar">
                    <div class="container">
                        <div class="navbar-brand">
                            <a href="/frontend/index.html">YZONE</a>
                        </div>
                        <div class="navbar-links">
                            <a href="/frontend/index.html">Home</a>
                            <a href="/frontend/pages/movies.html">Movies</a>
                            <a href="/frontend/pages/actors.html">Actors</a>
                            <a href="/frontend/pages/profile.html">Watchlist</a>
                            <a href="/frontend/pages/login.html" class="login-link"><i class="fas fa-sign-in-alt"></i> Login</a>
                        </div>
                    </div>
                </nav>
            `;
            highlightActiveMenu();
            
            setTimeout(() => {
                if (window.YZONE_AUTH && typeof window.YZONE_AUTH.updateNavbarForAuth === 'function') {
                    window.YZONE_AUTH.updateNavbarForAuth();
                }
            }, 50);
        }
    }
}

function highlightActiveMenu() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.navbar-links a:not(.login-link)');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        if (currentPath === href || 
            (currentPath.includes('/pages/movies.html') && href.includes('movies')) ||
            (currentPath.includes('/pages/actors.html') && href.includes('actors')) ||
            (currentPath.includes('/pages/profile.html') && href.includes('profile')) ||
            (currentPath === '/frontend/index.html' && href.includes('index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.navbar-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
}

document.addEventListener('DOMContentLoaded', loadNavbar);