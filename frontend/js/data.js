// frontend/js/data.js
// Mock data untuk sementara (tanpa backend)

let MOCK_MOVIES = [];


// Data film default
const DEFAULT_MOVIES = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        genre: "Drama",
        director: "Frank Darabont",
        rating: 9.3,
        poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        backdrop: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
        drive_link: "",
        cast: [
            { name: "Tim Robbins", character: "Andy Dufresne", photo: "/frontend/images/Tim Robbins.png" },
            { name: "Morgan Freeman", character: "Ellis Boyd 'Red' Redding", photo: "https://image.tmdb.org/t/p/w185/oRZ1N9EOqWi2N6jD45UBpG8HSCQ.jpg" },
            { name: "Bob Gunton", character: "Warden Norton", photo: "https://image.tmdb.org/t/p/w185/5IxJpgICgGcXQWHZ7zdAX5HkAfJ.jpg" },
            { name: "William Sadler", character: "Heywood", photo: "https://image.tmdb.org/t/p/w185/hZEFGQx8cQrZgqMlv9LWb2IruxH.jpg" },
            { name: "Clancy Brown", character: "Captain Hadley", photo: "https://image.tmdb.org/t/p/w185/oS2yT3y9nWnM3p4z3V3rV3rV3rV.jpg" }
        ]
    },
    {
        id: 2,
        title: "The Godfather",
        year: 1972,
        genre: "Crime, Drama",
        director: "Francis Ford Coppola",
        rating: 9.2,
        poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        backdrop: "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
        drive_link: "",
        cast: [
            { name: "Marlon Brando", character: "Don Vito Corleone", photo: "https://image.tmdb.org/t/p/w185/6UZdr1MbL6KYaTkDynLT2d2Viw9.jpg" },
            { name: "Al Pacino", character: "Michael Corleone", photo: "https://image.tmdb.org/t/p/w185/3qS5z6MjsWX9HtUdF3sYJfPVLfs.jpg" },
            { name: "James Caan", character: "Sonny Corleone", photo: "https://image.tmdb.org/t/p/w185/h7u9rQ4MpLwL7w0rN3QxL8Z3Q0K.jpg" },
            { name: "Richard S. Castellano", character: "Peter Clemenza", photo: "https://image.tmdb.org/t/p/w185/9tZx5qLm5xXyQ5g5Y0zP3dYcV4.jpg" },
            { name: "Robert Duvall", character: "Tom Hagen", photo: "https://image.tmdb.org/t/p/w185/7vZ6VudNwGQY7gB8Kw3dMq6nG8C.jpg" }
        ]
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        genre: "Action, Crime, Drama",
        director: "Christopher Nolan",
        rating: 9.0,
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        backdrop: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
        drive_link: "",
        cast: [
            { name: "Christian Bale", character: "Bruce Wayne / Batman", photo: "https://image.tmdb.org/t/p/w185/qCpZn2e3tmwbYelWgVqKp86XyLl.jpg" },
            { name: "Heath Ledger", character: "Joker", photo: "https://image.tmdb.org/t/p/w185/6e4Cj8V3f2hX6j8Yy0h2V7pY8gR.jpg" },
            { name: "Aaron Eckhart", character: "Harvey Dent", photo: "https://image.tmdb.org/t/p/w185/7Vp0LZb8q9sXy9L9v0R8c2dM8gK.jpg" },
            { name: "Michael Caine", character: "Alfred Pennyworth", photo: "https://image.tmdb.org/t/p/w185/8yNk6lZ8cN8v4qY6rZ8p2dN8r6K.jpg" },
            { name: "Gary Oldman", character: "James Gordon", photo: "https://image.tmdb.org/t/p/w185/2v9pVYQY2v0xWnQ6L6p6x6Y6v6K.jpg" }
        ]
    },
    {
        id: 4,
        title: "Pulp Fiction",
        year: 1994,
        genre: "Crime, Drama",
        director: "Quentin Tarantino",
        rating: 8.9,
        poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        backdrop: "https://image.tmdb.org/t/p/original/sW9q4fQc8YkX5vY8yN4qZ8x2k8L.jpg",
        drive_link: "",
        cast: [
            { name: "John Travolta", character: "Vincent Vega", photo: "https://image.tmdb.org/t/p/w185/5qVxV0qy0qV5V5V5V5V5V5V5V5.jpg" },
            { name: "Samuel L. Jackson", character: "Jules Winnfield", photo: "https://image.tmdb.org/t/p/w185/8yNk6lZ8cN8v4qY6rZ8p2dN8r6K.jpg" },
            { name: "Uma Thurman", character: "Mia Wallace", photo: "https://image.tmdb.org/t/p/w185/7Vp0LZb8q9sXy9L9v0R8c2dM8gK.jpg" },
            { name: "Bruce Willis", character: "Butch Coolidge", photo: "https://image.tmdb.org/t/p/w185/9tZx5qLm5xXyQ5g5Y0zP3dYcV4.jpg" },
            { name: "Ving Rhames", character: "Marsellus Wallace", photo: "https://image.tmdb.org/t/p/w185/h7u9rQ4MpLwL7w0rN3QxL8Z3Q0K.jpg" }
        ]
    },
    {
        id: 5,
        title: "Forrest Gump",
        year: 1994,
        genre: "Drama, Romance",
        director: "Robert Zemeckis",
        rating: 8.8,
        poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
        backdrop: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        drive_link: "",
        cast: [
            { name: "Tom Hanks", character: "Forrest Gump", photo: "https://image.tmdb.org/t/p/w185/8yNk6lZ8cN8v4qY6rZ8p2dN8r6K.jpg" },
            { name: "Robin Wright", character: "Jenny Curran", photo: "https://image.tmdb.org/t/p/w185/7Vp0LZb8q9sXy9L9v0R8c2dM8gK.jpg" },
            { name: "Gary Sinise", character: "Lt. Dan Taylor", photo: "https://image.tmdb.org/t/p/w185/9tZx5qLm5xXyQ5g5Y0zP3dYcV4.jpg" },
            { name: "Mykelti Williamson", character: "Bubba Blue", photo: "https://image.tmdb.org/t/p/w185/h7u9rQ4MpLwL7w0rN3QxL8Z3Q0K.jpg" },
            { name: "Sally Field", character: "Mrs. Gump", photo: "https://image.tmdb.org/t/p/w185/3qS5z6MjsWX9HtUdF3sYJfPVLfs.jpg" }
        ]
    },
    {
        id: 6,
        title: "Inception",
        year: 2010,
        genre: "Action, Sci-Fi, Thriller",
        director: "Christopher Nolan",
        rating: 8.8,
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team.",
        backdrop: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
        drive_link: "",
        cast: [
            { name: "Leonardo DiCaprio", character: "Dom Cobb", photo: "https://image.tmdb.org/t/p/w185/8yNk6lZ8cN8v4qY6rZ8p2dN8r6K.jpg" },
            { name: "Joseph Gordon-Levitt", character: "Arthur", photo: "https://image.tmdb.org/t/p/w185/7Vp0LZb8q9sXy9L9v0R8c2dM8gK.jpg" },
            { name: "Elliot Page", character: "Ariadne", photo: "https://image.tmdb.org/t/p/w185/9tZx5qLm5xXyQ5g5Y0zP3dYcV4.jpg" },
            { name: "Tom Hardy", character: "Eames", photo: "https://image.tmdb.org/t/p/w185/h7u9rQ4MpLwL7w0rN3QxL8Z3Q0K.jpg" },
            { name: "Ken Watanabe", character: "Saito", photo: "https://image.tmdb.org/t/p/w185/3qS5z6MjsWX9HtUdF3sYJfPVLfs.jpg" },
            { name: "Cillian Murphy", character: "Robert Fischer", photo: "https://image.tmdb.org/t/p/w185/6e4Cj8V3f2hX6j8Yy0h2V7pY8gR.jpg" }
        ]
    },
    {
        id: 7,
        title: "The Matrix",
        year: 1999,
        genre: "Action, Sci-Fi",
        director: "Lana Wachowski, Lilly Wachowski",
        rating: 8.7,
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        backdrop: "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
        drive_link: "",
        cast: [
            { name: "Keanu Reeves", character: "Neo", photo: "https://image.tmdb.org/t/p/w185/8yNk6lZ8cN8v4qY6rZ8p2dN8r6K.jpg" },
            { name: "Laurence Fishburne", character: "Morpheus", photo: "https://image.tmdb.org/t/p/w185/7Vp0LZb8q9sXy9L9v0R8c2dM8gK.jpg" },
            { name: "Carrie-Anne Moss", character: "Trinity", photo: "https://image.tmdb.org/t/p/w185/9tZx5qLm5xXyQ5g5Y0zP3dYcV4.jpg" },
            { name: "Hugo Weaving", character: "Agent Smith", photo: "https://image.tmdb.org/t/p/w185/h7u9rQ4MpLwL7w0rN3QxL8Z3Q0K.jpg" },
            { name: "Joe Pantoliano", character: "Cypher", photo: "https://image.tmdb.org/t/p/w185/3qS5z6MjsWX9HtUdF3sYJfPVLfs.jpg" }
        ]
    },
    {
        id: 8,
        title: "Interstellar",
        year: 2014,
        genre: "Adventure, Drama, Sci-Fi",
        director: "Christopher Nolan",
        rating: 8.6,
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        backdrop: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
        drive_link: "",
        cast: [
            { name: "Matthew McConaughey", character: "Cooper", photo: "https://image.tmdb.org/t/p/w185/8yNk6lZ8cN8v4qY6rZ8p2dN8r6K.jpg" },
            { name: "Anne Hathaway", character: "Brand", photo: "https://image.tmdb.org/t/p/w185/7Vp0LZb8q9sXy9L9v0R8c2dM8gK.jpg" },
            { name: "Jessica Chastain", character: "Murph", photo: "https://image.tmdb.org/t/p/w185/9tZx5qLm5xXyQ5g5Y0zP3dYcV4.jpg" },
            { name: "Michael Caine", character: "Professor Brand", photo: "https://image.tmdb.org/t/p/w185/h7u9rQ4MpLwL7w0rN3QxL8Z3Q0K.jpg" },
            { name: "Matt Damon", character: "Dr. Mann", photo: "https://image.tmdb.org/t/p/w185/3qS5z6MjsWX9HtUdF3sYJfPVLfs.jpg" },
            { name: "Mackenzie Foy", character: "Young Murph", photo: "https://image.tmdb.org/t/p/w185/6e4Cj8V3f2hX6j8Yy0h2V7pY8gR.jpg" }
        ]
    }
];

