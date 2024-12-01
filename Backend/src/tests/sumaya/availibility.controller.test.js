const request = require("supertest");
const express = require("express");
const roomController = require("../../controller/sumaya/availiability.controller");
const db = require("../../config/db");
const app = express();

app.use(express.json());
app.get("/api/rooms/available", roomController.getAvailableRooms);

// Mock the db module
jest.mock("../../config/db");

describe("Room Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  describe("GET /api/rooms/available", () => {
    it("should return available rooms", async () => {
      // Mock the db.query method to simulate fetching available rooms
      const mockRooms = [
        { roomId: 1, roomNumber: "101", isBooked: 0 },
        { roomId: 2, roomNumber: "102", isBooked: 0 },
      ];
      db.query.mockImplementation((query, callback) => callback(null, mockRooms));

      const response = await request(app).get("/api/rooms/available");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockRooms);
      expect(db.query).toHaveBeenCalledTimes(1);
    });

    it("should return 404 when no rooms are available", async () => {
      // Mock the db.query method to simulate no available rooms
      db.query.mockImplementation((query, callback) => callback(null, []));

      const response = await request(app).get("/api/rooms/available");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No available rooms found");
      expect(db.query).toHaveBeenCalledTimes(1);
    });

    it("should return 500 when a database error occurs", async () => {
      // Simulate a database error
      db.query.mockImplementation((query, callback) => callback(new Error("Database error"), null));

      const response = await request(app).get("/api/rooms/available");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });
});
