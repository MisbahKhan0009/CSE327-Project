const db = require('../../config/db'); // Adjust the path if necessary

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
