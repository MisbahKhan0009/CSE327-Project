import { query } from '../../config/db'; // Assuming this connects to MySQL

// Regex validation functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

export async function registerUser(req, res) {
  const { name, role, email, phoneNumber, address, password, preferences, employeeId } = req.body;

  // Validate inputs
  if (!name || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character',
    });
  }

  try {
    // Check if email already exists
    const [existingUser] = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Insert user into the database
    await query(
      'INSERT INTO users (name, role, email, phone_number, address, password, employee_id, preferences) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, role || 'guest', email, phoneNumber, address || null, password, employeeId || null, JSON.stringify(preferences) || null]
    );

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
