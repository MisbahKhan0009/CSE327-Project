import { query as _query } from '../../config/db';
// import { v4 as uuidv4 } from 'uuid';

// Create a new reservation
export async function createReservation(req, res) {
  const { guest_id, room_id, checkIn_date, checkOut_date, bill_id } = req.body;

  try {
    // Insert reservation into the database
    const query = `
      INSERT INTO reservation (guest_id, room_id, checkIn_date, checkOut_date, bill_id)
      VALUES (?, ?, ?, ?, ?)`;

    const [result] = await _query(query, [guest_id, room_id, checkIn_date, checkOut_date, bill_id]);

    // Update room availability (set isBooked to TRUE)
    await _query('UPDATE room SET isBooked = TRUE WHERE room_id = ?', [room_id]);

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reservation', error });
  }
}

// Get all reservations (optional, for admin purposes)
export async function getAllReservations(req, res) {
  try {
    const query = 'SELECT * FROM reservation';
    const [result] = await _query(query);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
}
