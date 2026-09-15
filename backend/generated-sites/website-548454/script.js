// State Management
let cart = [];

// DOM Elements
const navbar = document.getElementById('navbar');
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const closeSearch = document.getElementById('close-search');

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileLinks = document.querySelectorAll('.mobile-link');

const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const checkoutBtn = document.getElementById('checkout-btn');

// Search Toggle
searchBtn.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
    if(!searchBar.classList.contains('hidden')) {
        searchBar.querySelector('input').focus();
    }
});

closeSearch.addEventListener('click', () => {
    searchBar.classList.add('hidden');
});

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });
});

// Cart Drawer Toggle
cartBtn.addEventListener('click', () => {
    cartDrawer.classList.remove('hidden');
    cartDrawer.classList.remove('flex');
    cartDrawer.classList.add('flex');
});

closeCart.addEventListener('click', () => {
    cartDrawer.classList.add('hidden');
    cartDrawer.classList.remove('flex');
});

cartDrawer.addEventListener('click', (e) => {
    if(e.target === cartDrawer) {
        cartDrawer.classList.add('hidden');
        cartDrawer.classList.remove('flex');
    }
});

// Product Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-adidas-accent', 'text-black');
            b.classList.add('bg-white/10', 'text-white');
        });
        btn.classList.remove('bg-white/10', 'text-white');
        btn.classList.add('bg-adidas-accent', 'text-black');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            if(filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Interactive 3D Colorway Switcher
function changeShoeColor(colorId, imgUrl, name) {
    const customizerImg = document.getElementById('customizer-img');
    const activeColorName = document.getElementById('active-color-name');
    
    // Fade effect
    customizerImg.style.opacity = '0';
    setTimeout(() => {
        customizerImg.src = imgUrl;
        customizerImg.style.opacity = '1';
        activeColorName.textContent = name;
    }, 200);
}

// Add to Cart functionality
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const customAddCartBtn = document.getElementById('custom-add-cart');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price'));
        const img = card.getAttribute('data-img');

        addToCart(name, price, img);
    });
});

customAddCartBtn.addEventListener('click', () => {
    const activeName = document.getElementById('active-color-name').textContent;
    addToCart(`Stan Smith (${activeName})`, 190, document.getElementById('customizer-img').src);
});

function addToCart(name, price, img) {
    const existingItem = cart.find(item => item.name === name);
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, img, quantity: 1 });
    }
    updateCartUI();
    
    // Open cart automatically on add
    cartDrawer.classList.remove('hidden');
    cartDrawer.classList.add('flex');
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

function updateCartUI() {
    // Update badge count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Render items
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-20 text-gray-400" id="empty-cart-msg">
                <i class="fa-solid fa-bag-shopping text-5xl mb-4 text-white/20"></i>
                <p class="font-display uppercase tracking-wide text-lg">Your bag is empty</p>
                <p class="text-xs mt-1">Add items to start your checkout</p>
            </div>
        `;
        cartSubtotal.textContent = '$0.00';
    } else {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            const itemEl = document.createElement('div');
            itemEl.className = 'flex items-center gap-4 py-4';
            itemEl.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="w-20 h-20 object-contain bg-adidas-gray/50 rounded-lg p-2">
                <div class="flex-1">
                    <h4 class="font-display font-bold uppercase text-sm">${item.name}</h4>
                    <p class="text-xs text-adidas-accent font-bold mt-1">$${item.price} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart('${item.name}')" class="text-gray-400 hover:text-adidas-red transition-colors p-2">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }
}

// Checkout alert simulation
checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
        alert('Your shopping bag is empty.');
        return;
    }
    alert('Thank you for shopping with adidas! Secure checkout simulation completed successfully.');
    cart = [];
    updateCartUI();
    cartDrawer.classList.add('hidden');
    cartDrawer.classList.remove('flex');
});
