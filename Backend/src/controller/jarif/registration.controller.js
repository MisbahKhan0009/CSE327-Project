const db = require('../../config/db');  // Ensure correct path to db.js

async function registerUser(req, res) {
  const { name, email, phoneNumber, password } = req.body;

  // Validate inputs
  if (!name || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  // Validate email format
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate password format
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  if (!validatePassword(password)) {
    return res.status(400).json({
      error:
        'Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character',
    });
  }

  try {
    // Check if the email already exists
    const [existingUser] = await db.promise().query('SELECT * FROM guest WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Insert user into the guest table
    await db.promise().query(
      'INSERT INTO guest (email, name, password, phone) VALUES (?, ?, ?, ?)',
      [email, name, password, phoneNumber]
    );

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { registerUser };
