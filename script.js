// Initialize Owl Carousel
$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        startPosition: 0,
        lazyLoad: true,
        smartSpeed: 500,
        dotsSpeed: 500,
        navSpeed: 500,
        onInitialized: function() {
            // Add ARIA labels for accessibility
            $('.owl-stage').attr('aria-live', 'polite');
        }
    });
});

// Add scroll spy for active navigation highlighting
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60; // Adjust for fixed navbar
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60, // Adjust for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Contact form with validation and better UX
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const formFields = contactForm.querySelectorAll('input, textarea');
    
    // Add input validation
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        formFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            }
        });

        if (isValid) {
            // Simulate form submission
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the form data to a backend server
            console.log('Form submitted:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            contactForm.parentNode.insertBefore(successMessage, contactForm);
            
            // Clear form
            this.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
}

// Add lazy loading for portfolio images
const portfolioImages = document.querySelectorAll('.portfolio-item img');
portfolioImages.forEach(img => {
    img.src = img.dataset.src;
});

// Add ARIA labels for better accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.position = 'absolute';
    skipLink.style.left = '-9999px';
    skipLink.addEventListener('focus', () => {
        skipLink.style.left = '0';
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.left = '-9999px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA labels to navigation
    const nav = document.querySelector('nav');
    if (nav) {
        nav.setAttribute('aria-label', 'Main navigation');
    }
});

// Add loading state for better UX
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
