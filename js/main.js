// FoodMax - Main JavaScript

function toggleMenu() {
    var menuToggle = document.querySelector('.menu-toggle');
    var navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        var menuToggle = document.querySelector('.menu-toggle');
        var navMenu = document.querySelector('.nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    }
});

