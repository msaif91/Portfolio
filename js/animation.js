// ==========================================
// ANIMATIONS.JS - Gestion des animations
// ==========================================

// ==========================================
// Intersection Observer pour les animations au scroll
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animation spécifique pour les skill cards
            if (entry.target.classList.contains('skill-category')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${delay * 0.1}s`;
            }
            
            // Animation spécifique pour les project cards
            if (entry.target.classList.contains('project-card')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${delay * 0.15}s`;
            }
            
            // Ne plus observer après l'animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
const elementsToAnimate = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .about-content, .section-title'
);

elementsToAnimate.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// ==========================================
// Counter animation pour les stats
// ==========================================
const counters = document.querySelectorAll('.counter');
const counterSpeed = 200; // Plus bas = plus rapide

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const increment = target / counterSpeed;
            
            const updateCount = () => {
                const count = +counter.innerText;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + '+';
                }
            };
            
            updateCount();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ==========================================
// Parallax effect pour le hero background
// ==========================================
const heroBg = document.querySelector('.hero-bg');

if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroBg.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

// ==========================================
// Hover effect 3D pour les project cards
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==========================================
// Typing cursor effect
// ==========================================
const createCursor = () => {
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    return cursor;
};

// Ajouter le curseur au hero title après le typing
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.querySelector('.typing-cursor')) {
        const cursor = createCursor();
        heroTitle.appendChild(cursor);
        
        // Faire clignoter le curseur
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
}, 2000);

// ==========================================
// Scroll reveal animations avec délai
// ==========================================
const revealElements = () => {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.animationDelay = `${index * 0.1}s`;
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealElements);
revealElements(); // Initial check

// ==========================================
// Smooth scroll indicator animation
// ==========================================
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'all';
        }
    });
}

// ==========================================
// Glitch effect sur le logo (optionnel)
// ==========================================
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('mouseenter', () => {
        logo.classList.add('glitch');
        setTimeout(() => {
            logo.classList.remove('glitch');
        }, 500);
    });
}

// ==========================================
// Particles effect dans le hero (léger)
// ==========================================
const createParticles = () => {
    const hero = document.getElementById('hero');
    const particlesCount = 20;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        hero.appendChild(particle);
    }
};

// Activer les particules seulement sur desktop
if (window.innerWidth > 768) {
    createParticles();
}

// ==========================================
// Effet de vague sur les boutons
// ==========================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});