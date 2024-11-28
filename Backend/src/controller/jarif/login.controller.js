/**
 * @file auth.controller.js
 * @description Controller for handling user authentication operations.
 */

const db = require('../../config/db'); // Adjust the path if necessary

/**
 * Login user based on provided credentials.
 * 
 * This function validates the user's email, password, and role, and checks the corresponding database table
 * (either `admin` or `guest`) for matching records. On successful authentication, it returns the user's email,
 * name, and role. If authentication fails, it returns an error message.
 * 
 * @function loginUser
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Body parameters in the request.
 * @param {string} req.body.email - The email of the user trying to log in.
 * @param {string} req.body.password - The password of the user.
 * @param {string} req.body.role - The role of the user, either 'admin' or 'guest'.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // POST /api/auth/login
 * // {
 * //   "email": "johndoe@example.com",
 * //   "password": "password123",
 * //   "role": "admin"
 * // }
 * 
 * // Response example (200 OK)
 * // {
 * //   "message": "Login successful",
 * //   "user": {
 * //     "email": "johndoe@example.com",
 * //     "name": "John Doe",
 * //     "role": "admin"
 * //   }
 * // }
 * 
 * // Response example (400 Bad Request)
 * // {
 * //   "error": "All fields are required"
 * // }
 * 
 * // Response example (401 Unauthorized)
 * // {
 * //   "error": "Invalid email or password"
 * // }
 */
async function loginUser(req, res) {
  const { email, password, role } = req.body;

  // Validate inputs
  if (!email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate the role
  if (!['admin', 'guest'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role selected' });
  }

  try {
    // Determine the table based on the role
    const tableName = role === 'admin' ? 'admin' : 'guest';

    // Check if the user exists with the provided email and password
    const [user] = await db.promise().query(
      `SELECT * FROM ${tableName} WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (user.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Successful login
    res.status(200).json({
      message: 'Login successful',
      user: {
        email: user[0].email,
        name: user[0].name,
        role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { loginUser };
