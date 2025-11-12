// ==========================================
// MAIN.JS - Fonctionnalités principales
// ==========================================

// Navigation mobile
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Fermer le menu mobile au clic sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// ==========================================
// Navbar sticky et transparence
// ==========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter background au scroll
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Cacher/montrer navbar au scroll (optionnel)
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// Smooth scroll pour les liens d'ancrage
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Offset pour la navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Active link dans la navigation
// ==========================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function changeLinkState() {
    let index = sections.length;
    
    while(--index && window.scrollY + 200 < sections[index].offsetTop) {}
    
    navItems.forEach((link) => link.classList.remove('active'));
    if (navItems[index]) {
        navItems[index].classList.add('active');
    }
}

changeLinkState();
window.addEventListener('scroll', changeLinkState);

// ==========================================
// Bouton scroll to top
// ==========================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// Typing effect pour le hero subtitle
// ==========================================
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Démarrer après un petit délai
    setTimeout(typeWriter, 500);
}

// ==========================================
// Console easter egg
// ==========================================
console.log('%c👋 Salut toi !', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%c🔍 Tu regardes le code ? J\'aime ça !', 'font-size: 14px; color: #8b5cf6;');
console.log('%c📧 Contacte-moi : votre.email@exemple.com', 'font-size: 12px; color: #22d3ee;');
console.log('%c💼 GitHub : https://github.com/msaif91', 'font-size: 12px; color: #10b981;');

// ==========================================
// Preloader (optionnel)
// ==========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});