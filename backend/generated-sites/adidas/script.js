// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.className = 'fa-solid fa-bars';
    } else {
        icon.className = 'fa-solid fa-xmark';
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
    });
});

// Navbar blur on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 40) {
        navbar.classList.add('bg-[#07090e]/90', 'shadow-2xl', 'border-white/15');
    } else {
        navbar.classList.remove('bg-[#07090e]/90', 'shadow-2xl', 'border-white/15');
    }
});

// Phone Color Switcher
function changeColor(colorKey, colorTitle, wallpaperUrl, gradientClass) {
    const colorNameEl = document.getElementById('color-name');
    const wallpaperEl = document.getElementById('phone-wallpaper');
    const phoneContainer = document.getElementById('phone-container');
    const colorBtns = document.querySelectorAll('.color-btn');

    // Update text
    colorNameEl.textContent = colorTitle;

    // Update wallpaper background
    wallpaperEl.style.backgroundImage = `url('${wallpaperUrl}')`;

    // Update active button ring
    colorBtns.forEach(btn => {
        if (btn.getAttribute('data-color') === colorKey) {
            btn.classList.add('ring-2', 'ring-white', 'scale-110');
            btn.classList.remove('ring-1', 'ring-white/30');
        } else {
            btn.classList.remove('ring-2', 'ring-white', 'scale-110');
            btn.classList.add('ring-1', 'ring-white/30');
        }
    });

    // Add subtle animation effect to phone container
    phoneContainer.classList.add('scale-[1.02]');
    setTimeout(() => {
        phoneContainer.classList.remove('scale-[1.02]');
    }, 200);
}

// Order Form Submission Handler
function handleOrder(e) {
    e.preventDefault();
    const form = document.getElementById('order-form');
    const successMsg = document.getElementById('success-msg');

    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';

    setTimeout(() => {
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
    }, 600);
}
