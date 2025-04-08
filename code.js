/************************
   navbar fetching here......
*************************/
document.getElementById("navbar"), innerHTML = fetch("navbar.html")
    .then(Response => Response.text())
    .then(data => document.getElementById("navbar").innerHTML = data);

/**********************
    Toggle navbar menu on mobile view....
*************************/

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}
/*****************
 *  CART BTN
 ****************/
function toggleCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
}

// Optional: Close cart when clicking outside
document.addEventListener('click', function (event) {
    const cart = document.getElementById('cartContainer');
    const cartIcon = document.querySelector('.cart-icon');

    if (!cart.contains(event.target) && !cartIcon.contains(event.target)) {
        cart.style.display = 'none';
    }
});



/************************
 
*************************/

        let currentSlide = 0;
        const slides = document.querySelectorAll('.hero-slide');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        setInterval(nextSlide, 5000); // Auto transition every 5 seconds


/*********************************
        add to cart scripts
*********************************/

// Get cart from localStorage or initialize it if not available
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count on the Add to Cart button
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.querySelector('.fa-cart-shopping');
    cartIcon.innerText = `(${cartCount})`; // Update cart icon text with number of items
}

// Add to Cart function
function addToCart(productId, productName, productPrice) {
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.productId === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
        // Add new product to cart
        cart.push({ productId, productName, productPrice, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const productName = button.getAttribute('data-product-name');
        const productPrice = button.getAttribute('data-product-price');
        
        addToCart(productId, productName, productPrice);
    });
});

// Call the function to update cart count on page load
updateCartCount();
