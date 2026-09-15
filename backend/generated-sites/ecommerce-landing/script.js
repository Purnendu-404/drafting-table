const products = [
    { name: 'Stylish Watch', price: '$99' },
    { name: 'Wireless Headphones', price: '$149' },
    { name: 'Classic Sunglasses', price: '$49' },
    { name: 'Leather Bag', price: '$199' }
];

const container = document.getElementById('products');
products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<h3>${p.name}</h3><p>${p.price}</p><button>Add to Cart</button>`;
    container.appendChild(card);
});
