document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Get form data
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const responseMessage = document.getElementById('responseMessage');

  try {
    // Send login request to the backend
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });

    const result = await response.json();

    // Handle the response
    if (response.ok) {
      // Store the email in localStorage based on the role
      if (role === 'guest') {
        localStorage.setItem('guestEmail', email);
      } else if (role === 'admin') {
        localStorage.setItem('adminEmail', email);
      }
      
      responseMessage.style.color = 'green';
      responseMessage.textContent = 'Login successful! Welcome, ' + result.user.name;
    } else {
      responseMessage.style.color = 'red';
      responseMessage.textContent = result.error || 'Login failed. Please try again.';
    }
  } catch (error) {
    console.error('Error:', error);
    responseMessage.style.color = 'red';
    responseMessage.textContent = 'An error occurred. Please try again.';
  }
});
