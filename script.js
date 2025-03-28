function init3DCoffeeModel() {
    const container = document.getElementById('coffee-container');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5dc);
    
    const camera = new THREE.PerspectiveCamera(
        45, 
        container.clientWidth / container.clientHeight, 
        0.1, 
        1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const cupMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x6F4E37,
        shininess: 100,
        specular: 0x111111
    });
    
    const liquidMaterial = new THREE.MeshPhongMaterial({
        color: 0x4b371c,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    
    const saucerMaterial = new THREE.MeshPhongMaterial({
        color: 0xC4A484,
        shininess: 50
    });
    
    const handleMaterial = new THREE.MeshPhongMaterial({
        color: 0x5c3a21,
        shininess: 30
    });

    const cupGeometry = new THREE.CylinderGeometry(1, 0.8, 1.5, 32);
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.y = 0;
    cup.castShadow = true;
    scene.add(cup);

    const liquidGeometry = new THREE.CylinderGeometry(0.78, 0.78, 0.5, 32);
    const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquid.position.y = 0.25;
    scene.add(liquid);

    const saucerGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 32);
    const saucer = new THREE.Mesh(saucerGeometry, saucerMaterial);
    saucer.position.y = -0.8;
    saucer.receiveShadow = true;
    scene.add(saucer);

    const handleGeometry = new THREE.TorusGeometry(0.4, 0.1, 16, 32, Math.PI * 1.5);
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(1, 0, 0);
    handle.rotation.z = Math.PI / 2;
    scene.add(handle);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 100;
        mouseY = (event.clientY - windowHalfY) / 100;
    }

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    function animate() {
        requestAnimationFrame(animate);
        
        targetX = mouseX * 0.05;
        targetY = mouseY * 0.05;
        
        cup.rotation.y += 0.01 * (targetX - cup.rotation.y);
        cup.rotation.x += 0.01 * (targetY - cup.rotation.x);
        liquid.rotation.y = cup.rotation.y;
        liquid.rotation.x = cup.rotation.x;
        handle.rotation.y = cup.rotation.y;
        handle.rotation.x = cup.rotation.x;
        
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

    animate();
}

const menuItems = [
    {
        id: 1,
        name: "Espresso",
        price: 3.50,
        description: "Our signature espresso blend with rich crema and notes of dark chocolate and caramel.",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        name: "Cappuccino",
        price: 4.50,
        description: "Perfectly balanced espresso with velvety steamed milk and a thick layer of microfoam.",
        image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        name: "Latte",
        price: 4.75,
        description: "Smooth espresso with steamed milk and a light layer of foam, featuring beautiful latte art.",
        image: "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        name: "Cold Brew",
        price: 4.25,
        description: "Slow-steeped for 18 hours for a smooth, less acidic coffee with chocolatey notes.",
        image: "https://i.pinimg.com/474x/ba/10/85/ba10854e762479f4d9bdc1e1d9366d4c.jpg"
    },
    {
        id: 5,
        name: "Mocha",
        price: 5.00,
        description: "Rich espresso combined with premium chocolate and steamed milk, topped with whipped cream.",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 6,
        name: "Americano",
        price: 3.75,
        description: "Espresso shots topped with hot water, producing a light layer of crema.",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
];
// Gallery Data
const galleryItems = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://i.pinimg.com/474x/dd/ca/53/ddca5394cb1518e10458d8bac4e87df2.jpg",
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    init3DCoffeeModel();
    renderMenuItems();
    renderGalleryItems();
    setupEventListeners();
    setupFormSubmissions();
});

function renderMenuItems() {
    const menuContainer = document.querySelector('.menu-items');
    menuContainer.innerHTML = menuItems.map(item => `
        <div class="menu-item" data-id="${item.id}">
            <div class="menu-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-item-content">
                <div class="menu-item-title">
                    <h3>${item.name}</h3>
                    <span>$${item.price.toFixed(2)}</span>
                </div>
                <p class="menu-item-desc">${item.description}</p>
                <button class="btn add-to-cart">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function renderGalleryItems() {
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.innerHTML = galleryItems.map(item => `
        <div class="gallery-item">
            <img src="${item}" alt="Coffee image">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuToggle.classList.toggle('fa-times');
    });

    document.querySelectorAll('.navbar a:not(.cart-icon)').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuToggle.classList.remove('fa-times');
        });
    });

    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const menuItem = e.target.closest('.menu-item');
            const itemId = parseInt(menuItem.dataset.id);
            addToCart(itemId);
        }

        if (e.target.classList.contains('cart-item-remove')) {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            removeFromCart(itemId);
        }
    });

    document.querySelector('.checkout-btn').addEventListener('click', checkout);
}

function setupFormSubmissions() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Your message has been sent successfully!');
            contactForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
}

function addToCart(itemId) {
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const menuItem = menuItems.find(item => item.id === itemId);
        cart.push({
            ...menuItem,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification('Item added to cart!');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    showNotification('Item removed from cart!');
}

function updateCart() {
    renderCartItems();
    updateCartTotal();
    updateCartCount();
}

function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <i class="fas fa-times cart-item-remove"></i>
        </div>
    `).join('');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    }
}

function updateCartTotal() {
    const cartTotal = document.querySelector('.cart-total span');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    showNotification('Order placed successfully! Thank you for your purchase!');
    cart = [];
    updateCart();
    document.querySelector('.cart-sidebar').classList.remove('active');
    document.querySelector('.cart-overlay').classList.remove('active');
}

function showNotification(message) {
    const notification = document.querySelector('.notification');
    notification.textContent = message;
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 500;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.6s ease';
});

setTimeout(() => {
    document.querySelector('.hero').style.opacity = '1';
    document.querySelector('.hero').style.transform = 'translateY(0)';
}, 100);