// Fungsi untuk load data film dari localStorage
function loadMoviesFromStorage() {
    const saved = localStorage.getItem('yzone_movies_data');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                MOCK_MOVIES.length = 0;
                parsed.forEach(movie => MOCK_MOVIES.push(movie));
                return;
            }
        } catch(e) {
            console.error('Error loading movies from storage:', e);
        }
    }
    // Jika tidak ada di storage, pakai default
    MOCK_MOVIES.length = 0;
    DEFAULT_MOVIES.forEach(movie => MOCK_MOVIES.push(movie));
    saveMoviesToStorage();
}

// Fungsi untuk menyimpan data film ke localStorage
function saveMoviesToStorage() {
    localStorage.setItem('yzone_movies_data', JSON.stringify(MOCK_MOVIES));
}

// Mock watchlist (disimpan di localStorage biar tetap ada setelah refresh)
let MOCK_WATCHLIST = [];

// Load watchlist dari localStorage
function loadWatchlistFromStorage() {
    const saved = localStorage.getItem('yzone_mock_watchlist');
    if (saved) {
        MOCK_WATCHLIST = JSON.parse(saved);
    } else {
        MOCK_WATCHLIST = [
            {
                watchlistId: 1,
                movieId: 2,
                addedAt: new Date().toISOString(),
                notes: "Belum nonton, katanya masterpiece"
            },
            {
                watchlistId: 2,
                movieId: 3,
                addedAt: new Date().toISOString(),
                notes: "Pengen rewatch"
            }
        ];
        saveWatchlistToStorage();
    }
}

