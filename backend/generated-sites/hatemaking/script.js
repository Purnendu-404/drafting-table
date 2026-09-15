/* ==========================================
   HATE MAKING - CUSTOM HEADWEAR STUDIO
   JAVASCRIPT INTERACTIVITY
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------
       MOBILE NAVIGATION TOGGLE
       ------------------------------------------ */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    /* ------------------------------------------
       CUSTOMIZER STATE & LOGIC
       ------------------------------------------ */
    const state = {
        style: 'fedora',
        styleName: 'Classic Fedora',
        crease: 'teardrop',
        material: 'Fur Felt',
        materialPrice: 180,
        color: '#2c2421',
        colorName: 'Midnight Black',
        bandColor: '#111111',
        bandName: 'Black Grosgrain',
        accessory: 'feather',
        size: '59 cm (L)',
        engraving: '',
        basePrice: 180
    };

    // DOM Elements for Customizer
    const hatCrownColor = document.getElementById('hatCrownColor');
    const hatBrimColor = document.getElementById('hatBrimColor');
    const hatBandColor = document.getElementById('hatBandColor');
    const hatBandAccessory = document.getElementById('hatBandAccessory');
    const hatCrease = document.getElementById('hatCrease');
    const previewStyleName = document.getElementById('previewStyleName');
    const totalPriceEl = document.getElementById('totalPrice');
    const currentColorNameEl = document.getElementById('currentColorName');
    const selectedSizeLabelEl = document.getElementById('selectedSizeLabel');
    const engravingInput = document.getElementById('engravingText');

    // Tab Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });

    // 1. Style Cards Selection
    const styleCards = document.querySelectorAll('.style-grid .option-card');
    styleCards.forEach(card => {
        card.addEventListener('click', () => {
            styleCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const radio = card.querySelector('input');
            radio.checked = true;

            state.style = card.getAttribute('data-style');
            state.styleName = card.getAttribute('data-name');
            previewStyleName.textContent = state.styleName;
            updateHatGraphic();
        });
    });

    // 2. Crease Chips Selection
    const creaseChips = document.querySelectorAll('.crease-grid .chip');
    creaseChips.forEach(chip => {
        chip.addEventListener('click', () => {
            creaseChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            chip.querySelector('input').checked = true;

            state.crease = chip.getAttribute('data-crease');
            updateHatCrease();
        });
    });

    // 3. Material Selection
    const materialCards = document.querySelectorAll('.material-grid .option-card');
    materialCards.forEach(card => {
        card.addEventListener('click', () => {
            materialCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            card.querySelector('input').checked = true;

            state.material = card.getAttribute('data-material');
            state.materialPrice = parseInt(card.getAttribute('data-price'));
            updatePrice();
        });
    });

    // 4. Color Picker Selection
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            state.color = btn.getAttribute('data-color');
            state.colorName = btn.getAttribute('data-name');
            currentColorNameEl.textContent = state.colorName;

            hatCrownColor.style.backgroundColor = state.color;
            hatBrimColor.style.backgroundColor = state.color;
        });
    });

    // 5. Band Color Selection
    const bandBtns = document.querySelectorAll('.band-btn');
    bandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bandBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            state.bandColor = btn.getAttribute('data-band');
            state.bandName = btn.getAttribute('data-name');

            if (state.bandColor === 'none') {
                hatBandColor.style.display = 'none';
            } else {
                hatBandColor.style.display = 'block';
                hatBandColor.style.backgroundColor = state.bandColor;
            }
        });
    });

    // 6. Accessory Selection
    const accessoryChips = document.querySelectorAll('.accessory-grid .chip');
    accessoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            accessoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            chip.querySelector('input').checked = true;

            state.accessory = chip.getAttribute('data-accessory');
            updateAccessoryGraphic();
        });
    });

    // 7. Size Selection
    const sizeChips = document.querySelectorAll('.size-grid .chip');
    sizeChips.forEach(chip => {
        chip.addEventListener('click', () => {
            sizeChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            chip.querySelector('input').checked = true;

            state.size = chip.getAttribute('data-size');
            selectedSizeLabelEl.textContent = state.size;
        });
    });

    // Engraving Input
    if (engravingInput) {
        engravingInput.addEventListener('input', (e) => {
            state.engraving = e.target.value;
        });
    }

    // Update Hat Graphic based on Style
    function updateHatGraphic() {
        const hatGraphic = document.getElementById('hatGraphic');
        const crown = hatCrownColor;
        const brim = hatBrimColor;

        if (state.style === 'fedora') {
            crown.style.borderRadius = '90px 90px 40px 40px';
            brim.style.width = '280px';
            brim.style.height = '45px';
            brim.style.borderRadius = '50%';
            hatCrease.style.display = 'block';
        } else if (state.style === 'panama') {
            crown.style.borderRadius = '80px 80px 50px 50px';
            brim.style.width = '300px';
            brim.style.height = '40px';
            brim.style.borderRadius = '50%';
            hatCrease.style.display = 'block';
        } else if (state.style === 'boater') {
            crown.style.borderRadius = '20px 20px 10px 10px';
            brim.style.width = '290px';
            brim.style.height = '30px';
            brim.style.borderRadius = '20px';
            hatCrease.style.display = 'none';
        } else if (state.style === 'bucket') {
            crown.style.borderRadius = '70px 70px 60px 60px';
            brim.style.width = '250px';
            brim.style.height = '50px';
            brim.style.borderRadius = '60%';
            brim.style.transform = 'rotateX(20deg)';
            hatCrease.style.display = 'none';
        }
    }

    // Update Crease
    function updateHatCrease() {
        if (state.crease === 'teardrop') {
            hatCrease.style.width = '60px';
            hatCrease.style.height = '35px';
            hatCrease.style.borderRadius = '50%';
            hatCrease.style.opacity = '1';
        } else if (state.crease === 'center-dent') {
            hatCrease.style.width = '25px';
            hatCrease.style.height = '50px';
            hatCrease.style.borderRadius = '10px';
            hatCrease.style.opacity = '1';
        } else if (state.crease === 'diamond') {
            hatCrease.style.width = '55px';
            hatCrease.style.height = '45px';
            hatCrease.style.borderRadius = '20px';
            hatCrease.style.opacity = '1';
        } else if (state.crease === 'open') {
            hatCrease.style.opacity = '0';
        }
    }

    // Update Accessory Graphic
    function updateAccessoryGraphic() {
        if (state.accessory === 'feather') {
            hatBandAccessory.style.display = 'block';
            hatBandAccessory.style.background = 'var(--accent)';
            hatBandAccessory.style.borderRadius = '2px';
        } else if (state.accessory === 'pin') {
            hatBandAccessory.style.display = 'block';
            hatBandAccessory.style.background = '#e74c3c';
            hatBandAccessory.style.borderRadius = '50%';
        } else if (state.accessory === 'leather-strap') {
            hatBandAccessory.style.display = 'block';
            hatBandAccessory.style.background = '#8B4513';
            hatBandAccessory.style.borderRadius = '4px';
        } else {
            hatBandAccessory.style.display = 'none';
        }
    }

    // Update Price calculation
    function updatePrice() {
        state.basePrice = state.materialPrice;
        totalPriceEl.textContent = `$${state.basePrice}.00`;
    }

    // Reset Button
    document.getElementById('resetHatBtn').addEventListener('click', () => {
        styleCards[0].click();
        materialCards[0].click();
        colorBtns[0].click();
        bandBtns[0].click();
        accessoryChips[0].click();
        sizeChips[2].click();
        engravingInput.value = '';
        state.engraving = '';
        showToast('Hat design reset to default.');
    });

    // Randomize Button
    document.getElementById('randomizeBtn').addEventListener('click', () => {
        const randStyle = styleCards[Math.floor(Math.random() * styleCards.length)];
        const randMaterial = materialCards[Math.floor(Math.random() * materialCards.length)];
        const randColor = colorBtns[Math.floor(Math.random() * colorBtns.length)];
        const randBand = bandBtns[Math.floor(Math.random() * bandBtns.length)];

        randStyle.click();
        randMaterial.click();
        randColor.click();
        randBand.click();
        showToast('🎲 Generated a unique custom masterpiece!');
    });

    // 360 Spin Animation effect
    let isSpun = false;
    document.getElementById('view360Btn').addEventListener('click', () => {
        const graphic = document.getElementById('hatGraphic');
        isSpun = !isSpun;
        if (isSpun) {
            graphic.style.transform = 'rotateY(360deg) scale(1.05)';
            showToast('🔄 360° View Previewing');
            setTimeout(() => {
                graphic.style.transform = 'rotateY(0deg) scale(1)';
                isSpun = false;
            }, 1500);
        }
    });

    /* ------------------------------------------
       GALLERY FILTER & QUICK VIEW
       ------------------------------------------ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Quick View / Customize Similar buttons in gallery
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const title = btn.getAttribute('data-title');
            const price = btn.getAttribute('data-price');
            
            // Scroll to customizer
            document.getElementById('customizer').scrollIntoView({ behavior: 'smooth' });
            showToast(`Loaded "${title}" style into Studio!`);
        });
    });

    /* ------------------------------------------
       CART & CHECKOUT FUNCTIONALITY
       ------------------------------------------ */
    let cart = [];

    const cartBtn = document.getElementById('cartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartCountEl = document.getElementById('cartCount');
    const cartBody = document.getElementById('cartBody');
    const cartFooter = document.getElementById('cartFooter');
    const emptyCartMsg = document.getElementById('emptyCartMsg');
    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    function openCart() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
    }

    function closeCart() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    }

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Add Custom Hat to Cart
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const newItem = {
                id: Date.now(),
                title: `${state.styleName} (${state.material})`,
                details: `Color: ${state.colorName}, Band: ${state.bandName}, Size: ${state.size}${state.engraving ? ', Engraved: ' + state.engraving : ''}`,
                price: state.basePrice,
                colorHex: state.color
            };

            cart.push(newItem);
            updateCartUI();
            openCart();
            showToast('🎩 Custom hat added to your cart!');
        });
    }

    function updateCartUI() {
        cartCountEl.textContent = cart.length;

        if (cart.length === 0) {
            emptyCartMsg.style.display = 'block';
            cartFooter.style.display = 'none';
            // Remove previous items if any
            cartBody.querySelectorAll('.cart-item').forEach(el => el.remove());
        } else {
            emptyCartMsg.style.display = 'none';
            cartFooter.style.display = 'block';

            // Clear existing cart items before re-rendering
            cartBody.querySelectorAll('.cart-item').forEach(el => el.remove());

            let subtotal = 0;

            cart.forEach(item => {
                subtotal += item.price;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-preview" style="background-color: ${item.colorHex};">
                        <i class="fa-solid fa-hat-cowboy" style="color: #fff; font-size: 24px;"></i>
                    </div>
                    <div class="cart-item-info" style="flex-grow: 1;">
                        <h4>${item.title}</h4>
                        <p>${item.details}</p>
                        <span class="cart-item-price">$${item.price}.00</span>
                    </div>
                    <button class="remove-item" data-id="${item.id}"><i class="fa-solid fa-trash-can"></i></button>
                `;
                cartBody.appendChild(itemEl);
            });

            cartSubtotalEl.textContent = `$${subtotal}.00`;

            // Attach remove event listeners
            cartBody.querySelectorAll('.remove-item').forEach(delBtn => {
                delBtn.addEventListener('click', (e) => {
                    const id = parseInt(delBtn.getAttribute('data-id'));
                    cart = cart.filter(i => i.id !== id);
                    updateCartUI();
                    showToast('Item removed from cart.');
                });
            });
        }
    }

    // Checkout Simulation
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showToast('🎉 Order placed successfully! Thank you for choosing Hate Making.');
            cart = [];
            updateCartUI();
            closeCart();
        });
    }

    /* ------------------------------------------
       MODALS (Save Design & Size Guide)
       ------------------------------------------ */
    const saveDesignBtn = document.getElementById('saveDesignBtn');
    const designModal = document.getElementById('designModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const designLinkInput = document.getElementById('designLinkInput');

    if (saveDesignBtn && designModal) {
        saveDesignBtn.addEventListener('click', () => {
            designLinkInput.value = `https://hatemaking.com/studio?style=${state.style}&mat=${encodeURIComponent(state.material)}&col=${encodeURIComponent(state.colorName)}`;
            designModal.classList.add('open');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            designModal.classList.remove('open');
        });
    }

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            designLinkInput.select();
            navigator.clipboard.writeText(designLinkInput.value);
            copyLinkBtn.textContent = 'Copied!';
            setTimeout(() => copyLinkBtn.textContent = 'Copy Link', 2000);
            showToast('📋 Custom design link copied to clipboard!');
        });
    }

    // Size Guide Modal
    const sizeGuideBtn = document.getElementById('sizeGuideBtn');
    const sizeGuideModal = document.getElementById('sizeGuideModal');
    const closeSizeModalBtn = document.getElementById('closeSizeModalBtn');

    if (sizeGuideBtn && sizeGuideModal) {
        sizeGuideBtn.addEventListener('click', () => {
            sizeGuideModal.classList.add('open');
        });
    }

    if (closeSizeModalBtn) {
        closeSizeModalBtn.addEventListener('click', () => {
            sizeGuideModal.classList.remove('open');
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === designModal) designModal.classList.remove('open');
        if (e.target === sizeGuideModal) sizeGuideModal.classList.remove('open');
    });

    /* ------------------------------------------
       NEWSLETTER FORM SUBMISSION
       ------------------------------------------ */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.reset();
            showToast('✨ Welcome to The Hatter’s Circle! Check your inbox for your 20% code.');
        });
    }

    /* ------------------------------------------
       TOAST NOTIFICATION HELPER
       ------------------------------------------ */
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMsg');
        if (!toast || !toastMsg) return;

        toastMsg.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

});
