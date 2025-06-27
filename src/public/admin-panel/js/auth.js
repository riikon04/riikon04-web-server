// Check if user is authenticated
const checkAuth = async () => {
    try {
        const response = await fetch('/auth/status');
        const data = await response.json();

        if (!data.authenticated) {
            window.location.href = 'login.html';
            return null;
        }

        // User is authenticated, return user data
        if (!data.user.isAdmin) {
            // Not an admin, redirect to login with error
            localStorage.setItem('authError', 'Bạn không có quyền truy cập trang quản trị.');
            window.location.href = 'login.html';
            return null;
        }

        return data.user;
    } catch (error) {
        console.error('Error checking authentication:', error);
        window.location.href = 'login.html';
        return null;
    }
};

// Handle logout
const setupLogout = () => {
    const logoutBtn = document.getElementById('logout-btn');
    const logoutLink = document.getElementById('logout-link');

    const handleLogout = (e) => {
        e.preventDefault();
        window.location.href = '/auth/logout';
    };

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (logoutLink) logoutLink.addEventListener('click', handleLogout);
};

// Update user info in navbar
const updateUserInfo = (user) => {
    const userNameEl = document.getElementById('user-name');
    const userAvatarEl = document.getElementById('user-avatar');

    if (userNameEl) userNameEl.textContent = user.username;
    if (userAvatarEl) {
        userAvatarEl.style.backgroundImage = `url(https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png)`;
    }
};

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Check if we're on login page
    if (window.location.pathname.includes('/admin-panel/login.html')) {
        const errorMsg = localStorage.getItem('authError');
        if (errorMsg) {
            const errorEl = document.getElementById('error-message');
            errorEl.textContent = errorMsg;
            errorEl.classList.remove('d-none');
            localStorage.removeItem('authError');
        }
        return;
    }

    // Otherwise check authentication and update UI
    const user = await checkAuth();
    if (user) {
        updateUserInfo(user);
        setupLogout();
    }
});