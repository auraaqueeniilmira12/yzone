// frontend/js/rating.js
// Sistem rating dan review film

const RATINGS_KEY = 'yzone_ratings';
const REVIEWS_KEY = 'yzone_reviews';

// Get all ratings
function getAllRatings() {
    const ratings = localStorage.getItem(RATINGS_KEY);
    return ratings ? JSON.parse(ratings) : [];
}

// Get rating for a specific movie by current user
function getMovieRatingByUser(movieId, userId) {
    const ratings = getAllRatings();
    return ratings.find(r => r.movieId === parseInt(movieId) && r.userId === userId);
}

// Get all ratings for a movie
function getMovieRatings(movieId) {
    const ratings = getAllRatings();
    return ratings.filter(r => r.movieId === parseInt(movieId));
}

// Get average rating for a movie
function getMovieAverageRating(movieId) {
    const ratings = getMovieRatings(movieId);
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return sum / ratings.length;
}

// Get total ratings count for a movie
function getMovieRatingCount(movieId) {
    return getMovieRatings(movieId).length;
}

// Save or update rating
function saveRating(movieId, userId, rating) {
    const ratings = getAllRatings();
    const existingIndex = ratings.findIndex(r => r.movieId === parseInt(movieId) && r.userId === userId);
    
    if (existingIndex !== -1) {
        ratings[existingIndex].rating = rating;
        ratings[existingIndex].updatedAt = new Date().toISOString();
    } else {
        ratings.push({
            id: Date.now(),
            movieId: parseInt(movieId),
            userId: userId,
            rating: rating,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
    return { success: true };
}

// Delete rating
function deleteRating(movieId, userId) {
    let ratings = getAllRatings();
    ratings = ratings.filter(r => !(r.movieId === parseInt(movieId) && r.userId === userId));
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
    return { success: true };
}

// ========== REVIEW FUNCTIONS ==========

// Get all reviews
function getAllReviews() {
    const reviews = localStorage.getItem(REVIEWS_KEY);
    return reviews ? JSON.parse(reviews) : [];
}

// Get review for a specific movie by current user
function getMovieReviewByUser(movieId, userId) {
    const reviews = getAllReviews();
    return reviews.find(r => r.movieId === parseInt(movieId) && r.userId === userId);
}

// Get all reviews for a movie
function getMovieReviews(movieId) {
    const reviews = getAllReviews();
    return reviews.filter(r => r.movieId === parseInt(movieId)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Save or update review
function saveReview(movieId, userId, userName, userAvatar, content) {
    const reviews = getAllReviews();
    const existingIndex = reviews.findIndex(r => r.movieId === parseInt(movieId) && r.userId === userId);
    
    if (existingIndex !== -1) {
        reviews[existingIndex].content = content;
        reviews[existingIndex].updatedAt = new Date().toISOString();
    } else {
        reviews.push({
            id: Date.now(),
            movieId: parseInt(movieId),
            userId: userId,
            userName: userName,
            userAvatar: userAvatar,
            content: content,
            likes: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    return { success: true };
}

// Delete review
function deleteReview(reviewId, userId) {
    let reviews = getAllReviews();
    const review = reviews.find(r => r.id === reviewId);
    if (review && review.userId === userId) {
        reviews = reviews.filter(r => r.id !== reviewId);
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
        return { success: true };
    }
    return { success: false, message: 'Tidak dapat menghapus review' };
}

// Like review
function likeReview(reviewId, userId) {
    const reviews = getAllReviews();
    const reviewIndex = reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex !== -1) {
        if (!reviews[reviewIndex].likedBy) reviews[reviewIndex].likedBy = [];
        if (!reviews[reviewIndex].likedBy.includes(userId)) {
            reviews[reviewIndex].likedBy.push(userId);
            reviews[reviewIndex].likes = (reviews[reviewIndex].likes || 0) + 1;
            localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
            return { success: true };
        }
    }
    return { success: false, message: 'Sudah like' };
}

// Unlike review
function unlikeReview(reviewId, userId) {
    const reviews = getAllReviews();
    const reviewIndex = reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex !== -1) {
        if (reviews[reviewIndex].likedBy && reviews[reviewIndex].likedBy.includes(userId)) {
            reviews[reviewIndex].likedBy = reviews[reviewIndex].likedBy.filter(id => id !== userId);
            reviews[reviewIndex].likes = (reviews[reviewIndex].likes || 0) - 1;
            localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
            return { success: true };
        }
    }
    return { success: false, message: 'Belum like' };
}

// Export ke global
window.YZONE_RATING = {
    getMovieRatingByUser,
    getMovieRatings,
    getMovieAverageRating,
    getMovieRatingCount,
    saveRating,
    deleteRating,
    getAllRatings,
    getMovieReviewByUser,
    getMovieReviews,
    saveReview,
    deleteReview,
    likeReview,
    unlikeReview
};