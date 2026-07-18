// Get form element
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

// When user submits the form, this function runs
loginForm.addEventListener('submit', function(event) {
    // Prevent page from reloading
    event.preventDefault();
    
    // Clear previous error messages
    usernameError.textContent = '';
    passwordError.textContent = '';
    
    // Get the values user typed
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    // Validation: Check if fields are not empty
    let isValid = true;
    
    if (username === '') {
        usernameError.textContent = 'Username or email is required';
        isValid = false;
    }
    
    if (password === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
    }
    
    // Additional validation: Check username format
    if (username !== '' && !isValidUsername(username)) {
        usernameError.textContent = 'Please enter a valid username or email';
        isValid = false;
    }
    
    // Additional validation: Check password length
    if (password !== '' && password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    // If all validations pass
    if (isValid) {
        // Show what was captured
        showFormData(username, password);
        
        // Clear the form
        loginForm.reset();
    }
});

// Function to validate username (email or username format)
function isValidUsername(username) {
    // Check if it's a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if it's a valid username (letters, numbers, dots, underscores)
    const usernameRegex = /^[a-zA-Z0-9._]{3,}$/;
    
    return emailRegex.test(username) || usernameRegex.test(username);
}

// Function to display captured form data
function showFormData(username, password) {
    const successMessage = document.getElementById('successMessage');
    const formData = document.getElementById('formData');
    
    // Create HTML to display the data
    const dataHTML = `
        <div><strong>Username/Email:</strong> ${escapeHtml(username)}</div>
        <div><strong>Password:</strong> ${'*'.repeat(password.length)}</div>
        <div><strong>Timestamp:</strong> ${new Date().toLocaleString()}</div>
        <div><strong>Browser:</strong> ${navigator.userAgent.split(' ').slice(-2).join(' ')}</div>
    `;
    
    formData.innerHTML = dataHTML;
    
    // Show success message
    successMessage.style.display = 'block';
    
    // Also log to browser console (open Developer Tools to see)
    console.log('FORM DATA CAPTURED:');
    console.log({
        username: username,
        password: password,
        timestamp: new Date().toLocaleString(),
        ipInfo: 'See Network tab for details'
    });
}

// Function to escape HTML special characters (security measure)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Function to reset and try again
function resetForm() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none';
    loginForm.reset();
    usernameInput.focus();
}

// Real-time validation as user types
usernameInput.addEventListener('blur', function() {
    if (this.value.trim() === '') {
        usernameError.textContent = 'Username or email is required';
    } else if (!isValidUsername(this.value.trim())) {
        usernameError.textContent = 'Invalid username or email format';
    } else {
        usernameError.textContent = '';
    }
});

passwordInput.addEventListener('blur', function() {
    if (this.value === '') {
        passwordError.textContent = 'Password is required';
    } else if (this.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
    } else {
        passwordError.textContent = '';
    }
});