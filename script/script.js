

// ====================navScripts=======================
const navSections = {
    search: document.querySelector('.search-form'),
    cart: document.querySelector('.shopping-cart'),
    login: document.querySelector('.login-form'),
    menu: document.querySelector('.navbar')
};
// -----------------
function toggleSection(activeKey) {
    for (const key in navSections) {
        if (key === activeKey) {
            navSections[key].classList.toggle('active');
        } else {
            navSections[key].classList.remove('active');
        }
    }
}
// -------------------
document.querySelector('#search-btn').onclick = () => toggleSection('search');
document.querySelector('#cart-btn').onclick = () => toggleSection('cart');
document.querySelector('#login-btn').onclick = () => toggleSection('login');
document.querySelector('#menu-btn').onclick = () => toggleSection('menu');
// --------------------
window.onscroll = () => {
    for (const key in navSections) {
        navSections[key].classList.remove('active');
    }
};



// =================swiper-script===================================

const sliderSettings = {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
};

[".product-slider", ".review-slider"].forEach(selector => {
    new Swiper(selector, sliderSettings);
});






// =======================cartScript===========================

const products = [
    {
        id: 1,
        name: "fresh orange",
        price: 4.99,
        image: "img/product-1.png"
    },
    {
        id: 2,
        name: "fresh onion",
        price: 2.5,
        image: "img/product-2.png"
    },
    {
        id: 3,
        name: "fresh avocado",
        price: 6.99,
        image: "img/product-3.png"
    },
    {
        id: 4,
        name: "fresh cabbage",
        price: 10,
        image: "img/product-4.png"
    },
    {
        id: 5,
        name: "fresh potato",
        price: 2.99,
        image: "img/product-5.png"
    },
    {
        id: 6,
        name: "fresh meat",
        price: 15.99,
        image: "img/product-6.png"
    },
    {
        id: 7,
        name: "fresh carrot",
        price: 1.99,
        image: "img/product-7.png"
    },
    {
        id: 8,
        name: "green lemon",
        price: 1.99,
        image: "img/product-8.png"
    }
];

const productList = document.querySelector('.product-slider .swiper-wrapper');  // مكان عرض المنتجات
const cartBox = document.querySelector('.shopping-cart');        // السلة
const cartCount = document.getElementById('numbOfcat');          // عداد السلة
let cart = [];

function showProducts() {
    products.forEach(product => {
        const item = document.createElement('div');
        item.className = "box swiper-slide";
        item.innerHTML = `
                <img src="${product.image}" alt="">
                <h3>${product.name}</h3>
                <div class="price">$${product.price}</div>
                <a href="#" class="btn" data-id="${product.id}">add to cart</a>
            `;
        productList.appendChild(item);
    });
}


function updateCart() {
    const oldItems = cartBox.querySelectorAll('.box');
    oldItems.forEach(item => item.remove());

    let total = 0;
    let totalItems = 0;

    cart.forEach(product => {
        total += product.price * product.qty;
        totalItems += product.qty;

        const item = document.createElement('div');
        item.className = 'box';
        item.innerHTML = `
                <i class="fas fa-trash" data-id="${product.id}"></i>
                <img src="${product.image}" alt="">
                <div class="content">
                    <h3>${product.name}</h3>
                    <span class="price">$${product.price}</span>
                    <span class="quantity">qty : ${product.qty}</span>
                </div>
            `;
        cartBox.insertBefore(item, cartBox.querySelector('.total'));
    });

    cartCount.textContent = totalItems;
    cartBox.querySelector('.total').textContent = `total : $${total.toFixed(2)}`;
}

document.addEventListener('click', function (event) {
    if (event.target.matches('.product-slider .swiper-wrapper .box .btn')) {
        event.preventDefault();
        const id = parseInt(event.target.dataset.id);
        const selected = products.find(p => p.id === id);
        const exists = cart.find(item => item.id === id);

        if (exists) {
            exists.qty += 1;
        } else {
            cart.push({ ...selected, qty: 1 });
        }

        updateCart();
    }

    if (event.target.classList.contains('fa-trash')) {
        const id = parseInt(event.target.dataset.id);
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }
});

showProducts();
updateCart();





