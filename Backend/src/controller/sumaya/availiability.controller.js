const db = require('../../config/db'); // Import the MySQL connection

async function getAvailableRooms(req, res) {
  try {
    const queryString = "SELECT * FROM room WHERE isBooked = 0"; // Retrieving rooms that are not booked
    
    // Use db.query to run the query
    db.query(queryString, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // If no rooms are found, return 404
      if (results.length === 0) {
        return res.status(404).json({ message: "No available rooms found" });
      }

      // Respond with available rooms
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getAvailableRooms };
