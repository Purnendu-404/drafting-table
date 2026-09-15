/* ==========================================
   ADIDAS MODERN LANDING PAGE JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Product Data ---
    const products = [
        {
            id: 1,
            title: "Ultraboost Light 25",
            category: "running",
            price: 190.00,
            oldPrice: 210.00,
            badge: "New Drop",
            image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=700&q=80",
            description: "Experience epic energy with our lightest Ultraboost ever. Featuring Light Boost midsole technology for maximum cushioning and responsiveness."
        },
        {
            id: 2,
            title: "Stan Smith Lux",
            category: "originals",
            price: 130.00,
            oldPrice: null,
            badge: "Iconic",
            image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80",
            description: "A tennis legend refined for daily luxury. Premium supple leather upper with subtle gold foil branding and classic rubber cupsole."
        },
        {
            id: 3,
            title: "Superstar Classic",
            category: "originals",
            price: 100.00,
            oldPrice: 110.00,
            badge: "Sale",
            image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=80",
            description: "The iconic shell-toe sneaker that shaped hip-hop and streetwear culture since 1970. Smooth leather upper with signature serrated 3-Stripes."
        },
        {
            id: 4,
            title: "Predator Elite FG",
            category: "football",
            price: 260.00,
            oldPrice: null,
            badge: "Pro Choice",
            image: "https://images.unsplash.com/photo-1511886929837-354d277aae56?auto=format&fit=crop&w=700&q=80",
            description: "Built for goals. High-definition rubber grip elements and Controlframe 2.0 outsole deliver pinpoint precision and ferocious traction on firm ground."
        },
        {
            id: 5,
            title: "NMD_R1 V3",
            category: "originals",
            price: 150.00,
            oldPrice: 160.00,
            badge: "Trending",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=80",
            description: "Progressive runner-inspired streetwear with energy-returning Boost cushioning and futuristic translucent plug overlays."
        },
        {
            id: 6,
            title: "Adizero Adios Pro 3",
            category: "running",
            price: 250.00,
            oldPrice: null,
            badge: "Marathon",
            image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80",
            description: "Designed for breaking personal bests. Carbon-infused ENERGYRODS deliver stiff, snappy propulsion from start line to finish ribbon."
        },
        {
            id: 7,
            title: "Forum 84 Low",
            category: "originals",
            price: 115.00,
            oldPrice: null,
            badge: "Retro",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80",
            description: "Hoops heritage turned street staple. Adjustable ankle strap, premium leather, and unmistakable vintage basketball DNA."
        },
        {
            id: 8,
            title: "X Crazyfast.1",
            category: "football",
            price: 240.00,
            oldPrice: 270.00,
            badge: "Sale",
            image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=700&q=80",
            description: "Unlock otherworldly speed. Aeropacity Speedskin single-layer upper reinforced for lightning-fast multidirectional acceleration."
        }
    ];

    // --- State Management ---
    let cart = [];
    let wishlistCount = 3;

    // --- Hero Slider ---
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-slider-dots .dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    slideInterval = setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    // --- Render Products ---
    const productGrid = document.getElementById('product-grid');

    function renderProducts(filter = 'all') {
        productGrid.innerHTML = '';
        const filtered = filter === 'all' 
            ? products 
            : products.filter(p => p.category === filter);

        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                ${product.badge ? `<span class="product-badge ${product.badge === 'Sale' ? 'sale' : ''}">${product.badge}</span>` : ''}
                <button class="wishlist-btn" aria-label="Add to Wishlist"><i class="fa-regular fa-heart"></i></button>
                <div class="product-image-wrap" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category.toUpperCase()}</span>
                    <h3 class="product-title" data-id="${product.id}">${product.title}</h3>
                    <div class="product-footer">
                        <div class="product-price">
                            ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                            $${product.price.toFixed(2)}
                        </div>
                        <button class="quick-add-btn" data-id="${product.id}">+ ADD</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });

        attachProductListeners();
    }

    // Filter Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.getAttribute('data-filter'));
        });
    });

    renderProducts();

    // --- Product Modal & Quick View ---
    const modal = document.getElementById('product-modal');
    const closeModal = document.getElementById('close-modal');
    const modalDetails = document.getElementById('modal-details');

    function openProductModal(productId) {
        const product = products.find(p => p.id == productId);
        if(!product) return;

        modalDetails.innerHTML = `
            <div class="modal-img-wrap">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="modal-details-content">
                <span class="product-category">${product.category.toUpperCase()}</span>
                <h3>${product.title}</h3>
                <div class="modal-price">$${product.price.toFixed(2)}</div>
                <p style="color: #666; font-size: 14px; margin-bottom: 20px;">${product.description}</p>
                <div class="size-selector">
                    <label>Select Size (US)</label>
                    <div class="size-grid">
                        <div class="size-btn">7.5</div>
                        <div class="size-btn active">8.0</div>
                        <div class="size-btn">8.5</div>
                        <div class="size-btn">9.0</div>
                        <div class="size-btn">9.5</div>
                        <div class="size-btn">10.0</div>
                        <div class="size-btn">10.5</div>
                        <div class="size-btn">11.0</div>
                    </div>
                </div>
                <button class="btn btn-primary" id="modal-add-btn" data-id="${product.id}" style="width: 100%;">ADD TO BAG</button>
            </div>
        `;
        modal.classList.add('open');

        // Size selector logic in modal
        const sizeBtns = modalDetails.querySelectorAll('.size-btn');
        sizeBtns.forEach(sb => {
            sb.addEventListener('click', () => {
                sizeBtns.forEach(s => s.classList.remove('active'));
                sb.classList.add('active');
            });
        });

        // Add to bag from modal
        document.getElementById('modal-add-btn').addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const activeSize = modalDetails.querySelector('.size-btn.active').textContent;
            addToCart(id, activeSize);
            modal.classList.remove('open');
        });
    }

    closeModal.addEventListener('click', () => modal.classList.remove('open'));
    window.addEventListener('click', (e) => {
        if(e.target === modal) modal.classList.remove('open');
    });

    function attachProductListeners() {
        // Quick add button
        document.querySelectorAll('.quick-add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                addToCart(id, '9.0');
            });
        });

        // Image / Title click for Quick View
        document.querySelectorAll('.product-image-wrap, .product-title').forEach(el => {
            el.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                openProductModal(id);
            });
        });

        // Wishlist button toggle
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const icon = btn.querySelector('i');
                btn.classList.toggle('active');
                if(btn.classList.contains('active')) {
                    icon.classList.remove('fa-regular');
                    icon.classList.add('fa-solid');
                    showToast('Added to your wishlist!');
                } else {
                    icon.classList.remove('fa-solid');
                    icon.classList.add('fa-regular');
                    showToast('Removed from your wishlist.');
                }
            });
        });
    }

    // --- Cart Management & Drawer ---
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartDrawerCount = document.getElementById('cart-drawer-count');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const emptyCartState = document.getElementById('empty-cart');

    function toggleCart(open) {
        if(open) {
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('open');
        } else {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('open');
        }
    }

    cartBtn.addEventListener('click', () => toggleCart(true));
    closeCart.addEventListener('click', () => toggleCart(false));
    cartOverlay.addEventListener('click', () => toggleCart(false));

    function addToCart(productId, size = '9.0', customDetails = null) {
        let product;
        if(customDetails) {
            product = customDetails;
        } else {
            const found = products.find(p => p.id == productId);
            if(!found) return;
            product = {
                id: found.id + '-' + size,
                title: found.title,
                price: found.price,
                image: found.image,
                size: size
            };
        }

        const existingIndex = cart.findIndex(item => item.id === product.id && item.size === product.size);
        if(existingIndex > -1) {
            cart[existingIndex].quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        updateCartUI();
        toggleCart(true);
        showToast('Successfully added to your bag!');
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartDrawerCount.textContent = totalItems;

        if(cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart" id="empty-cart">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <p>Your bag is currently empty.</p>
                    <a href="#shop" class="btn btn-primary" onclick="document.getElementById('cart-drawer').classList.remove('open'); document.getElementById('cart-overlay').classList.remove('open');">START SHOPPING</a>
                </div>
            `;
            cartFooter.style.display = 'none';
        } else {
            cartFooter.style.display = 'block';
            let html = '';
            let subtotal = 0;

            cart.forEach((item, index) => {
                subtotal += item.price * item.quantity;
                html += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.title}</div>
                            <div style="font-size: 12px; color: #776; margin-bottom: 4px;">Size: US ${item.size}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            <div class="cart-item-actions">
                                <div class="qty-control">
                                    <button class="qty-decrease" data-index="${index}">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="qty-increase" data-index="${index}">+</button>
                                </div>
                                <span class="remove-item" data-index="${index}">Remove</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            cartItemsContainer.innerHTML = html;
            cartTotalPrice.textContent = `$${subtotal.toFixed(2)}`;

            // Attach cart action listeners
            document.querySelectorAll('.qty-decrease').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    if(cart[idx].quantity > 1) {
                        cart[idx].quantity -= 1;
                    } else {
                        cart.splice(idx, 1);
                    }
                    updateCartUI();
                });
            });

            document.querySelectorAll('.qty-increase').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart[idx].quantity += 1;
                    updateCartUI();
                });
            });

            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart.splice(idx, 1);
                    updateCartUI();
                });
            });
        }
    }

    // Checkout simulate
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Redirecting to secure adidas checkout gateway...');
        cart = [];
        updateCartUI();
        toggleCart(false);
    });

    // --- 3D / Colorway Customizer Logic ---
    const colorBtns = document.querySelectorAll('.color-btn');
    const selectedSpecName = document.getElementById('selected-spec-name');
    let customConfig = {
        upperColor: '#ffffff',
        upperName: 'Cloud White',
        heelColor: '#111111',
        heelName: 'Core Black'
    };

    colorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetGroup = btn.parentElement.getAttribute('data-target');
            const color = btn.getAttribute('data-color');
            const name = btn.getAttribute('data-name');

            // Toggle active state in group
            btn.parentElement.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if(targetGroup === 'upper') {
                customConfig.upperColor = color;
                customConfig.upperName = name;
                document.getElementById('shoe-upper').setAttribute('fill', color);
                // Adjust stroke for white upper
                if(color === '#ffffff') {
                    document.getElementById('shoe-upper').setAttribute('stroke', '#ccc');
                } else {
                    document.getElementById('shoe-upper').setAttribute('stroke', '#000');
                }
            } else if(targetGroup === 'heel') {
                customConfig.heelColor = color;
                customConfig.heelName = name;
                document.getElementById('shoe-heel').setAttribute('fill', color);
            }

            selectedSpecName.textContent = `Stan Smith Custom (${customConfig.upperName} / ${customConfig.heelName})`;
        });
    });

    // Add custom shoe to cart
    document.getElementById('add-custom-to-cart').addEventListener('click', () => {
        const customProduct = {
            id: 'custom-' + Date.now(),
            title: `Stan Smith Custom (${customConfig.upperName} Edition)`,
            price: 130.00,
            image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80',
            size: '9.0'
        };
        addToCart(null, '9.0', customProduct);
    });

    // --- Newsletter Form Submission ---
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMsg = document.getElementById('newsletter-msg');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        if(email) {
            newsletterMsg.textContent = '🎉 Thank you! Check your inbox for your 15% off voucher code.';
            newsletterForm.reset();
            setTimeout(() => {
                newsletterMsg.textContent = '';
            }, 6000);
        }
    });

    // --- Mobile Drawer Navigation ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const closeDrawer = document.getElementById('close-drawer');

    mobileMenuBtn.addEventListener('click', () => mobileDrawer.classList.add('open'));
    closeDrawer.addEventListener('click', () => mobileDrawer.classList.remove('open'));

    // Close mobile drawer when link clicked
    document.querySelectorAll('.drawer-links a').forEach(link => {
        link.addEventListener('click', () => mobileDrawer.classList.remove('open'));
    });

    // --- Toast Notification Helper ---
    function showToast(message) {
        let existingToast = document.querySelector('.toast');
        if(existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }
});
