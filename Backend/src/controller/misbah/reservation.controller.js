// controller/reservations.controller.js
const db = require("../../config/db"); // Import database connection in CommonJS syntax

// Create a new reservation
exports.createReservation = async (req, res) => {
  const { guest_id, room_id, checkIn_date, checkOut_date, bill_id } = req.body;

  try {
    // Insert reservation into the database
    const query = `
      INSERT INTO reservation (guest_id, room_id, checkIn_date, checkOut_date, bill_id)
      VALUES (?, ?, ?, ?, ?)`;

    const [result] = await db.query(query, [
      guest_id,
      room_id,
      checkIn_date,
      checkOut_date,
      bill_id,
    ]);

    // Update room availability (set isBooked to TRUE)
    await db.query("UPDATE room SET isBooked = TRUE WHERE room_id = ?", [
      room_id,
    ]);

    res.status(201).json({
      message: "Reservation created successfully",
      reservation_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

// Get all reservations (optional, for admin purposes)
exports.getAllReservations = async (req, res) => {
  try {
    const query = "SELECT * FROM reservation";
    const [result] = await db.query(query);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};
