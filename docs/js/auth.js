// frontend/js/auth.js

const USERS_KEY = 'yzone_users';
const CURRENT_USER_KEY = 'yzone_current_user';

function initDefaultUsers() {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) {
        const defaultUsers = [
            {
                id: 1,
                name: 'Admin YZONE',
                email: 'admin@yzone.com',
                password: 'admin123',
                role: 'admin',
                avatar: 'https://ui-avatars.com/api/?background=e50914&color=fff&name=Admin',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
}

async function register(name, email, password) {
    try {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email sudah terdaftar!' };
        }
        
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            role: 'user',
            avatar: `https://ui-avatars.com/api/?background=e50914&color=fff&name=${encodeURIComponent(name)}`,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        
        return { success: true, message: 'Registrasi berhasil! Silakan login.' };
        
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, message: 'Terjadi kesalahan saat registrasi' };
    }
}

async function login(email, password) {
    try {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, message: 'Email atau password salah!' };
        }
        
        const currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        };
        
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
        
        return { success: true, message: 'Login berhasil!', user: currentUser };
        
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Terjadi kesalahan saat login' };
    }
}

async function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    return { success: true, message: 'Logout berhasil!' };
}

function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}

function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

function updateNavbarForAuth() {
    const isLoggedIn = window.YZONE_AUTH.isLoggedIn();
    const user = window.YZONE_AUTH.getCurrentUser();
    
    const navbarLinks = document.querySelector('.navbar-links');
    if (!navbarLinks) {
        console.log('navbar-links not found, retrying...');
        setTimeout(() => updateNavbarForAuth(), 100);
        return;
    }
    
    // Hapus semua auth elements yang sudah ada
    const existingLoginLink = navbarLinks.querySelector('.login-link');
    const existingUserMenu = navbarLinks.querySelector('.user-menu');
    if (existingLoginLink) existingLoginLink.remove();
    if (existingUserMenu) existingUserMenu.remove();
    
    if (isLoggedIn && user) {
        // Tampilkan foto profil + nama + dropdown (tanpa link admin)
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="user-avatar">
                <img src="${user.avatar}" alt="${user.name}" class="avatar-img" onerror="this.src='https://ui-avatars.com/api/?background=e50914&color=fff&name=${encodeURIComponent(user.name)}'">
                <span class="user-name">${user.name}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="user-dropdown">
                <a href="/frontend/pages/profile.html"><i class="fas fa-list"></i> My Watchlist</a>
                <a href="#" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        `;
        
        navbarLinks.appendChild(userMenu);
        
        // Event listener untuk dropdown
        const userAvatar = userMenu.querySelector('.user-avatar');
        const dropdown = userMenu.querySelector('.user-dropdown');
        
        if (userAvatar && dropdown) {
            userAvatar.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (dropdown) dropdown.classList.remove('show');
        });
        
        // Logout button
        const logoutBtn = userMenu.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                await window.YZONE_AUTH.logout();
                window.location.reload();
            });
        }
        
    } else {
        // Tampilkan link Login
        const loginLink = document.createElement('a');
        loginLink.href = '/frontend/pages/login.html';
        loginLink.className = 'login-link';
        loginLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        navbarLinks.appendChild(loginLink);
    }
}

initDefaultUsers();

window.YZONE_AUTH = {
    register,
    login,
    logout,
    getCurrentUser,
    isLoggedIn,
    isAdmin,
    updateNavbarForAuth
};