// Product Data Store
const products = [
    {
        id: 1,
        name: "Ultraboost 5X",
        category: "footwear",
        price: 190.00,
        rating: 4.9,
        reviews: 342,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        badge: "Best Seller",
        description: "The pinnacle of running comfort. Equipped with maximum energy return and a breathable Primeknit upper made in part with Parley Ocean Plastic.",
        sizes: ["7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
    },
    {
        id: 2,
        name: "Samba OG Shoes",
        category: "footwear",
        price: 120.00,
        rating: 4.8,
        reviews: 1250,
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
        badge: "Classic",
        description: "Born on the pitch, adopted by the streets. The iconic Samba OG features a soft leather upper and suede overlays with the unmistakable 3-Stripes.",
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "11"]
    },
    {
        id: 3,
        name: "Adicolor Classics Hoodie",
        category: "apparel",
        price: 85.00,
        rating: 4.7,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
        badge: "New",
        description: "Comfort meets heritage. Crafted from plush cotton fleece with the signature Trefoil logo embroidered on the chest for effortless everyday style.",
        sizes: ["S", "M", "L", "XL", "2XL"]
    },
    {
        id: 4,
        name: "Predator Pro Goalkeeper Gloves",
        category: "accessories",
        price: 140.00,
        rating: 4.9,
        reviews: 215,
        image: "https://images.unsplash.com/photo-1518063319789-721796d1b8d2?auto=format&fit=crop&w=800&q=80",
        badge: "Pro Choice",
        description: "Command your penalty box. High-definition grip elements on the backhand ensure precise punching while URG 2.0 latex provides supreme stopping power.",
        sizes: ["8", "9", "10", "11"]
    },
    {
        id: 5,
        name: "NMD_R1 Sneaker",
        category: "footwear",
        price: 150.00,
        rating: 4.6,
        reviews: 512,
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
        badge: "Sale",
        description: "Progressive streetwear style with responsive Boost cushioning. Sleek, tech-inspired design built for navigating the urban jungle.",
        sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11"]
    },
    {
        id: 6,
        name: "Tiro 24 Competition Track Jacket",
        category: "apparel",
        price: 90.00,
        rating: 4.8,
        reviews: 180,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
        badge: "Trending",
        description: "Built for matchday preparation. Moisture-absorbing AEROREADY keeps you dry and confident while warming up on the touchline.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 7,
        name: "Adidas Daily Backpack",
        category: "accessories",
        price: 55.00,
        rating: 4.5,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        badge: "Essential",
        description: "Durable daily carryall with a dedicated laptop compartment, ergonomic shoulder straps, and water-resistant base material.",
        sizes: ["One Size"]
    },
    {
        id: 8,
        name: "Superstar Shoes",
        category: "footwear",
        price: 110.00,
        rating: 4.9,
        reviews: 2100,
        image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80",
        badge: "Legendary",
        description: "The shell-toe legend. Loved by hip-hop royalty and basketball icons alike for over 50 years. Crisp leather and serrated 3-Stripes.",
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
    }
];

// Shopping Cart State
let cart = [];
let selectedSize = null;
let currentModalProduct = null;

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItemsList = document.getElementById('cartItemsList');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const filterBtns = document.querySelectorAll('.filter-btn');

// Modal Elements
const productModal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalSizes = document.getElementById('modalSizes');
const modalAddToCart = document.getElementById('modalAddToCart');

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');

// Initialize Website
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
});

