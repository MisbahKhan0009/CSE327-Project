const request = require("supertest");
const express = require("express");
const reservationController = require("../../controller/misbah/reservation.controller");
const db = require("../../config/db");
const app = express();

app.use(express.json()); // For parsing JSON request bodies
app.post("/api/reservations", reservationController.createReservation);
app.get("/api/reservations", reservationController.getAllReservations);

// Mock the db module
jest.mock("../../config/db");

describe("Reservation Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  describe("POST /api/reservations", () => {
    it("should create a new reservation", async () => {
      // Mock the db.query method to simulate the insertion into the database
      const mockInsertResult = { insertId: 456 };
      db.query.mockResolvedValue([mockInsertResult]);

      const reservationData = {
        guest_id: 1,
        room_id: 101,
        checkIn_date: "2024-12-01",
        checkOut_date: "2024-12-05",
        bill_id: 123,
      };

      const response = await request(app)
        .post("/api/reservations")
        .send(reservationData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Reservation created successfully");
      expect(response.body.reservation_id).toBe(456);
      expect(db.query).toHaveBeenCalledTimes(2); // Check that db.query was called twice (for insert and update)
    });

    it("should return 500 when an error occurs", async () => {
      // Simulate a database error
      db.query.mockRejectedValue(new Error("Database error"));

      const reservationData = {
        guest_id: 1,
        room_id: 101,
        checkIn_date: "2024-12-01",
        checkOut_date: "2024-12-05",
        bill_id: 123,
      };

      const response = await request(app)
        .post("/api/reservations")
        .send(reservationData);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Error creating reservation");
      expect(response.body.error).toBe("Database error"); // Ensure consistent error format
    });
  });

  describe("GET /api/reservations", () => {
    it("should return all reservations", async () => {
      // Mock the db.query method to simulate fetching reservations from the database
      const mockReservations = [
        {
          reservation_id: 1,
          guest_id: 1,
          room_id: 101,
          checkIn_date: "2024-12-01",
          checkOut_date: "2024-12-05",
          bill_id: 123,
        },
        {
          reservation_id: 2,
          guest_id: 2,
          room_id: 102,
          checkIn_date: "2024-12-10",
          checkOut_date: "2024-12-15",
          bill_id: 124,
        },
      ];
      db.query.mockResolvedValue([mockReservations]);

      const response = await request(app).get("/api/reservations");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReservations);
    });

    it("should return 500 when an error occurs", async () => {
      // Simulate a database error
      db.query.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/reservations");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Error fetching reservations");
      expect(response.body.error).toBe("Database error"); // Ensure consistent error format
    });
  });
});
