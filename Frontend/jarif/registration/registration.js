const form = document.querySelector('#registrationForm');

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Frontend validation
  if (!validateEmail(data.email)) {
    alert('Invalid email format');
    return;
  }

  if (!validatePassword(data.password)) {
    alert('Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      alert(result.error);
    } else {
      alert('Registration successful');
      form.reset();
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred');
  }
});
