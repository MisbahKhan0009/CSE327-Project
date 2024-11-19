const { query } = require('../../config/db'); // Assuming this connects to MySQL

// Regex validation functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

async function registerUser(req, res) {
  const { name, email, phoneNumber, password, userType } = req.body;

  // Validate inputs
  if (!name || !email || !phoneNumber || !password || !userType) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate password format
  if (!validatePassword(password)) {
    return res.status(400).json({
      error:
        'Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character',
    });
  }

  try {
    // Determine which table to check based on userType
    const table = userType === 'admin' ? 'admin' : 'guest';

    console.log(table)

    // Check if email already exists in the appropriate table (admin or guest)
    const [existingUser] = await query(`SELECT * FROM ${table} WHERE email = ?`, [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Insert user into the appropriate table
    await query(
      `INSERT INTO ${table} (email, name, password, phone) VALUES (?, ?, ?, ?)`,
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
