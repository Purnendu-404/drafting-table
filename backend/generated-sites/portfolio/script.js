// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile Navigation Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    }
});

// Close mobile menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Navbar background shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        navbar.classList.add('shadow-xl', 'bg-darkBg/90');
    } else {
        navbar.classList.remove('shadow-xl', 'bg-darkBg/90');
    }
});

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => {
            b.classList.remove('bg-indigo-600', 'text-white');
            b.classList.add('bg-gray-900', 'text-gray-300');
        });
        
        // Add active class to clicked button
        btn.classList.remove('bg-gray-900', 'text-gray-300');
        btn.classList.add('bg-indigo-600', 'text-white');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'flex';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact Form Submission Simulation
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending Message...';
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Restore button
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');

        // Show success message
        formSuccess.classList.remove('hidden');
        
        // Hide success message after 6 seconds
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 6000);
    }, 1200);
});

// Download CV Simulation Notification
const downloadCvBtn = document.getElementById('download-cv');
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Resume (Alex_Morgan_Resume.pdf) download started successfully!');
    });
}
