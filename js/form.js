// ==========================================
// FORM.JS - Gestion du formulaire de contact
// ==========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// ==========================================
// Validation du formulaire
// ==========================================
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateForm = (formData) => {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Veuillez entrer une adresse email valide');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    return errors;
};

// ==========================================
// Affichage des messages
// ==========================================
const showMessage = (message, type = 'success') => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll vers le message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Masquer après 5 secondes
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
};

// ==========================================
// Soumission du formulaire
// ==========================================
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Valider le formulaire
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showMessage(errors.join('. '), 'error');
            return;
        }
        
        // Désactiver le bouton pendant l'envoi
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
        
        try {
            // ==========================================
            // OPTION 1 : EmailJS (Recommandé)
            // ==========================================
            // Décommenter et configurer avec tes identifiants EmailJS
            // https://www.emailjs.com/
            
            /*
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                reply_to: formData.email
            })
            .then(() => {
                showMessage('✅ Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Erreur EmailJS:', error);
                showMessage('❌ Une erreur est survenue. Veuillez réessayer.', 'error');
            });
            */
            
            // ==========================================
            // OPTION 2 : Formspree (Alternative simple)
            // ==========================================
            // Remplace YOUR_FORM_ID par ton ID Formspree
            // https://formspree.io/
            
            /*
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                showMessage('✅ Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Erreur réseau');
            }
            */
            
            // ==========================================
            // OPTION 3 : Simulation (pour le développement)
            // ==========================================
            // À RETIRER en production !
            
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simule un délai
            
            console.log('📧 Formulaire soumis:', formData);
            showMessage('✅ Message envoyé avec succès ! (Mode démo - configurer EmailJS ou Formspree)', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            showMessage('❌ Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.', 'error');
        } finally {
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// ==========================================
// Validation en temps réel des champs
// ==========================================
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Validation du nom
if (nameInput) {
    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim().length < 2) {
            nameInput.classList.add('error');
        } else {
            nameInput.classList.remove('error');
            nameInput.classList.add('valid');
        }
    });
}

// Validation de l'email
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('error');
        } else {
            emailInput.classList.remove('error');
            emailInput.classList.add('valid');
        }
    });
}

// Validation du message
if (messageInput) {
    messageInput.addEventListener('blur', () => {
        if (messageInput.value.trim().length < 10) {
            messageInput.classList.add('error');
        } else {
            messageInput.classList.remove('error');
            messageInput.classList.add('valid');
        }
    });
}

// ==========================================
// Compteur de caractères pour le message
// ==========================================
if (messageInput) {
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    messageInput.parentElement.appendChild(charCounter);
    
    const updateCounter = () => {
        const length = messageInput.value.length;
        const minLength = 10;
        charCounter.textContent = `${length} caractères`;
        
        if (length < minLength) {
            charCounter.style.color = 'var(--text-muted)';
        } else {
            charCounter.style.color = 'var(--success)';
        }
    };
    
    messageInput.addEventListener('input', updateCounter);
    updateCounter();
}

// ==========================================
// Auto-resize du textarea
// ==========================================
if (messageInput) {
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}

// ==========================================
// Protection anti-spam (honeypot)
// ==========================================
// Ajouter un champ caché pour attraper les bots
const createHoneypot = () => {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    
    if (contactForm) {
        contactForm.appendChild(honeypot);
        
        // Vérifier le honeypot lors de la soumission
        contactForm.addEventListener('submit', (e) => {
            if (honeypot.value !== '') {
                e.preventDefault();
                console.warn('🚫 Spam détecté via honeypot');
                showMessage('Une erreur est survenue.', 'error');
            }
        });
    }
};

createHoneypot();

// ==========================================
// Limitation du taux de soumission
// ==========================================
let lastSubmitTime = 0;
const MIN_SUBMIT_INTERVAL = 5000; // 5 secondes entre chaque soumission

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const now = Date.now();
        
        if (now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
            e.preventDefault();
            showMessage('⏱️ Veuillez attendre quelques secondes avant de renvoyer le formulaire.', 'error');
            return;
        }
        
        lastSubmitTime = now;
    });
}