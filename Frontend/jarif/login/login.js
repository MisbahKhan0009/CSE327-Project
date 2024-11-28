/**
 * @file login.js
 * @description Frontend script to handle user login functionality, sending credentials to the backend, and storing session-related data.
 */

// Add an event listener to the login form submission
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get form data from input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const responseMessage = document.getElementById('responseMessage'); // Element to display success or error messages

  try {
    // Send login request to the backend
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Set request headers for JSON payload
      body: JSON.stringify({ email, password, role }), // Send the form data as JSON
    });

    const result = await response.json(); // Parse the JSON response

    // Handle the response based on HTTP status
    if (response.ok) {
      // Store the email in localStorage based on the user's role
      if (role === 'guest') {
        localStorage.setItem('guestEmail', email); // Save guest email to localStorage
      } else if (role === 'admin') {
        localStorage.setItem('adminEmail', email); // Save admin email to localStorage
      }
      
      responseMessage.style.color = 'green'; // Set the message color to green for success
      responseMessage.textContent = 'Login successful! Welcome, ' + result.user.name; // Display success message with user name
    } else {
      responseMessage.style.color = 'red'; // Set the message color to red for failure
      responseMessage.textContent = result.error || 'Login failed. Please try again.'; // Display error message
    }
  } catch (error) {
    // Handle any errors during the request
    console.error('Error:', error); // Log the error for debugging
    responseMessage.style.color = 'red'; // Set the message color to red for error
    responseMessage.textContent = 'An error occurred. Please try again.'; // Display generic error message
  }
});
