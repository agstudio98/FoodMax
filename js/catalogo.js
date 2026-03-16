// FoodMax - Catalogo JavaScript

function toggleMenu() {
    var menuToggle = document.querySelector('.menu-toggle');
    var navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// Search and Filter
var searchInput = document.getElementById('searchInput');
var categoryFilter = document.getElementById('categoryFilter');
var productCards = document.querySelectorAll('.product-card');

if (searchInput && categoryFilter) {
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
}

function filterProducts() {
    var searchTerm = searchInput.value.toLowerCase();
    var category = categoryFilter.value;
    
    productCards.forEach(function(card) {
        var name = card.dataset.name.toLowerCase();
        var cardCategory = card.dataset.category;
        
        var matchesSearch = name.includes(searchTerm);
        var matchesCategory = category === 'all' || cardCategory === category;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal
var orderModal = document.getElementById('orderModal');
var orderForm = document.getElementById('orderForm');
var currentProduct = {};

if (orderModal && orderForm) {
    productCards.forEach(function(card) {
        card.addEventListener('click', function() {
            currentProduct = {
                name: card.dataset.name,
                price: parseInt(card.dataset.price),
                emoji: card.querySelector('.product-image').textContent
            };
            
            document.getElementById('modalProductEmoji').textContent = currentProduct.emoji;
            document.getElementById('modalProductName').textContent = currentProduct.name;
            
            orderModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    window.closeModal = function() {
        orderModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        orderForm.reset();
    };
    
    orderModal.addEventListener('click', function(e) {
        if (e.target === orderModal) {
            window.closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && orderModal.classList.contains('active')) {
            window.closeModal();
        }
    });
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var name = document.getElementById('customerName').value;
        var message = document.getElementById('customerMessage').value;
        var extras = Array.from(document.querySelectorAll('input[name="extra"]:checked'))
            .map(function(checkbox) { return checkbox.value; });
        
        var totalPrice = currentProduct.price;
        extras.forEach(function(extra) {
            if (extra === 'Papas Fritas') totalPrice += 400;
            else if (extra === 'Bebida') totalPrice += 300;
        });
        
        var whatsappMessage = 'PEDIDO - FoodMax\n\n';
        whatsappMessage += 'Cliente: ' + name + '\n';
        whatsappMessage += 'Producto: ' + currentProduct.emoji + ' ' + currentProduct.name + '\n';
        whatsappMessage += 'Precio base: $' + currentProduct.price + '\n';
        
        if (extras.length > 0) {
            whatsappMessage += '\nAgregados:\n';
            extras.forEach(function(extra) {
                var price = 0;
                if (extra === 'Papas Fritas') price = 400;
                else if (extra === 'Bebida') price = 300;
                whatsappMessage += '- ' + extra + ' ($' + price + ')\n';
            });
        }
        
        whatsappMessage += '\nTotal: $' + totalPrice + '\n';
        
        if (message) {
            whatsappMessage += '\nMensaje: ' + message;
        }
        
        var phoneNumber = '5491112345678';
        var whatsappUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(whatsappMessage);
        
        window.open(whatsappUrl, '_blank');
        window.closeModal();
    });
}

