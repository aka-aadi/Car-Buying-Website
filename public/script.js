document.addEventListener('DOMContentLoaded', () => {
    const adminLoginForm = document.getElementById('admin-login-form');
    const userLoginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');

    // Function to open a tab
    window.openTab = function(tabName) {
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));

        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => button.classList.remove('active'));

        document.getElementById(tabName).classList.add('active');
        document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`).classList.add('active');
    }

    // Default open tab
    openTab('adminLogin'); // Open Admin Login tab by default

    // Admin Login
    adminLoginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;

        try {
            const response = await fetch('/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                window.location.href = 'admin-dashboard.html'; // Redirect to Admin Dashboard
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // User Registration
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (response.ok) {
                registerMessage.textContent = result.message;
                registerMessage.style.color = 'green';
                registerForm.reset();
                openTab('userLogin'); // Switch to user login tab after successful registration
            } else {
                registerMessage.textContent = result.message;
                registerMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // User Login
    userLoginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                window.location.href = 'car-buying.html'; // Redirect to Car Buying page
            } else {
                // If user does not exist, switch to the registration tab
                openTab('register');
                registerMessage.textContent = 'User not found. Please register.';
                registerMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
