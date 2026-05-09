// frontend/js/utils.js
// Fungsi-fungsi pembantu untuk frontend

// Format angka menjadi format ribuan (misal: 1000 -> 1.000)
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Truncate text
function truncateText(text, maxLength = 120) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Format date ke format lokal
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format rating (misal: 8.5 -> 8.5/10)
function formatRating(rating) {
    if (!rating && rating !== 0) return 'N/A';
    return rating.toFixed(1) + '/10';
}

// Generate bintang berdasarkan rating (untuk display)
function getStarRating(rating) {
    const starCount = Math.floor(rating / 2);
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < starCount) {
            stars += '<i class="fas fa-star" style="color: #ffc107;"></i>';
        } else {
            stars += '<i class="fas fa-star" style="color: #333;"></i>';
        }
    }
    return stars;
}

// Debounce function (untuk search input)
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Show loading spinner pada element tertentu
function showLoading(element) {
    if (element) {
        element.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
    }
}

// Hide loading (tampilkan konten)
function hideLoading(element, content) {
    if (element && content) {
        element.innerHTML = content;
    }
}

// Show error message
function showError(element, message = 'Terjadi kesalahan. Silakan coba lagi.') {
    if (element) {
        element.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 40px; color: #e50914;">
                <p><i class="fas fa-exclamation-triangle"></i> ${message}</p>
            </div>
        `;
    }
}

// Get URL parameter by name
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Save to localStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Get from localStorage
function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Remove from localStorage
function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

// Show notification (toast) dengan icon
function showNotification(message, type = 'success') {
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        `;
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = '';
    let bgColor = '#e50914'; // default merah (success)
    
    if (type === 'success') {
        icon = '<i class="fas fa-check-circle"></i> ';
        bgColor = '#e50914';
    } else if (type === 'error') {
        icon = '<i class="fas fa-exclamation-circle"></i> ';
        bgColor = '#dc3545';
    } else if (type === 'info') {
        icon = '<i class="fas fa-info-circle"></i> ';
        bgColor = '#1a1a1a';
    } else if (type === 'warning') {
        icon = '<i class="fas fa-exclamation-triangle"></i> ';
        bgColor = '#ffc107';
    }
    
    notification.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 12px 20px;
        margin-top: 10px;
        border-radius: 8px;
        font-size: 14px;
        animation: slideIn 0.3s ease;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.innerHTML = icon + message;
    
    container.appendChild(notification);
    
    // Auto remove setelah 3 detik
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
    
    // Klik untuk close
    notification.onclick = () => {
        if (notification.parentNode) {
            notification.remove();
        }
    };
}

// Tambahkan animation keyframes jika belum ada
if (!document.querySelector('#notification-style')) {
    const style = document.createElement('style');
    style.id = 'notification-style';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========== SKELETON LOADING FUNCTIONS ==========

// Show skeleton loading untuk movies grid
function showSkeletonMovies(container, count = 8) {
    if (!container) return;
    
    let skeletonHtml = '<div class="skeleton-grid">';
    for (let i = 0; i < count; i++) {
        skeletonHtml += `
            <div class="skeleton-card">
                <div class="skeleton-poster"></div>
                <div class="skeleton-info">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-year"></div>
                    <div class="skeleton-rating"></div>
                    <div class="skeleton-button"></div>
                </div>
            </div>
        `;
    }
    skeletonHtml += '</div>';
    
    container.innerHTML = skeletonHtml;
}

// Show skeleton loading untuk detail page
function showSkeletonDetail(container) {
    if (!container) return;
    
    const skeletonHtml = `
        <div class="skeleton-detail">
            <div class="skeleton-poster-large"></div>
            <div class="skeleton-info-section">
                <div class="skeleton-text-line title"></div>
                <div class="skeleton-text-line medium"></div>
                <div class="skeleton-text-line"></div>
                <div class="skeleton-text-line"></div>
                <div class="skeleton-text-line large"></div>
            </div>
        </div>
    `;
    
    container.innerHTML = skeletonHtml;
}

// Show skeleton loading untuk actors grid
function showSkeletonActors(container, count = 12) {
    if (!container) return;
    
    let skeletonHtml = '<div class="skeleton-actors-grid">';
    for (let i = 0; i < count; i++) {
        skeletonHtml += `
            <div class="skeleton-actor-card">
                <div class="skeleton-actor-photo"></div>
                <div class="skeleton-actor-info">
                    <div class="skeleton-actor-name"></div>
                </div>
            </div>
        `;
    }
    skeletonHtml += '</div>';
    
    container.innerHTML = skeletonHtml;
}

// ========== SEARCH HISTORY FUNCTIONS ==========

const SEARCH_HISTORY_KEY = 'yzone_search_history';
const MAX_HISTORY_ITEMS = 10;

// Get search history dari localStorage
function getSearchHistory() {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

// Save search history ke localStorage
function saveSearchHistory(history) {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
}

// Tambah keyword ke search history
function addToSearchHistory(keyword, source = 'home') {
    if (!keyword || keyword.trim() === '') return;
    
    const history = getSearchHistory();
    const newItem = {
        id: Date.now(),
        keyword: keyword.trim(),
        source: source,
        timestamp: new Date().toISOString()
    };
    
    // Hapus duplikat jika sudah ada keyword yang sama
    const existingIndex = history.findIndex(item => item.keyword === keyword.trim());
    if (existingIndex !== -1) {
        history.splice(existingIndex, 1);
    }
    
    // Tambah di awal
    history.unshift(newItem);
    
    // Batasi maksimal 10 item
    if (history.length > MAX_HISTORY_ITEMS) {
        history.pop();
    }
    
    saveSearchHistory(history);
    return history;
}

// Hapus satu item dari search history
function removeFromSearchHistory(id) {
    let history = getSearchHistory();
    history = history.filter(item => item.id !== id);
    saveSearchHistory(history);
    return history;
}

// Clear semua search history
function clearSearchHistory() {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    return [];
}

// Format waktu relatif
function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString('id-ID');
}

// Escape HTML
function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Perform search from history item
function performSearchFromHistory(keyword) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = keyword;
        // Trigger search event
        const event = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(event);
        
        // Close history dropdown
        const historyContainer = document.getElementById('search-history-container');
        if (historyContainer) {
            historyContainer.style.display = 'none';
        }
    }
}

