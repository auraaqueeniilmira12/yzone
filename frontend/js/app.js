// frontend/js/app.js
// Main JavaScript untuk halaman index.html (home)

// Global variables
let allMovies = [];
let topRatedMovies = [];

// DOM Elements
const topRatedContainer = document.getElementById('top-rated-movies');
const recommendedContainer = document.getElementById('recommended-movies');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const totalMoviesSpan = document.getElementById('total-movies');
const totalGenresSpan = document.getElementById('total-genres');
const watchlistCountSpan = document.getElementById('watchlist-count');

// Initialize page
async function initHomePage() {
    try {
        // Load data
        await loadTopRatedMovies();
        await loadRecommendedMovies();
        await loadStats();
        
        // Setup search event listeners
        setupSearch();
        
    } catch (error) {
        console.error('Init home page error:', error);
        if (topRatedContainer) {
            showError(topRatedContainer, 'Gagal memuat data. Silakan refresh halaman.');
        }
    }
}

// Load top rated movies
async function loadTopRatedMovies() {
    if (!topRatedContainer) return;
    
    try {
        showLoading(topRatedContainer);
        topRatedMovies = await YZONE_API.getTopRatedMovies(8);
        
        if (!topRatedMovies || topRatedMovies.length === 0) {
            topRatedContainer.innerHTML = '<p class="no-data">Tidak ada data film</p>';
            return;
        }
        
        // Render movies grid
        let html = '<div class="movies-grid">';
        for (const movie of topRatedMovies) {
            const inWatchlist = await YZONE_WATCHLIST.isMovieInWatchlist(movie.id);
            html += renderMovieCard(movie, inWatchlist);
        }
        html += '</div>';
        
        // Add View All button
        html += `
            <div class="view-all-container">
                <a href="/frontend/pages/movies.html" class="view-all-btn">
                    <i class="fas fa-film"></i> Lihat Semua Film
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        topRatedContainer.innerHTML = html;
        
        // Attach event listeners to movie cards
        attachMovieCardEvents();
        
    } catch (error) {
        console.error('Load top rated error:', error);
        showError(topRatedContainer, 'Gagal memuat film rating tertinggi');
    }
}

// Load recommended movies (random selection)
async function loadRecommendedMovies() {
    if (!recommendedContainer) return;
    
    try {
        showLoading(recommendedContainer);
        const allMoviesData = await YZONE_API.getAllMovies();
        
        if (!allMoviesData || allMoviesData.length === 0) {
            recommendedContainer.innerHTML = '<p class="no-data">Tidak ada data film</p>';
            return;
        }
        
        // Random pick 4 movies for recommendation
        const shuffled = [...allMoviesData];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const recommended = shuffled.slice(0, 4);
        
        // Render movies
        let html = '<div class="movies-grid">';
        for (const movie of recommended) {
            const inWatchlist = await YZONE_WATCHLIST.isMovieInWatchlist(movie.id);
            html += renderMovieCard(movie, inWatchlist);
        }
        html += '</div>';
        
        recommendedContainer.innerHTML = html;
        
        // Attach event listeners
        attachMovieCardEvents();
        
    } catch (error) {
        console.error('Load recommended error:', error);
        showError(recommendedContainer, 'Gagal memuat rekomendasi film');
    }
}

// Render single movie card
function renderMovieCard(movie, inWatchlist = false) {
    const watchlistBtnText = inWatchlist ? 'In Watchlist' : 'Add to Watchlist';
    const watchlistBtnClass = inWatchlist ? 'watchlist-btn active' : 'watchlist-btn';
    const watchlistIcon = inWatchlist ? 'fa-check' : 'fa-plus';
    
    return `
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" onerror="this.src='/frontend/assets/images/placeholder.jpg'">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-year">${movie.year}</p>
                <div class="movie-rating">
                    <i class="fas fa-star"></i> ${movie.rating}/10
                </div>
                <button class="${watchlistBtnClass}" data-id="${movie.id}">
                    <i class="fas ${watchlistIcon}"></i> ${watchlistBtnText}
                </button>
            </div>
        </div>
    `;
}

// Attach event listeners to movie cards
function attachMovieCardEvents() {
    // Click on movie card (go to detail page)
    document.querySelectorAll('.movie-card').forEach(card => {
        const movieId = card.getAttribute('data-movie-id');
        card.addEventListener('click', (e) => {
            // Jangan trigger jika yang diklik adalah button
            if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
                window.location.href = `/frontend/pages/detail.html?id=${movieId}`;
            }
        });
    });
    
    // Watchlist button
    document.querySelectorAll('.watchlist-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const movieId = btn.getAttribute('data-id');
            const isActive = btn.classList.contains('active');
            
            if (isActive) {
                // Remove from watchlist - need to get watchlistId first
                const watchlist = await YZONE_WATCHLIST.getWatchlist();
                const item = watchlist.find(w => w.movie && w.movie.id === parseInt(movieId));
                if (item) {
                    await YZONE_WATCHLIST.removeMovieFromWatchlist(item.watchlistId);
                    btn.classList.remove('active');
                    btn.innerHTML = '<i class="fas fa-plus"></i> Add to Watchlist';
                }
            } else {
                // Add to watchlist
                await YZONE_WATCHLIST.addMovieToWatchlist(movieId);
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-check"></i> In Watchlist';
            }
            
            // Update watchlist count in stats
            await updateWatchlistCountDisplay();
        });
    });
}

// Load stats (total movies, genres, watchlist count)
async function loadStats() {
    try {
        // Total movies
        const movies = await YZONE_API.getAllMovies();
        if (totalMoviesSpan && movies) {
            totalMoviesSpan.textContent = movies.length;
        }
        
        // Total genres (unique)
        if (totalGenresSpan && movies) {
            const genres = new Set();
            movies.forEach(movie => {
                movie.genre.split(',').forEach(g => genres.add(g.trim()));
            });
            totalGenresSpan.textContent = genres.size;
        }
        
        // Watchlist count
        await updateWatchlistCountDisplay();
        
    } catch (error) {
        console.error('Load stats error:', error);
    }
}

// Update watchlist count display
async function updateWatchlistCountDisplay() {
    if (watchlistCountSpan) {
        const count = await YZONE_WATCHLIST.getWatchlistCount();
        watchlistCountSpan.textContent = count;
    }
}

// Setup search functionality
function setupSearch() {
    if (!searchInput || !searchBtn) return;
    
    const performSearch = debounce(async () => {
        const query = searchInput.value.trim();
        
        if (!query) {
            searchResults.style.display = 'none';
            return;
        }
        
        try {
            const results = await YZONE_API.searchMovies(query);
            
            if (!results || results.length === 0) {
                searchResults.innerHTML = `
                    <div class="search-result-item">
                        <i class="fas fa-search"></i>
                        <span>Tidak ada film yang ditemukan untuk "${query}"</span>
                    </div>
                `;
            } else {
                let html = '';
                results.slice(0, 5).forEach(movie => {
                    html += `
                        <div class="search-result-item" data-id="${movie.id}">
                            <i class="fas fa-film"></i>
                            <span class="search-result-title">${movie.title}</span>
                            <span class="search-result-year">(${movie.year})</span>
                            <span class="search-result-rating"><i class="fas fa-star"></i> ${movie.rating}</span>
                        </div>
                    `;
                });
                searchResults.innerHTML = html;
                
                // Add click event to search results
                document.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const movieId = item.getAttribute('data-id');
                        window.location.href = `/frontend/pages/detail.html?id=${movieId}`;
                    });
                });
            }
            
            searchResults.style.display = 'block';
            
        } catch (error) {
            console.error('Search error:', error);
            searchResults.innerHTML = '<div class="search-result-item">Error searching movies</div>';
            searchResults.style.display = 'block';
        }
    }, 500);
    
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
    
    // Click outside to close search results
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Debounce function
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Run init when DOM ready
document.addEventListener('DOMContentLoaded', initHomePage);