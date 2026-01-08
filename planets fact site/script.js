let currentPlanet = 'earth';
let currentTab = 'overview';

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeTabs();
    initializeMobileMenu();
    updatePlanetDisplay();
    createMeteors();
    animateHeader();
    addParticles();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const planetName = link.getAttribute('data-planet');
            switchPlanet(planetName);
        });
    });
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        mobileToggle.classList.toggle('active');
    });
}

function switchPlanet(planetName) {
    currentPlanet = planetName;
    currentTab = 'overview';
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`[data-planet="${planetName}"]`).classList.add('active');
    
    animatePlanetTransition();
    updatePlanetDisplay();
}

function switchTab(tabName) {
    currentTab = tabName;
    
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    updatePlanetView();
}

function animatePlanetTransition() {
    const planet = document.querySelector('.planet');
    planet.style.animation = 'none';
    
    setTimeout(() => {
        planet.style.animation = 'zoomOut 0.5s ease-out';
    }, 10);
    
    setTimeout(() => {
        planet.style.animation = 'zoomIn 0.5s ease-out';
        setTimeout(() => {
            planet.style.animation = 'float 6s ease-in-out infinite';
        }, 500);
    }, 500);
}

function updatePlanetDisplay() {
    const planetData = planetsData[currentPlanet];
    
    document.querySelector('.planet-name').textContent = planetData.name;
    updatePlanetDescription();
    
    document.querySelectorAll('.stat-value')[0].textContent = planetData.rotation;
    document.querySelectorAll('.stat-value')[1].textContent = planetData.revolution;
    document.querySelectorAll('.stat-value')[2].textContent = planetData.radius;
    document.querySelectorAll('.stat-value')[3].textContent = planetData.temperature;
    
    updatePlanetVisual();
    updateThemeColor();
    
    updateSourceLink();
}

function updatePlanetDescription() {
    const planetData = planetsData[currentPlanet];
    const description = document.querySelector('.planet-description');
    
    switch(currentTab) {
        case 'overview':
            description.textContent = planetData.overview;
            break;
        case 'structure':
            description.textContent = planetData.structure;
            break;
        case 'geology':
            description.textContent = planetData.geology;
            break;
    }
}

function updatePlanetView() {
    updatePlanetDescription();
    
    const surface = document.querySelector('.planet-surface');
    const structure = document.querySelector('.planet-structure');
    const geology = document.querySelector('.geology-marker');
    
    surface.classList.add('hidden');
    structure.classList.add('hidden');
    geology.classList.add('hidden');
    
    switch(currentTab) {
        case 'overview':
            surface.classList.remove('hidden');
            break;
        case 'structure':
            structure.classList.remove('hidden');
            break;
        case 'geology':
            surface.classList.remove('hidden');
            geology.classList.remove('hidden');
            break;
    }
}

function updatePlanetVisual() {
    const planet = document.querySelector('.planet');
    const planetData = planetsData[currentPlanet];
    
    planet.className = `planet ${currentPlanet}-planet`;
    
    const surface = document.querySelector('.planet-surface');
    surface.style.background = planetData.gradient;
    
    updatePlanetSize();
    updatePlanetView();
}

function updatePlanetSize() {
    const planet = document.querySelector('.planet');
    const sizes = {
        mercury: 180,
        venus: 250,
        earth: 290,
        mars: 220,
        jupiter: 380,
        saturn: 350,
        uranus: 280,
        neptune: 280
    };
    
    const size = sizes[currentPlanet];
    planet.style.width = `${size}px`;
    planet.style.height = `${size}px`;
}

function updateThemeColor() {
    const planetData = planetsData[currentPlanet];
    const root = document.documentElement;
    
    root.style.setProperty('--current-planet-color', planetData.color);
    
    document.querySelectorAll('.tab-button').forEach(button => {
        button.style.background = '';
        button.style.borderColor = '';
        button.onmouseenter = function() {
            if (!this.classList.contains('active')) {
                this.style.background = `${planetData.color}33`;
                this.style.borderColor = planetData.color;
            }
        };
        button.onmouseleave = function() {
            if (!this.classList.contains('active')) {
                this.style.background = '';
                this.style.borderColor = '';
            }
        };
        if (button.classList.contains('active')) {
            button.style.background = planetData.color;
            button.style.borderColor = planetData.color;
        }
    });
}

