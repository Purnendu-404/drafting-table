document.addEventListener('DOMContentLoaded', () => {

    /* Top Banner Close */
    const topBanner = document.querySelector('.top-banner');
    const closeBannerBtn = document.getElementById('close-banner');
    if (closeBannerBtn && topBanner) {
        closeBannerBtn.addEventListener('click', () => {
            topBanner.style.display = 'none';
        });
    }

    /* Sticky Header Scrolled State */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* Mobile Navigation Toggle */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });

        // Close menu when clicking nav links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    /* Search Modal Overlay */
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');

    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 150);
        });

        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });

        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });

        // Suggestion tags in search
        document.querySelectorAll('.suggestion-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                searchInput.value = tag.textContent;
                searchInput.focus();
            });
        });
    }

    /* Shopping Cart Sidebar */
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const closeCart = document.getElementById('close-cart');

    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartBackdrop.classList.toggle('active');
    }

    if (cartToggle && cartSidebar && cartBackdrop) {
        cartToggle.addEventListener('click', toggleCart);
        closeCart.addEventListener('click', toggleCart);
        cartBackdrop.addEventListener('click', toggleCart);
    }

    /* Interactive Menu Filtering */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            menuCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    /* Toast Notification System */
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');

    function showToast(title, desc) {
        toastTitle.textContent = title;
        toastDesc.textContent = desc;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    /* Add to Cart Simulation */
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountBadge = document.querySelector('.cart-badge');
    const cartHeaderCount = document.getElementById('cart-count');
    const subtotalPriceEl = document.querySelector('.subtotal-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cartData = [
        { name: 'Iced Vanilla Bean Latte', price: 6.50, qty: 1, option: 'Oat Milk • Regular', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=200' },
        { name: 'Artisanal Butter Croissant', price: 4.25, qty: 1, option: 'Warmed', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=200' }
    ];

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let totalItems = 0;
        let subtotal = 0;

        if (cartData.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; color: #64748B; padding: 2rem 0;">Your Lab cart is currently empty.</p>';
        } else {
            cartData.forEach((item, index) => {
                totalItems += item.qty;
                subtotal += item.price * item.qty;

                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <span class="item-option">${item.option || 'Standard'}</span>
                        <div class="item-price-qty">
                            <span class="price">$${(item.price * item.qty).toFixed(2)}</span>
                            <div class="qty-control">
                                <button class="minus-qty" data-index="${index}">-</button>
                                <span>${item.qty}</span>
                                <button class="plus-qty" data-index="${index}">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        cartCountBadge.textContent = totalItems;
        cartHeaderCount.textContent = totalItems;
        subtotalPriceEl.textContent = `$${subtotal.toFixed(2)}`;
        checkoutBtn.textContent = `Proceed to Checkout ($${subtotal.toFixed(2)})`;

        // Bind dynamic cart events
        document.querySelectorAll('.minus-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                if (cartData[idx].qty > 1) {
                    cartData[idx].qty -= 1;
                } else {
                    cartData.splice(idx, 1);
                }
                updateCartUI();
            });
        });

        document.querySelectorAll('.plus-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                cartData[idx].qty += 1;
                updateCartUI();
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.currentTarget.getAttribute('data-index');
                cartData.splice(idx, 1);
                updateCartUI();
                showToast('Item removed', 'Item was removed from your cart.');
            });
        });
    }

    // Initialize Cart UI
    updateCartUI();

    // Add Menu item buttons
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            const img = btn.getAttribute('data-img');

            // Check if already in cart
            const existing = cartData.find(item => item.name === name);
            if (existing) {
                existing.qty += 1;
            } else {
                cartData.push({ name, price, qty: 1, option: 'Freshly Prepared', img });
            }

            updateCartUI();
            showToast('Added to Lab Order!', `${name} added to your cart.`);
        });
    });

    // Whole Bean Add buttons
    document.querySelectorAll('.bean-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.bean-card');
            const name = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.price').textContent.split('/')[0].replace('$', '').trim();
            const price = parseFloat(priceText);
            const img = card.querySelector('img').src;

            const existing = cartData.find(item => item.name === name);
            if (existing) {
                existing.qty += 1;
            } else {
                cartData.push({ name: `${name} (Whole Bean)`, price, qty: 1, option: 'Whole Bean • 12 oz Bag', img });
            }

            updateCartUI();
            showToast('Added Whole Beans!', `${name} added to your bag.`);
        });
    });

    // Checkout button action
    checkoutBtn.addEventListener('click', () => {
        if (cartData.length === 0) {
            alert('Your cart is empty. Add some delicious coffee first!');
            return;
        }
        alert('Thank you for your order! Redirecting to secure BrewLab checkout gateway...');
        cartData = [];
        updateCartUI();
        toggleCart();
    });

    /* Newsletter Form Handling */
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterInput = document.getElementById('newsletter-input');
    const newsletterMsg = document.getElementById('newsletter-msg');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            if (email) {
                newsletterMsg.textContent = '🎉 Success! Check your inbox for your 15% discount code.';
                newsletterInput.value = '';
                setTimeout(() => {
                    newsletterMsg.textContent = '';
                }, 5000);
            }
        });
    }

    /* Smooth Scroll Active Navigation Highlight */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});