// Render Products function
function renderProducts(items) {
    productGrid.innerHTML = '';
    
    if (items.length === 0) {
        productGrid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400 font-heading text-lg">No products found matching your filter.</div>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = "bg-adidas-card rounded-2xl border border-white/10 overflow-hidden group hover:border-adidas-neon/50 transition-all duration-300 flex flex-col justify-between shadow-xl";
        card.innerHTML = `
            <div class="relative overflow-hidden bg-adidas-gray/50 aspect-[4/3] cursor-pointer product-click" data-id="${product.id}">
                <div class="absolute top-3 left-3 z-10 bg-adidas-black/80 backdrop-blur-md text-adidas-neon text-[10px] font-heading font-extrabold uppercase px-3 py-1 rounded-full border border-white/10">
                    ${product.badge}
                </div>
                <button aria-label="Add to Wishlist" class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-adidas-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-adidas-neon hover:text-black transition-all">
                    <i class="fa-regular fa-heart text-sm"></i>
                </button>
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            
            <div class="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div class="space-y-1 cursor-pointer product-click" data-id="${product.id}">
                    <div class="flex items-center justify-between text-xs text-gray-400 uppercase tracking-widest font-bold">
                        <span>${product.category}</span>
                        <span class="flex items-center gap-1 text-white"><i class="fa-solid fa-star text-adidas-neon text-[10px]"></i> ${product.rating} (${product.reviews})</span>
                    </div>
                    <h3 class="font-heading font-black text-lg text-white uppercase group-hover:text-adidas-neon transition-colors line-clamp-1">${product.name}</h3>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-white/10">
                    <span class="font-heading font-black text-xl text-white">$${product.price.toFixed(2)}</span>
                    <button class="quick-add-btn bg-white hover:bg-adidas-neon text-black font-heading font-extrabold text-xs uppercase px-4 py-2.5 rounded-full transition-all flex items-center gap-2" data-id="${product.id}">
                        <i class="fa-solid fa-plus"></i> Quick Add
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });

    // Attach click events to cards and quick add buttons
    document.querySelectorAll('.product-click').forEach(el => {
        el.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            openProductModal(id);
        });
    });

    document.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            quickAddToCart(id);
        });
    });
}

// Category Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-white', 'text-black');
            b.classList.add('text-gray-400', 'hover:text-white');
        });
        e.target.classList.remove('text-gray-400', 'hover:text-white');
        e.target.classList.add('bg-white', 'text-black');

        const filter = e.target.getAttribute('data-filter');
        if (filter === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === filter);
            renderProducts(filtered);
        }
    });
});

// Open Product Modal
function openProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    currentModalProduct = product;
    selectedSize = product.sizes[0];

    modalImg.src = product.image;
    modalCategory.textContent = product.category;
    modalTitle.textContent = product.name;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    modalDesc.textContent = product.description;

    // Render sizes
    modalSizes.innerHTML = '';
    product.sizes.forEach((size, index) => {
        const sizeBtn = document.createElement('button');
        sizeBtn.className = `py-2.5 rounded-xl font-heading font-bold text-xs uppercase border transition-all ${index === 0 ? 'bg-adidas-neon text-black border-adidas-neon' : 'bg-adidas-card text-white border-white/20 hover:border-white'}`;
        sizeBtn.textContent = size;
        sizeBtn.addEventListener('click', () => {
            document.querySelectorAll('#modalSizes button').forEach(b => {
                b.className = "py-2.5 rounded-xl font-heading font-bold text-xs uppercase border bg-adidas-card text-white border-white/20 hover:border-white";
            });
            sizeBtn.className = "py-2.5 rounded-xl font-heading font-bold text-xs uppercase border bg-adidas-neon text-black border-adidas-neon";
            selectedSize = size;
        });
        modalSizes.appendChild(sizeBtn);
    });

    productModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close Product Modal
function closeModalFunc() {
    productModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeModalFunc);
modalOverlay.addEventListener('click', closeModalFunc);

// Modal Add To Cart
modalAddToCart.addEventListener('click', () => {
    if (!currentModalProduct) return;
    addToCart(currentModalProduct, selectedSize);
    closeModalFunc();
});

// Quick Add To Cart
function quickAddToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    addToCart(product, product.sizes[0]);
}

// Add to Cart Logic
function addToCart(product, size) {
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            quantity: 1
        });
    }

    updateCartUI();
    showToast(`Added ${product.name} (Size: ${size}) to your bag!`);
}

// Update Cart UI
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="text-center py-16 text-gray-400 space-y-3">
                <i class="fa-solid fa-bag-shopping text-4xl text-gray-600"></i>
                <p class="font-heading font-bold uppercase text-sm">Your bag is currently empty</p>
            </div>
        `;
        cartSubtotal.textContent = '$0.00';
        cartTotal.textContent = '$0.00';
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = "flex items-center gap-4 py-4 first:pt-0";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-xl bg-adidas-card border border-white/10">
            <div class="flex-1 space-y-1">
                <h4 class="font-heading font-bold text-sm text-white uppercase line-clamp-1">${item.name}</h4>
                <div class="text-xs text-gray-400">Size: <span class="text-white font-bold">${item.size}</span></div>
                <div class="font-heading font-black text-adidas-neon text-sm">$${item.price.toFixed(2)}</div>
                
                <div class="flex items-center gap-3 pt-1">
                    <div class="flex items-center border border-white/20 rounded-lg overflow-hidden bg-adidas-card">
                        <button class="px-2.5 py-0.5 text-xs text-gray-400 hover:text-white decrease-qty" data-index="${index}">-</button>
                        <span class="px-2 text-xs font-bold text-white">${item.quantity}</span>
                        <button class="px-2.5 py-0.5 text-xs text-gray-400 hover:text-white increase-qty" data-index="${index}">+</button>
                    </div>
                    <button class="text-xs text-red-400 hover:text-red-300 remove-item" data-index="${index}">
                        <i class="fa-regular fa-trash-can"></i> Remove
                    </button>
                </div>
            </div>
        `;
        cartItemsList.appendChild(div);
    });

    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${subtotal.toFixed(2)}`;

    // Attach cart item quantity & remove listeners
    document.querySelectorAll('.increase-qty').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.getAttribute('data-index'));
            cart[idx].quantity += 1;
            updateCartUI();
        });
    });

    document.querySelectorAll('.decrease-qty').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.getAttribute('data-index'));
            if (cart[idx].quantity > 1) {
                cart[idx].quantity -= 1;
            } else {
                cart.splice(idx, 1);
            }
            updateCartUI();
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.closest('button').getAttribute('data-index'));
            cart.splice(idx, 1);
            updateCartUI();
        });
    });
}

// Toast Notification Helper
function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}

// Setup Event Listeners for Cart Drawer & Menu
function setupEventListeners() {
    cartBtn.addEventListener('click', () => {
        cartDrawer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    const closeCartFunc = () => {
        cartDrawer.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    closeCart.addEventListener('click', closeCartFunc);
    cartOverlay.addEventListener('click', closeCartFunc);

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Checkout button simulation
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast("Your bag is empty!");
            return;
        }
        showToast("Order placed successfully! Thank you for choosing Adidas.");
        cart = [];
        updateCartUI();
        closeCartFunc();
    });

    // Newsletter form submission
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        if (email) {
            newsletterMsg.classList.remove('hidden');
            newsletterForm.reset();
            setTimeout(() => {
                newsletterMsg.classList.add('hidden');
            }, 6000);
        }
    });

    // Search bar functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query)
            );
            renderProducts(filtered);
        });
    }
}