// Render search history ke HTML
function renderSearchHistory(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const history = getSearchHistory();
    
    if (history.length === 0) {
        container.innerHTML = `
            <div class="search-history-empty">
                <i class="fas fa-history"></i>
                <p>Belum ada riwayat pencarian</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="search-history-header">
            <span><i class="fas fa-history"></i> Riwayat Pencarian</span>
            <button class="clear-history-btn" onclick="clearAllSearchHistory()">
                <i class="fas fa-trash"></i> Hapus Semua
            </button>
        </div>
        <div class="search-history-list">
    `;
    
    for (const item of history) {
        const date = new Date(item.timestamp);
        const timeAgo = getTimeAgo(date);
        
        html += `
            <div class="search-history-item" data-keyword="${escapeHtml(item.keyword)}">
                <div class="history-keyword" onclick="performSearchFromHistory('${escapeHtml(item.keyword)}')">
                    <i class="fas fa-search"></i>
                    <span>${escapeHtml(item.keyword)}</span>
                </div>
                <div class="history-meta">
                    <span class="history-time">${timeAgo}</span>
                    <button class="remove-history-btn" onclick="removeSearchHistoryItem(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    html += `</div>`;
    container.innerHTML = html;
}

// Remove single history item
function removeSearchHistoryItem(id) {
    removeFromSearchHistory(id);
    renderSearchHistory('search-history-container');
    showNotification('Riwayat dihapus', 'success');
}

// Clear all history
function clearAllSearchHistory() {
    if (confirm('Hapus semua riwayat pencarian?')) {
        clearSearchHistory();
        renderSearchHistory('search-history-container');
        showNotification('Semua riwayat pencarian dihapus', 'success');
    }
}

// Toggle search history dropdown
function toggleSearchHistory() {
    const container = document.getElementById('search-history-container');
    if (!container) return;
    
    if (container.style.display === 'none' || !container.style.display) {
        renderSearchHistory('search-history-container');
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

// Close search history when clicking outside
document.addEventListener('click', function(e) {
    const container = document.getElementById('search-history-container');
    const searchWrapper = document.querySelector('.search-wrapper');
    if (container && searchWrapper && !searchWrapper.contains(e.target)) {
        container.style.display = 'none';
    }
});

// Make functions global
window.getSearchHistory = getSearchHistory;
window.addToSearchHistory = addToSearchHistory;
window.removeFromSearchHistory = removeFromSearchHistory;
window.clearSearchHistory = clearSearchHistory;
window.renderSearchHistory = renderSearchHistory;
window.performSearchFromHistory = performSearchFromHistory;
window.removeSearchHistoryItem = removeSearchHistoryItem;
window.clearAllSearchHistory = clearAllSearchHistory;
window.toggleSearchHistory = toggleSearchHistory;