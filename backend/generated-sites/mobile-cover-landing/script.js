/* ==========================================
   ArmorShield Pro - JavaScript Functionality
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Flash Sale Countdown Timer
    function startCountdown() {
        let time = 5 * 3600 + 42 * 60 + 19; // 5 hours 42 mins 19 secs
        const timerEl = document.getElementById('countdown-timer');

        setInterval(() => {
            if (time <= 0) return;
            time--;
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = time % 60;

            timerEl.textContent = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
        }, 1000);
    }
    startCountdown();

    // Live Clock in Hero Phone
    function updateLiveClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const clockEl = document.getElementById('live-clock');
        if (clockEl) {
            clockEl.textContent = `${hours}:${minutes}`;
        }
    }
    updateLiveClock();
    setInterval(updateLiveClock, 30000);

    // Mobile Drawer Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
        });
        drawerClose.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
        document.querySelectorAll('.drawer-link').forEach(link => {
            link.addEventListener('click', () => mobileDrawer.classList.remove('open'));
        });
    }

    // ==========================================
    // Interactive 3D/Color Customizer Studio
    // ==========================================
    const seriesBtns = document.querySelectorAll('.series-btn');
    const colorBtns = document.querySelectorAll('.color-btn');
    const selectedColorLabel = document.getElementById('selected-color-label').querySelector('strong');
    const livePriceEl = document.getElementById('live-price');
    const previewCase = document.getElementById('preview-case');
    const caseFrameHero = document.getElementById('case-frame-hero');
    const phoneWallpaper = document.getElementById('phone-wallpaper');
    
    // Checkboxes
    const addGlass = document.getElementById('add-glass');
    const addStrap = document.getElementById('add-strap');

    let state = {
        seriesPrice: 49.99,
        seriesName: 'Armor Pro',
        colorBg: '#1a1a1a',
        colorName: 'Midnight Black',
        glassPrice: 0,
        strapPrice: 0
    };

    function calculatePrice() {
        let total = state.seriesPrice + state.glassPrice + state.strapPrice;
        livePriceEl.textContent = `$${total.toFixed(2)}`;
    }

    // Series Selection
    seriesBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            seriesBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.seriesPrice = parseFloat(btn.dataset.price);
            state.seriesName = btn.querySelector('.s-name').textContent;
            calculatePrice();
        });
    });

    // Color Selection
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.colorBg = btn.dataset.bg;
            state.colorName = btn.dataset.name;
            selectedColorLabel.textContent = state.colorName;

            // Apply background to preview case & hero case
            previewCase.style.background = state.colorBg;
            if (caseFrameHero) {
                caseFrameHero.style.background = state.colorBg;
            }
        });
    });

    // Addon checkboxes
    if (addGlass) {
        addGlass.addEventListener('change', (e) => {
            state.glassPrice = e.target.checked ? 14.99 : 0;
            calculatePrice();
        });
    }

    if (addStrap) {
        addStrap.addEventListener('change', (e) => {
            state.strapPrice = e.target.checked ? 9.99 : 0;
            calculatePrice();
        });
    }

    // ==========================================
    // Shopping Cart System
    // ==========================================
    let cart = [];
    const cartBtn = document.getElementById('cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCount = document.getElementById('cart-count');
    const drawerCartCount = document.getElementById('drawer-cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartState = document.getElementById('empty-cart-state');
    const cartFooter = document.getElementById('cart-footer');
    const cartSubtotalPrice = document.getElementById('cart-subtotal-price');
    const addToCartCustom = document.getElementById('add-to-cart-custom');

    function openCart() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
    }

    function closeCart() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    }

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        drawerCartCount.textContent = totalItems;

        if (cart.length === 0) {
            emptyCartState.style.display = 'block';
            cartFooter.style.display = 'none';
            // Remove previous items
            document.querySelectorAll('.cart-item').forEach(el => el.remove());
        } else {
            emptyCartState.style.display = 'none';
            cartFooter.style.display = 'block';

            // Clear existing items in DOM before re-rendering
            document.querySelectorAll('.cart-item').forEach(el => el.remove());

            let subtotal = 0;

            cart.forEach((item, index) => {
                subtotal += item.price * item.quantity;
                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                itemEl.innerHTML = `
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.details || ''}</p>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <button class="cart-item-remove" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });

            cartSubtotalPrice.textContent = `$${subtotal.toFixed(2)}`;

            // Attach remove listeners
            document.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.currentTarget.dataset.index;
                    cart.splice(idx, 1);
                    updateCartUI();
                });
            });
        }
    }

    // Add custom case to cart
    if (addToCartCustom) {
        addToCartCustom.addEventListener('click', () => {
            const deviceSelect = document.getElementById('device-select');
            const deviceName = deviceSelect.options[deviceSelect.selectedIndex].text;
            let totalPrice = state.seriesPrice + state.glassPrice + state.strapPrice;
            
            let customName = `${state.seriesName} (${state.colorName})`;
            let details = `${deviceName}${state.glassPrice ? ' + Screen Protector' : ''}${state.strapPrice ? ' + Lanyard' : ''}`;

            cart.push({
                name: customName,
                details: details,
                price: totalPrice,
                quantity: 1
            });

            updateCartUI();
            openCart();
        });
    }

    // Quick add to cart buttons
    document.querySelectorAll('.add-to-cart-quick').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.currentTarget.dataset.name;
            const price = parseFloat(e.currentTarget.dataset.price);

            cart.push({
                name: name,
                details: 'In Stock - Ready to Ship',
                price: price,
                quantity: 1
            });

            updateCartUI();
            openCart();
        });
    });

    // Checkout button action
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('🎉 Secure Checkout Simulator:\nThank you for trying ArmorShield Pro! Orders placed here are simulated successfully.');
            cart = [];
            updateCartUI();
            closeCart();
        });
    }

    // ==========================================
    // FAQ Accordion
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Open clicked if wasn't open
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ==========================================
    // Video Modal Popup
    // ==========================================
    const playVideoBtn = document.getElementById('play-video-btn');
    const videoModal = document.getElementById('video-modal');
    const modalClose = document.getElementById('modal-close');
    const youtubeIframe = document.getElementById('youtube-iframe');

    if (playVideoBtn && videoModal) {
        playVideoBtn.addEventListener('click', () => {
            videoModal.classList.add('open');
            youtubeIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; // placeholder video
        });

        modalClose.addEventListener('click', () => {
            videoModal.classList.remove('open');
            youtubeIframe.src = "";
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('open');
                youtubeIframe.src = "";
            }
        });
    }

    // Newsletter form submit
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing! Your 15% discount code has been sent to your email.');
            newsletterForm.reset();
        });
    }
});
