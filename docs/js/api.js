// frontend/js/api.js
// Menggunakan mock data untuk sementara (tanpa backend)

// ========== MOVIES API ==========

// Get all movies
async function getAllMovies() {
    return window.MOCK_DATA.getAllMovies();
}

// Get movie by ID
async function getMovieById(id) {
    return window.MOCK_DATA.getMovieById(id);
}

// Search movies
async function searchMovies(query) {
    return window.MOCK_DATA.searchMovies(query);
}

// Get movies by genre
async function getMoviesByGenre(genre) {
    return window.MOCK_DATA.getMoviesByGenre(genre);
}

// Get top rated movies
async function getTopRatedMovies(limit = 5) {
    return window.MOCK_DATA.getTopRatedMovies(limit);
}

// Get movies by year
async function getMoviesByYear(year) {
    const all = window.MOCK_DATA.getAllMovies();
    return all.filter(movie => movie.year === parseInt(year));
}

// ========== WATCHLIST API ==========

// Get user watchlist
async function getWatchlist() {
    return window.MOCK_DATA.getWatchlist();
}

// Check if movie is in watchlist
async function isInWatchlist(movieId) {
    return window.MOCK_DATA.isInWatchlist(movieId);
}

// Add movie to watchlist
async function addToWatchlist(movieId, notes = '') {
    return window.MOCK_DATA.addToWatchlist(movieId, notes);
}

// Remove from watchlist
async function removeFromWatchlist(watchlistId) {
    return window.MOCK_DATA.removeFromWatchlist(watchlistId);
}

// Update watchlist notes
async function updateWatchlistNotes(watchlistId, notes) {
    return window.MOCK_DATA.updateWatchlistNotes(watchlistId, notes);
}

// Check health server (mock selalu true)
async function checkHealth() {
    return true;
}

// Export semua fungsi (untuk penggunaan di file lain)
window.YZONE_API = {
    // Movies
    getAllMovies,
    getMovieById,
    searchMovies,
    getMoviesByGenre,
    getTopRatedMovies,
    getMoviesByYear,
    
    // Watchlist
    getWatchlist,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    updateWatchlistNotes,
    
    // Utils
    checkHealth
};