// Service expansion functionality
function toggleService(serviceId) {
    console.log('toggleService called with:', serviceId);
    
    const serviceCard = document.querySelector(`[data-service="${serviceId}"]`);
    if (!serviceCard) {
        console.error('Service card not found for:', serviceId);
        return;
    }
    
    const isExpanded = serviceCard.classList.contains('expanded');
    console.log('Service is expanded:', isExpanded);
    
    // If the clicked service is already expanded, collapse it
    if (isExpanded) {
        serviceCard.classList.remove('expanded');
        console.log('Service collapsed:', serviceId);
    } else {
        // Close all other services first
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.remove('expanded');
        });
        
        // Expand the clicked service
        serviceCard.classList.add('expanded');
        console.log('Service expanded:', serviceId);
    }
}

// Initialize service cards when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing service cards...');
    
    // Add event listeners for service cards
    const serviceContents = document.querySelectorAll('.service-content');
    console.log('Found service contents:', serviceContents.length);
    
    serviceContents.forEach((content, index) => {
        content.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const serviceCard = this.closest('.service-card');
            const serviceId = serviceCard.getAttribute('data-service');
            console.log(`Service content ${index} clicked:`, serviceId);
            
            toggleService(serviceId);
        });
        
        // Add visual feedback that it's clickable
        content.style.cursor = 'pointer';
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight + 70;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#000000';
        header.style.backdropFilter = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !service || !message) {
            showNotification('Por favor completa todos los campos requeridos.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor ingresa un email válido.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Enviando consulta...', 'info');
        
        // Here you would typically send the data to your server
        // For now, we'll simulate a successful submission
        setTimeout(() => {
            showNotification('¡Consulta enviada exitosamente! Te contactaremos pronto.', 'success');
            this.reset();
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.01)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonial cards hover effect
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.type === 'submit') return; // Don't animate form submit buttons
        
        // Add loading state
        const originalText = this.textContent;
        this.textContent = 'Cargando...';
        this.disabled = true;
        
        // Reset after animation
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 1000);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 30;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// WhatsApp form handling
document.addEventListener('DOMContentLoaded', function() {
    const whatsappForm = document.getElementById('whatsapp-form');
    
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !service || !message) {
                showMessage('Por favor completa todos los campos requeridos.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Por favor ingresa un email válido.', 'error');
                return;
            }
            
            // Create WhatsApp message
            let whatsappMessage = `*Nueva Consulta desde sitio web*%0A%0A`;
            whatsappMessage += `*Nombre:* ${name}%0A`;
            whatsappMessage += `*Email:* ${email}%0A`;
            if (phone) {
                whatsappMessage += `*Teléfono:* ${phone}%0A`;
            }
            whatsappMessage += `*Servicio:* ${service}%0A`;
            whatsappMessage += `*Mensaje:* ${message}`;
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/17547360059?text=${whatsappMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showMessage('¡Formulario enviado! Se abrirá WhatsApp con tu consulta.', 'success');
            
            // Reset form
            this.reset();
        });
    }
});

// Function to show messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Insert after form
    const form = document.querySelector('.form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-red) !important;
        font-weight: 600 !important;
    }
    .nav-link.active::after {
        display: none !important;
    }
    .header::after {
        display: none !important;
    }
    .navbar::after {
        display: none !important;
    }
    .nav-container::after {
        display: none !important;
    }
    .nav-link::after {
        display: none !important;
    }
`;
document.head.appendChild(style);
