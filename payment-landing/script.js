document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.card');
    const actionButtons = document.querySelectorAll('.action-btn');
    const transactionItems = document.querySelectorAll('.transaction-item');
    const bottomNavButtons = document.querySelectorAll('.bottom-nav-btn');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(28, 31, 46, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(28, 31, 46, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.5 + index * 0.1}s`;
    });

    actionButtons.forEach((btn, index) => {
        btn.style.animationDelay = `${0.7 + index * 0.1}s`;
        btn.style.animation = 'fadeIn 0.8s ease-out both';
    });

    transactionItems.forEach((item, index) => {
        item.style.animationDelay = `${0.9 + index * 0.1}s`;
        item.style.animation = 'fadeIn 0.8s ease-out both';
    });

    bottomNavButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            bottomNavButtons.forEach(b => b.classList.remove('active'));
            if (!this.classList.contains('add-btn')) {
                this.classList.add('active');
            }
        });
    });

    const phoneDisplay = document.querySelector('.phone-mockup');
    let rotateY = -5;
    
    phoneDisplay.addEventListener('mousemove', (e) => {
        const rect = phoneDisplay.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        rotateY = ((x / width) - 0.5) * 10;
        phoneDisplay.style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
    });

    phoneDisplay.addEventListener('mouseleave', () => {
        phoneDisplay.style.transform = 'perspective(1000px) rotateY(-5deg)';
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.tagline, .hero-title, .btn-download, .card, .action-btn, .transaction-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
