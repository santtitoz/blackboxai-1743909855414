// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('button.md\\:hidden');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu fixed w-full bg-black text-white py-4 px-6 hidden md:hidden';
    mobileMenu.style.top = '72px'; // Height of header
    mobileMenu.innerHTML = `
        <nav class="flex flex-col space-y-4">
            <a href="/" class="hover:text-yellow-500 transition py-2">Início</a>
            <a href="/pages/portfolio.html" class="hover:text-yellow-500 transition py-2">Portfólio</a>
            <a href="/pages/appointment.html" class="hover:text-yellow-500 transition py-2">Agendamento</a>
            <a href="/#contact" class="hover:text-yellow-500 transition py-2">Contato</a>
        </nav>
    `;
    
    document.body.appendChild(mobileMenu);

    let isMenuOpen = false;

    mobileMenuButton.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden', !isMenuOpen);
        
        // Update icon
        const icon = mobileMenuButton.querySelector('i');
        icon.className = isMenuOpen ? 'fas fa-times text-2xl' : 'fas fa-bars text-2xl';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').className = 'fas fa-bars text-2xl';
        }
    });

    // Close menu when scrolling
    window.addEventListener('scroll', function() {
        if (isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').className = 'fas fa-bars text-2xl';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check for elements in view
});

// Form validation helper
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (!input.value.trim()) {
            if (errorElement) {
                errorElement.classList.remove('hidden');
            }
            isValid = false;
        } else {
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        }

        // Special validation for email
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                if (errorElement) {
                    errorElement.classList.remove('hidden');
                }
                isValid = false;
            }
        }

        // Special validation for phone
        if (input.type === 'tel') {
            const phoneRegex = /^\d{10,11}$/;
            if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
                if (errorElement) {
                    errorElement.classList.remove('hidden');
                }
                isValid = false;
            }
        }
    });

    return isValid;
}

// Add loading state to buttons
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        const originalText = button.innerHTML;
        button.setAttribute('data-original-text', originalText);
        button.innerHTML = `
            <i class="fas fa-spinner fa-spin mr-2"></i>
            Processando...
        `;
        button.disabled = true;
    } else {
        const originalText = button.getAttribute('data-original-text');
        if (originalText) {
            button.innerHTML = originalText;
        }
        button.disabled = false;
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } transition-opacity duration-300 opacity-0`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Fade in
    setTimeout(() => {
        toast.classList.remove('opacity-0');
    }, 100);
    
    // Fade out and remove
    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}