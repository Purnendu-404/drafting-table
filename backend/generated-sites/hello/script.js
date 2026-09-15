// DOM Elements
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const continueShopping = document.getElementById('continue-shopping');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const drawerCount = document.getElementById('drawer-count');
const cartSubtotalPrice = document.getElementById('cart-subtotal-price');

const quickViewModal = document.getElementById('quick-view-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModal = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalCat = document.getElementById('modal-cat');
const modalPrice = document.getElementById('modal-price');
const modalAddCart = document.getElementById('modal-add-cart');

const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const quickViews = document.querySelectorAll('.quick-view');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const wishlistBtns = document.querySelectorAll('.wishlist-btn');

const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
const newsletterForm = document.getElementById('newsletter-form');
const checkoutBtn = document.getElementById('checkout-btn');

// Cart State
let cart = [
    {
        id: 1,
        name: 'Ultraboost Light 2025',
        price: 159.00,
        img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80',
        quantity: 1
    },
    {
        id: 2,
        name: 'NMD_R1 Core Black',
        price: 140.00,
        img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
        quantity: 1
    }
];

let currentModalProduct = null;

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Cart Drawer Open/Close
function toggleCart() {
    cartDrawer.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    document.body.style.overflow = cartDrawer.classList.contains('open') ? 'hidden' : 'auto';
}

cartBtn.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);
continueShopping.addEventListener('click', toggleCart);

// Render Cart
function renderCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
                <i class="fa-solid fa-bag-shopping" style="font-size: 3rem; margin-bottom: 15px; color: var(--border-color);"></i>
                <p>Your shopping bag is empty.</p>
            </div>
        `;
        cartCount.textContent = '0';
        drawerCount.textContent = '0';
        cartSubtotalPrice.textContent = '$0.00';
        return;
    }

    let totalCount = 0;
    let subtotal = 0;

    cart.forEach((item, index) => {
        totalCount += item.quantity;
        subtotal += item.price * item.quantity;

        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        cartItemEl.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.img}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="qty-btn decrease-qty" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn increase-qty" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    cartCount.textContent = totalCount;
    drawerCount.textContent = totalCount;
    cartSubtotalPrice.textContent = `$${subtotal.toFixed(2)}`;

    // Attach quantity & remove listeners
    document.querySelectorAll('.increase-qty').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity++;
            renderCart();
        });
    });

    document.querySelectorAll('.decrease-qty').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            renderCart();
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.closest('button').getAttribute('data-index');
            cart.splice(index, 1);
            renderCart();
            showToast('Item removed from bag');
        });
    });
}

// Add to Cart function
function addToCart(name, price, img) {
    const existingIndex = cart.findIndex(item => item.name === name);
    if (existingIndex > -1) {
        cart[existingIndex].quantity++;
    } else {
        cart.push({
            id: Date.now(),
            name: name,
            price: parseFloat(price),
            img: img,
            quantity: 1
        });
    }
    renderCart();
    showToast(`Added "${name}" to your bag!`);
}

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const name = btn.getAttribute('data-name');
        const price = btn.getAttribute('data-price');
        const img = btn.getAttribute('data-img');
        addToCart(name, price, img);
    });
});

// Toast Notification
function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Quick View Modal
quickViews.forEach((qv, index) => {
    qv.addEventListener('click', () => {
        const card = qv.closest('.product-card');
        const name = card.querySelector('.product-title').textContent;
        const priceText = card.querySelector('.current-price').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        const img = card.querySelector('.product-image img').getAttribute('src');
        const category = card.querySelector('.product-category').textContent;

        modalImg.src = img;
        modalTitle.textContent = name;
        modalCat.textContent = category;
        modalPrice.textContent = priceText;

        currentModalProduct = { name, price, img };

        quickViewModal.classList.add('open');
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeModalFunc() {
    quickViewModal.classList.remove('open');
    modalOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeModalFunc);
modalOverlay.addEventListener('click', closeModalFunc);

// Size selector click
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Add to cart from Modal
modalAddCart.addEventListener('click', () => {
    if (currentModalProduct) {
        addToCart(currentModalProduct.name, currentModalProduct.price, currentModalProduct.img);
        closeModalFunc();
    }
});

// Filter Products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Wishlist toggle
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('active')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            showToast('Added to your wishlist!');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            showToast('Removed from wishlist');
        }
    });
});

// Newsletter Form Submit
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    if (email) {
        showToast('Successfully subscribed! Check your inbox for 15% off.');
        newsletterForm.reset();
    }
});

// Checkout Simulation
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Your bag is empty!');
        return;
    }
    showToast('Redirecting to secure checkout...');
    setTimeout(() => {
        cart = [];
        renderCart();
        toggleCart();
        showToast('Order placed successfully! Thank you for shopping with Adidas.');
    }, 2000);
});

// Initial Cart Render
renderCart();
