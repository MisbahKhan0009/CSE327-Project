/**
 * @file user.controller.js
 * @description Controller for handling user registration operations.
 */

const db = require('../../config/db'); // Ensure correct path to db.js

/**
 * Register a new user.
 * 
 * This function validates the input fields (name, email, phoneNumber, and password),
 * checks if the email already exists in the database, and registers the user into the
 * `guest` table. Passwords must meet specific security criteria.
 * 
 * @function registerUser
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Body parameters in the request.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.phoneNumber - The phone number of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // POST /api/user/register
 * // {
 * //   "name": "John Doe",
 * //   "email": "johndoe@example.com",
 * //   "phoneNumber": "1234567890",
 * //   "password": "Password@123"
 * // }
 * 
 * // Response example (201 Created)
 * // {
 * //   "message": "User registered successfully"
 * // }
 * 
 * // Response example (400 Bad Request - Missing Fields)
 * // {
 * //   "error": "All required fields must be filled"
 * // }
 * 
 * // Response example (400 Bad Request - Invalid Email)
 * // {
 * //   "error": "Invalid email format"
 * // }
 * 
 * // Response example (400 Bad Request - Invalid Password)
 * // {
 * //   "error": "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character"
 * // }
 * 
 * // Response example (409 Conflict - Email Exists)
 * // {
 * //   "error": "Email already in use"
 * // }
 */
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
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
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