// Simpan watchlist ke localStorage
function saveWatchlistToStorage() {
    localStorage.setItem('yzone_mock_watchlist', JSON.stringify(MOCK_WATCHLIST));
}

// ========== MOCK FUNCTIONS ==========

// Ambil semua film
function mockGetAllMovies() {
    return MOCK_MOVIES;
}

// Ambil film berdasarkan ID
function mockGetMovieById(id) {
    return MOCK_MOVIES.find(movie => movie.id === parseInt(id));
}

// Cari film
function mockSearchMovies(query) {
    const q = query.toLowerCase();
    return MOCK_MOVIES.filter(movie => 
        movie.title.toLowerCase().includes(q) ||
        movie.genre.toLowerCase().includes(q) ||
        movie.director.toLowerCase().includes(q)
    );
}

// Ambil film berdasarkan genre
function mockGetMoviesByGenre(genre) {
    return MOCK_MOVIES.filter(movie => 
        movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
}

// Ambil top rated movies
function mockGetTopRatedMovies(limit = 5) {
    return [...MOCK_MOVIES].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

// Ambil watchlist user
function mockGetWatchlist() {
    return MOCK_WATCHLIST.map(item => {
        const movie = mockGetMovieById(item.movieId);
        return {
            watchlistId: item.watchlistId,
            addedAt: item.addedAt,
            notes: item.notes,
            movie: movie
        };
    });
}

// Cek apakah film di watchlist
function mockIsInWatchlist(movieId) {
    return MOCK_WATCHLIST.some(item => item.movieId === parseInt(movieId));
}

// Tambah ke watchlist
function mockAddToWatchlist(movieId, notes = "") {
    if (mockIsInWatchlist(movieId)) {
        return { success: false, message: "Film already in watchlist" };
    }
    
    const newId = MOCK_WATCHLIST.length > 0 ? Math.max(...MOCK_WATCHLIST.map(w => w.watchlistId)) + 1 : 1;
    
    const newItem = {
        watchlistId: newId,
        movieId: parseInt(movieId),
        addedAt: new Date().toISOString(),
        notes: notes
    };
    
    MOCK_WATCHLIST.push(newItem);
    saveWatchlistToStorage();
    
    return { 
        success: true, 
        data: {
            watchlistId: newId,
            movie: mockGetMovieById(movieId),
            notes: notes,
            addedAt: newItem.addedAt
        }
    };
}

// Hapus dari watchlist
function mockRemoveFromWatchlist(watchlistId) {
    const index = MOCK_WATCHLIST.findIndex(item => item.watchlistId === parseInt(watchlistId));
    
    if (index === -1) {
        return { success: false, message: "Watchlist item not found" };
    }
    
    MOCK_WATCHLIST.splice(index, 1);
    saveWatchlistToStorage();
    
    return { success: true };
}

// Update notes
function mockUpdateWatchlistNotes(watchlistId, notes) {
    const item = MOCK_WATCHLIST.find(item => item.watchlistId === parseInt(watchlistId));
    
    if (!item) {
        return { success: false, message: "Watchlist item not found" };
    }
    
    item.notes = notes;
    saveWatchlistToStorage();
    
    return { success: true };
}

// Update movies (untuk admin dashboard)
function mockUpdateMovies(movies) {
    MOCK_MOVIES.length = 0;
    movies.forEach(m => MOCK_MOVIES.push(m));
    saveMoviesToStorage();
    console.log('Movies updated:', MOCK_MOVIES.length);
}


// ========== INITIALIZE ==========
loadMoviesFromStorage();
loadWatchlistFromStorage();

// ========== EXPORT KE GLOBAL ==========
window.MOCK_DATA = {
    getAllMovies: mockGetAllMovies,
    getMovieById: mockGetMovieById,
    searchMovies: mockSearchMovies,
    getMoviesByGenre: mockGetMoviesByGenre,
    getTopRatedMovies: mockGetTopRatedMovies,
    getWatchlist: mockGetWatchlist,
    isInWatchlist: mockIsInWatchlist,
    addToWatchlist: mockAddToWatchlist,
    removeFromWatchlist: mockRemoveFromWatchlist,
    updateWatchlistNotes: mockUpdateWatchlistNotes,
    updateMovies: mockUpdateMovies
};

console.log('Data.js loaded. Total movies:', MOCK_MOVIES.length);

