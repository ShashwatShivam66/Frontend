// State Management
const appState = {
    currentPage: 'home',
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
    searchQuery: '',
    filters: {
        movies: 'all',
        tvShows: 'all'
    },
    sort: {
        movies: 'rating',
        tvShows: 'rating'
    },
    view: {
        movies: 'grid',
        tvShows: 'grid'
    }
};

// DOM Elements
const elements = {
    loadingScreen: document.querySelector('.loading-screen'),
    pages: document.querySelectorAll('.page'),
    navLinks: document.querySelectorAll('.nav-link'),
    mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.querySelector('.search-btn'),
    mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
    mobileMenu: document.querySelector('.mobile-menu'),
    mobileMenuClose: document.querySelector('.mobile-menu-close'),
    mobileMenuOverlay: document.querySelector('.mobile-menu-overlay'),
    modal: document.getElementById('contentModal'),
    modalClose: document.querySelector('.modal-close'),
    heroCta: document.querySelector('.hero-cta'),
    movieFilter: document.getElementById('movie-filter'),
    tvFilter: document.getElementById('tv-filter'),
    movieSort: document.getElementById('movie-sort'),
    tvSort: document.getElementById('tv-sort'),
    movieViewToggle: document.getElementById('movie-view-toggle'),
    tvViewToggle: document.getElementById('tv-view-toggle')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        elements.loadingScreen.classList.add('hide');
        initializeApp();
    }, 2000);
});

function initializeApp() {
    loadContent();
    setupEventListeners();
    handleRoute();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    elements.mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            handleNavigation(e);
            closeMobileMenu();
        });
    });

    // Search
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    elements.searchBtn.addEventListener('click', performSearch);

    // Mobile Menu
    elements.mobileMenuToggle.addEventListener('click', openMobileMenu);
    elements.mobileMenuClose.addEventListener('click', closeMobileMenu);
    elements.mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Modal
    elements.modalClose.addEventListener('click', closeModal);
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) closeModal();
    });

    // Hero CTA
    elements.heroCta.addEventListener('click', () => {
        navigateToPage('movies');
    });

    // Filters
    elements.movieFilter.addEventListener('change', (e) => {
        appState.filters.movies = e.target.value;
        loadMovies();
    });

    elements.tvFilter.addEventListener('change', (e) => {
        appState.filters.tvShows = e.target.value;
        loadTVShows();
    });

    // Sort dropdowns
    elements.movieSort.addEventListener('change', (e) => {
        appState.sort.movies = e.target.value;
        loadMovies();
    });

    elements.tvSort.addEventListener('change', (e) => {
        appState.sort.tvShows = e.target.value;
        loadTVShows();
    });

    // View toggle buttons
    elements.movieViewToggle.addEventListener('click', () => {
        appState.view.movies = appState.view.movies === 'grid' ? 'list' : 'grid';
        const icon = elements.movieViewToggle.querySelector('i');
        icon.className = appState.view.movies === 'grid' ? 'fas fa-th' : 'fas fa-list';
        loadMovies();
    });

    elements.tvViewToggle.addEventListener('click', () => {
        appState.view.tvShows = appState.view.tvShows === 'grid' ? 'list' : 'grid';
        const icon = elements.tvViewToggle.querySelector('i');
        icon.className = appState.view.tvShows === 'grid' ? 'fas fa-th' : 'fas fa-list';
        loadTVShows();
    });

    // Handle browser back/forward
    window.addEventListener('popstate', handleRoute);
}

// Navigation
function handleNavigation(e) {
    e.preventDefault();
    const page = e.currentTarget.dataset.page;
    navigateToPage(page);
}

function navigateToPage(page) {
    appState.currentPage = page;
    window.history.pushState({ page }, '', `#${page}`);
    showPage(page);
    updateActiveNav(page);
}

function handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    appState.currentPage = hash;
    showPage(hash);
    updateActiveNav(hash);
}

