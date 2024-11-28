/**
 * @file registration.js
 * @description Handles user registration by validating input fields, sending data to the backend, 
 * and providing feedback based on the server response.
 */

// Add an event listener to the registration form submission
document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Collect form data from input fields
    const name = document.getElementById('name').value; // User's name
    const email = document.getElementById('email').value; // User's email address
    const phoneNumber = document.getElementById('phoneNumber').value; // User's phone number
    const password = document.getElementById('password').value; // User's password

    const responseMessage = document.getElementById('responseMessage'); // Element to display success or error messages

    // Validate the email format using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Matches standard email format
    if (!emailPattern.test(email)) {
        responseMessage.textContent = 'Invalid email format!'; // Show error message for invalid email
        return; // Stop further processing
    }

    // Validate the password for specific criteria: minimum 8 characters, 
    // one uppercase letter, one number, and one special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        responseMessage.textContent = 'Password must be at least 8 characters, with one uppercase, one number, and one special character.';
        return; // Stop further processing
    }

    // Prepare the data object to send to the backend
    const data = {
        name,
        email,
        phoneNumber,
        password
    };

    try {
        // Send a POST request to the backend with the registration data
        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST', // HTTP method for creating resources
            headers: {
                'Content-Type': 'application/json' // Specify JSON format for the request body
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
        });

        const result = await res.json(); // Parse the JSON response from the server

        // Handle the server's response
        if (res.status === 201) { // Registration successful (HTTP status 201)
            responseMessage.style.color = 'green'; // Set feedback text color to green for success
            responseMessage.textContent = result.message; // Display success message

            // Redirect the user to the login page after a short delay
            setTimeout(function () {
                window.location.href = '../login/login.html'; // Redirect to the login page
            }, 2000); // Delay of 2 seconds before redirect
        } else { // Registration failed
            responseMessage.style.color = 'red'; // Set feedback text color to red for errors
            responseMessage.textContent = result.error; // Display error message from the server
        }
    } catch (error) {
        // Handle any errors that occur during the request
        responseMessage.style.color = 'red'; // Set feedback text color to red for errors
        responseMessage.textContent = 'An error occurred. Please try again.'; // Display a generic error message
    }
});
