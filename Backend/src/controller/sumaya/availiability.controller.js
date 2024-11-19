// src/controllers/availability.controller.js

import { default as db } from "../../config/db";

const getAvailableRooms = async (req, res) => {
  try {
    const query = "SELECT * FROM room"; // Retrieving rooms that are not booked
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error retrieving rooms", error: err });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export default { getAvailableRooms };
