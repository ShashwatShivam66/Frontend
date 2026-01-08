document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleLogin(emailField.value, passwordField.value);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleSignup(emailField.value, passwordField.value);
        });
    }

    function handleLogin(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let success = users.some(user => user.email === email && user.password === password);

        if (success) {
            localStorage.setItem('currentUser', email);
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid email or password.');
        }
    }

    function handleSignup(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('User already exists with this email.');
        } else {
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful! Please login now.');
            window.location.href = 'login.html';
        }
    }
});

