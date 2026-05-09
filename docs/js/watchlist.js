// frontend/js/watchlist.js

let cachedWatchlist = null;

async function getWatchlistWithCache(forceRefresh = false) {
    if (forceRefresh || !cachedWatchlist) {
        try {
            if (window.MOCK_DATA && window.MOCK_DATA.getWatchlist) {
                cachedWatchlist = await window.MOCK_DATA.getWatchlist();
            } else {
                console.error('MOCK_DATA not found');
                cachedWatchlist = [];
            }
            localStorage.setItem('yzone_watchlist', JSON.stringify(cachedWatchlist));
        } catch (error) {
            console.error('Failed to fetch watchlist:', error);
            const saved = localStorage.getItem('yzone_watchlist');
            cachedWatchlist = saved ? JSON.parse(saved) : [];
        }
    }
    return cachedWatchlist;
}

async function isMovieInWatchlist(movieId) {
    const watchlist = await getWatchlistWithCache();
    return watchlist.some(item => item.movie && item.movie.id === parseInt(movieId));
}

async function addMovieToWatchlist(movieId, notes = '') {
    try {
        const result = window.MOCK_DATA.addToWatchlist(movieId, notes);
        if (result.success) {
            cachedWatchlist = null;
            await getWatchlistWithCache(true);
            showNotification('Film berhasil ditambahkan ke watchlist!', 'success');
            return { success: true, data: result.data };
        } else {
            showNotification(result.message || 'Gagal menambahkan film', 'error');
            return { success: false, message: result.message };
        }
    } catch (error) {
        console.error('Add to watchlist error:', error);
        showNotification('Terjadi kesalahan', 'error');
        return { success: false, message: error.message };
    }
}

async function removeMovieFromWatchlist(watchlistId) {
    try {
        const result = window.MOCK_DATA.removeFromWatchlist(watchlistId);
        if (result.success) {
            cachedWatchlist = null;
            await getWatchlistWithCache(true);
            showNotification('Film berhasil dihapus dari watchlist', 'success');
            return { success: true };
        } else {
            showNotification(result.message || 'Gagal menghapus film', 'error');
            return { success: false, message: result.message };
        }
    } catch (error) {
        console.error('Remove from watchlist error:', error);
        showNotification('Terjadi kesalahan', 'error');
        return { success: false, message: error.message };
    }
}

async function updateWatchlistNote(watchlistId, notes) {
    try {
        const result = window.MOCK_DATA.updateWatchlistNotes(watchlistId, notes);
        if (result.success) {
            cachedWatchlist = null;
            await getWatchlistWithCache(true);
            showNotification('Catatan berhasil disimpan!', 'success');
            return { success: true };
        } else {
            showNotification(result.message || 'Gagal menyimpan catatan', 'error');
            return { success: false, message: result.message };
        }
    } catch (error) {
        console.error('Update notes error:', error);
        showNotification('Terjadi kesalahan', 'error');
        return { success: false, message: error.message };
    }
}

