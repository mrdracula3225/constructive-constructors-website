// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('button.md\\:hidden');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu fixed top-16 left-0 w-full bg-construction-blue text-white p-4';
    
    // Create mobile menu items
    const menuItems = [
        { href: '#home', text: 'Home' },
        { href: '#services', text: 'Services' },
        { href: '#about', text: 'About' },
        { href: '#projects', text: 'Projects' },
        { href: '#contact', text: 'Contact' }
    ];
    
    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;
        link.className = 'block py-2 hover:text-construction-accent transition';
        mobileMenu.appendChild(link);
    });
    
    document.body.appendChild(mobileMenu);
    
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const alertContainer = document.createElement('div');
    alertContainer.className = 'fixed top-4 right-4 z-50 max-w-md';
    document.body.appendChild(alertContainer);

    function showAlert(message, type = 'success') {
        const alert = document.createElement('div');
        alert.className = `p-4 mb-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
        }`;
        alert.innerHTML = `
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    ${type === 'success' 
                        ? '<svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>'
                        : '<svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>'
                    }
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium">${message}</p>
                </div>
                <div class="ml-auto pl-3">
                    <button class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <span class="sr-only">Close</span>
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        alertContainer.appendChild(alert);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alert.classList.add('opacity-0', 'transform', 'translate-x-full');
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        `;

        try {
            // Get form data
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                phone: contactForm.querySelector('#phone').value,
                message: contactForm.querySelector('#message').value
            };

            // Replace with your Google Apps Script Web App URL
            const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

            // Send data to Google Apps Script
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result.status === 'success') {
                showAlert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            showAlert(error.message || 'Failed to send message. Please try again later.', 'error');
        } finally {
            // Re-enable submit button and restore original text
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    });
}

// Navigation and Scroll Behavior
document.addEventListener('DOMContentLoaded', function() {
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('button.md\\:hidden');

    // Function to update active navigation link
    function updateActiveLink() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-construction-accent', 'border-b-2', 'border-construction-accent');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-construction-accent', 'border-b-2', 'border-construction-accent');
                    }
                });
            }
        });

        // Navbar background change on scroll
        if (scrollPosition > 50) {
            mainNav.classList.add('shadow-lg', 'bg-opacity-95');
        } else {
            mainNav.classList.remove('shadow-lg', 'bg-opacity-95');
        }
    }

    // Mobile menu toggle
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navHeight = mainNav.offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    // Initial call to set active link
    updateActiveLink();
}); 