function showPage(page) {
    elements.pages.forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function updateActiveNav(page) {
    elements.navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
    elements.mobileNavLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
}

// Mobile Menu
function openMobileMenu() {
    elements.mobileMenu.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    elements.mobileMenu.classList.remove('show');
    document.body.style.overflow = '';
}

// Content Loading
function loadContent() {
    loadTrending();
    loadRecommended();
    loadMovies();
    loadTVShows();
    loadBookmarks();
}

function loadTrending() {
    const trendingContent = allContent.filter(item => item.trending);
    renderGrid('trending-grid', trendingContent);
}

function loadRecommended() {
    const recommendedContent = allContent.filter(item => item.recommended);
    renderGrid('recommended-grid', recommendedContent);
}

function loadMovies() {
    let movies = entertainmentData.movies;
    if (appState.filters.movies !== 'all') {
        movies = movies.filter(movie => movie.genre === appState.filters.movies);
    }
    
    // Apply sorting
    movies = sortContent(movies, appState.sort.movies);
    
    // Apply view mode
    const grid = document.getElementById('movies-grid');
    grid.className = `content-grid ${appState.view.movies === 'list' ? 'list-view' : ''}`;
    
    renderGrid('movies-grid', movies);
}

function loadTVShows() {
    let tvShows = entertainmentData.tvShows;
    if (appState.filters.tvShows !== 'all') {
        tvShows = tvShows.filter(show => show.genre === appState.filters.tvShows);
    }
    
    // Apply sorting
    tvShows = sortContent(tvShows, appState.sort.tvShows);
    
    // Apply view mode
    const grid = document.getElementById('tv-grid');
    grid.className = `content-grid ${appState.view.tvShows === 'list' ? 'list-view' : ''}`;
    
    renderGrid('tv-grid', tvShows);
}

// Sorting function
function sortContent(content, sortBy) {
    const sorted = [...content];
    
    switch(sortBy) {
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'year-desc':
            return sorted.sort((a, b) => b.year - a.year);
        case 'year-asc':
            return sorted.sort((a, b) => a.year - b.year);
        case 'title':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return sorted;
    }
}

function loadBookmarks() {
    const bookmarkedContent = allContent.filter(item => 
        appState.bookmarks.includes(item.id)
    );
    renderGrid('bookmarks-grid', bookmarkedContent);
    
    const emptyState = document.getElementById('empty-bookmarks');
    if (bookmarkedContent.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }
}

// Render Content
function renderGrid(gridId, content) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = content.map(item => createContentCard(item)).join('');
    
    // Add event listeners to cards
    grid.querySelectorAll('.content-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.card-bookmark')) {
                openModal(parseInt(card.dataset.id));
            }
        });
    });

    // Add bookmark button listeners
    grid.querySelectorAll('.card-bookmark').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleBookmark(parseInt(btn.dataset.id));
        });
    });
}

function createContentCard(item) {
    const isBookmarked = appState.bookmarks.includes(item.id);
    const categoryIcon = item.category === 'movie' ? 'fa-film' : 'fa-tv';
    
    return `
        <div class="content-card" data-id="${item.id}">
            <div class="card-image-container">
                <img src="${item.image}" alt="${item.title}" class="card-image" loading="lazy">
                <div class="card-overlay"></div>
                <button class="card-play-btn">
                    <i class="fas fa-play"></i>
                </button>
                <button class="card-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-id="${item.id}">
                    <i class="fas fa-bookmark"></i>
                </button>
            </div>
            <div class="card-info">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-meta">
                    <span class="card-year">
                        <i class="far fa-calendar"></i> ${item.year}
                    </span>
                    <span class="card-category">
                        <i class="fas ${categoryIcon}"></i> ${item.category === 'movie' ? 'Movie' : 'TV Series'}
                    </span>
                    <span class="card-rating">
                        <i class="fas fa-star"></i> ${item.rating}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Search Functionality
function performSearch() {
    const query = elements.searchInput.value.trim().toLowerCase();
    if (!query) return;

    appState.searchQuery = query;
    const results = allContent.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.genre.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    navigateToPage('search-results');
    document.querySelector('.search-query').textContent = `Showing results for "${query}"`;
    renderGrid('search-grid', results);

    const emptyState = document.getElementById('empty-search');
    if (results.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }

    elements.searchInput.value = '';
}

// Modal Functionality
function openModal(id) {
    const item = allContent.find(content => content.id === id);
    if (!item) return;

    const modal = elements.modal;
    const isBookmarked = appState.bookmarks.includes(id);

    modal.querySelector('.modal-image').src = item.image;
    modal.querySelector('.modal-image').alt = item.title;
    modal.querySelector('.modal-title').textContent = item.title;
    modal.querySelector('.modal-year').innerHTML = `<i class="far fa-calendar"></i> ${item.year}`;
    modal.querySelector('.modal-category').innerHTML = `<i class="fas ${item.category === 'movie' ? 'fa-film' : 'fa-tv'}"></i> ${item.category === 'movie' ? 'Movie' : 'TV Series'}`;
    modal.querySelector('.modal-rating').innerHTML = `<i class="fas fa-star"></i> ${item.rating}`;
    modal.querySelector('.modal-description').textContent = item.description;

    const bookmarkBtn = modal.querySelector('.bookmark-btn');
    bookmarkBtn.innerHTML = `<i class="fas fa-bookmark"></i> ${isBookmarked ? 'Bookmarked' : 'Bookmark'}`;
    bookmarkBtn.onclick = () => {
        toggleBookmark(id);
        bookmarkBtn.innerHTML = `<i class="fas fa-bookmark"></i> ${appState.bookmarks.includes(id) ? 'Bookmarked' : 'Bookmark'}`;
    };

    const playBtn = modal.querySelector('.play-btn');
    playBtn.onclick = () => {
        alert('Playing: ' + item.title + '\n\nThis is a demo. In a real app, this would start video playback.');
    };

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    elements.modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Bookmark Functionality
function toggleBookmark(id) {
    const index = appState.bookmarks.indexOf(id);
    if (index > -1) {
        appState.bookmarks.splice(index, 1);
    } else {
        appState.bookmarks.push(id);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(appState.bookmarks));
    
    // Update UI
    document.querySelectorAll(`.card-bookmark[data-id="${id}"]`).forEach(btn => {
        btn.classList.toggle('bookmarked');
    });
    
    // Reload bookmarks page if active
    if (appState.currentPage === 'bookmarks') {
        loadBookmarks();
    }
    
    // Update all grids to reflect bookmark status
    loadContent();
}

// Smooth Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar');
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add some animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe content cards as they load
setTimeout(() => {
    document.querySelectorAll('.content-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}, 100);