async function renderWatchlist(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
        container.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading watchlist...</p>
            </div>
        `;
        
        const watchlist = await getWatchlistWithCache();
        
        if (!watchlist || watchlist.length === 0) {
            container.innerHTML = `
                <div class="empty-watchlist">
                    <h3>Watchlist Kosong</h3>
                    <p>Belum ada film di watchlist kamu. Yuk tambahin film favoritmu!</p>
                    <a href="/frontend/pages/movies.html" class="btn btn-primary" style="margin-top: 20px;">Explore Movies</a>
                </div>
            `;
            return;
        }
        
        let html = '<div class="watchlist-grid">';
        for (const item of watchlist) {
            const movie = item.movie;
            html += `
                <div class="watchlist-card" data-watchlist-id="${item.watchlistId}" data-movie-id="${movie.id}">
                    <img src="${movie.poster}" alt="${movie.title}" class="watchlist-poster" onerror="this.src='/frontend/assets/images/placeholder.jpg'">
                    <div class="watchlist-info">
                        <h4 class="watchlist-title">${movie.title}</h4>
                        <p class="watchlist-year">${movie.year} | ${movie.genre.split(',')[0]}</p>
                        <div class="watchlist-rating"><i class="fas fa-star"></i> ${movie.rating}/10</div>
                        
                        <div class="watchlist-notes-section">
                            <label class="notes-label">Catatan:</label>
                            <div class="notes-display" id="notes-display-${item.watchlistId}">
                                <span class="notes-text">${item.notes || 'Tidak ada catatan'}</span>
                                <button class="btn-edit-note" data-id="${item.watchlistId}">
                                    <i class="fas fa-pencil-alt"></i> Edit
                                </button>
                            </div>
                            <div class="notes-edit" id="notes-edit-${item.watchlistId}" style="display: none;">
                                <textarea class="notes-textarea" id="notes-textarea-${item.watchlistId}" rows="2" placeholder="Tulis catatan untuk film ini...">${item.notes || ''}</textarea>
                                <div class="notes-edit-buttons">
                                    <button class="btn-save-note" data-id="${item.watchlistId}">
                                        <i class="fas fa-save"></i> Simpan
                                    </button>
                                    <button class="btn-cancel-note" data-id="${item.watchlistId}">
                                        <i class="fas fa-times"></i> Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="watchlist-actions">
                            <button class="btn-remove" data-id="${item.watchlistId}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        html += '</div>';
        container.innerHTML = html;
        
        // Event listener untuk tombol hapus
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const watchlistId = btn.getAttribute('data-id');
                if (confirm('Yakin ingin menghapus film ini dari watchlist?')) {
                    await removeMovieFromWatchlist(watchlistId);
                    await renderWatchlist(containerId);
                }
            });
        });
        
        // Event listener untuk tombol edit note
        document.querySelectorAll('.btn-edit-note').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const watchlistId = btn.getAttribute('data-id');
                document.getElementById(`notes-display-${watchlistId}`).style.display = 'none';
                document.getElementById(`notes-edit-${watchlistId}`).style.display = 'block';
            });
        });
        
        // Event listener untuk tombol batal
        document.querySelectorAll('.btn-cancel-note').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const watchlistId = btn.getAttribute('data-id');
                // Refresh data untuk mengambil notes terbaru
                await getWatchlistWithCache(true);
                document.getElementById(`notes-edit-${watchlistId}`).style.display = 'none';
                document.getElementById(`notes-display-${watchlistId}`).style.display = 'flex';
                
                // Update tampilan teks notes
                const watchlist = await getWatchlistWithCache();
                const item = watchlist.find(w => w.watchlistId == watchlistId);
                if (item) {
                    const notesSpan = document.querySelector(`#notes-display-${watchlistId} .notes-text`);
                    if (notesSpan) {
                        notesSpan.textContent = item.notes || 'Tidak ada catatan';
                    }
                }
            });
        });
        
        // Event listener untuk tombol simpan
        document.querySelectorAll('.btn-save-note').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const watchlistId = btn.getAttribute('data-id');
                const textarea = document.getElementById(`notes-textarea-${watchlistId}`);
                const newNotes = textarea.value;
                
                await updateWatchlistNote(watchlistId, newNotes);
                
                // Update tampilan
                document.getElementById(`notes-edit-${watchlistId}`).style.display = 'none';
                document.getElementById(`notes-display-${watchlistId}`).style.display = 'flex';
                
                // Update teks notes yang ditampilkan
                const notesSpan = document.querySelector(`#notes-display-${watchlistId} .notes-text`);
                if (notesSpan) {
                    notesSpan.textContent = newNotes || 'Tidak ada catatan';
                }
            });
        });
        
    } catch (error) {
        console.error('Render watchlist error:', error);
        container.innerHTML = `
            <div class="empty-watchlist">
                <h3>Error</h3>
                <p>Gagal memuat watchlist: ${error.message}</p>
                <button class="btn btn-primary" onclick="location.reload()">Coba Lagi</button>
            </div>
        `;
    }
}

async function getWatchlistCount() {
    const watchlist = await getWatchlistWithCache();
    return watchlist ? watchlist.length : 0;
}


window.YZONE_WATCHLIST = {
    getWatchlist: getWatchlistWithCache,
    isMovieInWatchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
    updateWatchlistNote,
    renderWatchlist,
    getWatchlistCount
};

