document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from submitting normally
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;
  
    const responseMessage = document.getElementById('responseMessage');
  
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        responseMessage.textContent = 'Invalid email format!';
        return;
    }
  
    // Validate password (at least 8 characters, one uppercase, one number, one special character)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        responseMessage.textContent = 'Password must be at least 8 characters, with one uppercase, one number, and one special character.';
        return;
    }
  
    // Prepare data to send
    const data = {
        name,
        email,
        phoneNumber,
        password
    };
  
    try {
        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
  
        const result = await res.json();
        if (res.status === 201) {
            responseMessage.style.color = 'green';
            responseMessage.textContent = result.message;
  
            // Redirect to login page after successful registration
            setTimeout(function() {
                window.location.href = '../login/login.html'; // Redirect to the login page
            }, 2000); // Delay of 2 seconds before redirect
        } else {
            responseMessage.style.color = 'red';
            responseMessage.textContent = result.error;
        }
    } catch (error) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'An error occurred. Please try again.';
    }
  });
  