function updateSourceLink() {
    const sourceLink = document.querySelector('.source a');
    sourceLink.href = `https://en.wikipedia.org/wiki/${currentPlanet.charAt(0).toUpperCase() + currentPlanet.slice(1)}`;
}

const style = document.createElement('style');
style.textContent = `
    @keyframes zoomOut {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .mobile-active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-color);
        flex-direction: column;
        padding: 2rem;
        border-bottom: 1px solid var(--border-color);
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .mercury-planet .planet-surface {
        background: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent 30%),
            radial-gradient(circle at 70% 60%, rgba(0, 0, 0, 0.2), transparent 40%),
            linear-gradient(135deg, #419EBB 0%, #2D68F0 50%, #419EBB 100%);
        box-shadow: 
            inset -25px -25px 40px rgba(0, 0, 0, 0.5),
            inset 25px 25px 40px rgba(255, 255, 255, 0.1),
            0 0 50px rgba(65, 158, 187, 0.3);
    }
    
    .mercury-planet .planet-surface::before {
        content: '';
        position: absolute;
        top: 20%;
        left: 60%;
        width: 15%;
        height: 15%;
        background: radial-gradient(circle, rgba(0, 0, 0, 0.3), transparent);
        border-radius: 50%;
    }
    
    .mercury-planet .planet-surface::after {
        content: '';
        position: absolute;
        bottom: 30%;
        right: 65%;
        width: 10%;
        height: 10%;
        background: radial-gradient(circle, rgba(0, 0, 0, 0.2), transparent);
        border-radius: 50%;
    }
    
    .venus-planet .planet-surface {
        background: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 30%),
            radial-gradient(circle at 80% 80%, rgba(255, 200, 100, 0.2), transparent 40%),
            linear-gradient(135deg, #EDA249 0%, #FFC649 40%, #FFAD33 70%, #EDA249 100%);
        box-shadow: 
            inset -30px -30px 50px rgba(139, 69, 19, 0.4),
            inset 20px 20px 40px rgba(255, 255, 255, 0.2),
            0 0 80px rgba(237, 162, 73, 0.5);
    }
    
    .venus-planet .planet-surface::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-radial-gradient(
            circle at 50% 50%,
            transparent 0,
            transparent 10px,
            rgba(255, 255, 255, 0.05) 10px,
            rgba(255, 255, 255, 0.05) 20px
        );
        border-radius: 50%;
    }
    
    .mars-planet .planet-surface {
        background: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent 30%),
            radial-gradient(circle at 65% 40%, rgba(139, 0, 0, 0.3), transparent 20%),
            radial-gradient(circle at 20% 70%, rgba(165, 42, 42, 0.2), transparent 25%),
            linear-gradient(135deg, #D14C32 0%, #EC5E42 30%, #CD4A37 60%, #A03C2C 100%);
        box-shadow: 
            inset -20px -20px 40px rgba(80, 0, 0, 0.5),
            inset 15px 15px 30px rgba(255, 100, 100, 0.2),
            0 0 50px rgba(209, 76, 50, 0.4);
    }
    
    .mars-planet .planet-surface::before {
        content: '';
        position: absolute;
        top: 15%;
        right: 20%;
        width: 8%;
        height: 8%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent 70%);
        border-radius: 50%;
    }
    
    .mars-planet .planet-surface::after {
        content: '';
        position: absolute;
        bottom: 25%;
        left: 30%;
        width: 12%;
        height: 12%;
        background: radial-gradient(circle, rgba(139, 0, 0, 0.4), transparent);
        border-radius: 50%;
    }
    
    .jupiter-planet .planet-surface {
        background: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 30%),
            repeating-linear-gradient(
                0deg,
                #D83A34 0px,
                #CD5120 20px,
                #ECAD7A 40px,
                #F4E7D7 60px,
                #ECAD7A 80px,
                #CD5120 100px,
                #D83A34 120px
            );
        position: relative;
        overflow: hidden;
        box-shadow: 
            inset -30px -30px 60px rgba(100, 50, 20, 0.5),
            inset 20px 20px 40px rgba(255, 255, 255, 0.1),
            0 0 80px rgba(216, 58, 52, 0.4);
    }
    
    .jupiter-planet .planet-surface::before {
        content: '';
        position: absolute;
        top: 40%;
        right: 30%;
        width: 40px;
        height: 30px;
        background: radial-gradient(ellipse, #FF6B35, #C44536);
        border-radius: 50%;
        transform: rotate(20deg);
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
    }
    
    .jupiter-planet .planet-surface::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 40px,
            rgba(255, 255, 255, 0.03) 40px,
            rgba(255, 255, 255, 0.03) 80px
        );
        border-radius: 50%;
        animation: jupiterStorms 60s linear infinite;
    }
    
    @keyframes jupiterStorms {
        from { transform: translateX(0); }
        to { transform: translateX(80px); }
    }
    
    .saturn-planet .planet-surface {
        background: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent 30%),
            linear-gradient(135deg, #CD5120 0%, #FCCB6B 30%, #FAD6A5 60%, #CD5120 100%);
        box-shadow: 
            inset -25px -25px 50px rgba(139, 69, 19, 0.4),
            inset 20px 20px 40px rgba(255, 255, 255, 0.15),
            0 0 70px rgba(205, 81, 32, 0.4);
    }
    
    .saturn-planet {
        position: relative;
    }
    
    .saturn-planet::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateX(75deg);
        width: 200%;
        height: 200%;
        border-radius: 50%;
        box-shadow: 
            0 0 0 2px rgba(252, 203, 107, 0.8),
            0 0 0 15px rgba(252, 203, 107, 0.3),
            0 0 0 25px rgba(252, 203, 107, 0.2),
            0 0 0 35px rgba(252, 203, 107, 0.1);
        animation: saturnRingRotate 100s linear infinite;
        pointer-events: none;
    }
    
    @keyframes saturnRingRotate {
        from { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0deg); }
        to { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg); }
    }
    
    .uranus-planet .planet-surface {
        background: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 30%),
            radial-gradient(circle at 70% 70%, rgba(101, 240, 213, 0.2), transparent 40%),
            linear-gradient(135deg, #1EC1A2 0%, #65F0D5 40%, #4DD0C0 70%, #1EC1A2 100%);
        box-shadow: 
            inset -20px -20px 40px rgba(10, 80, 70, 0.5),
            inset 15px 15px 30px rgba(255, 255, 255, 0.2),
            0 0 60px rgba(30, 193, 162, 0.4);
    }
    
    .uranus-planet .planet-surface::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: 
            radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(30, 193, 162, 0.1) 70%, transparent 100%),
            radial-gradient(ellipse at 50% 100%, transparent 40%, rgba(30, 193, 162, 0.1) 70%, transparent 100%);
        border-radius: 50%;
        animation: uranusGlow 8s ease-in-out infinite;
    }
    
    @keyframes uranusGlow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.7; }
    }
    
    .neptune-planet .planet-surface {
        background: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 30%),
            radial-gradient(circle at 60% 60%, rgba(91, 143, 255, 0.3), transparent 25%),
            linear-gradient(135deg, #2D68F0 0%, #5B8FFF 35%, #4A7FFF 65%, #2D68F0 100%);
        box-shadow: 
            inset -25px -25px 50px rgba(20, 50, 150, 0.5),
            inset 20px 20px 40px rgba(255, 255, 255, 0.2),
            0 0 70px rgba(45, 104, 240, 0.5);
    }
    
    .neptune-planet .planet-surface::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            rgba(255, 255, 255, 0.05) 10deg,
            transparent 20deg
        );
        border-radius: 50%;
        animation: neptuneStorm 30s linear infinite;
    }
    
    @keyframes neptuneStorm {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(style);

function createMeteors() {
    setInterval(() => {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.left = Math.random() * window.innerWidth + 'px';
        meteor.style.top = '-100px';
        meteor.style.animationDuration = (Math.random() * 2 + 1) + 's';
        meteor.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(meteor);
        
        setTimeout(() => {
            meteor.remove();
        }, 4000);
    }, 3000);
}

function animateHeader() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    header.style.transition = 'transform 0.3s ease';
}

function addParticles() {
    const planetWrapper = document.querySelector('.planet-wrapper');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        planetWrapper.appendChild(particle);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);
