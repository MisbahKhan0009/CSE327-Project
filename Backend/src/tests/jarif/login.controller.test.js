const request = require("supertest");
const express = require("express");
const authController = require("../../controller/jarif/login.controller"); 
const db = require("../../config/db");

const app = express();
app.use(express.json());
app.post("/api/auth/login", authController.loginUser); 

// Mock the db module
jest.mock("../../config/db", () => ({
  promise: jest.fn().mockReturnValue({
    query: jest.fn(),
  }),
}));

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  describe("POST /api/auth/login", () => {
    it("should log in successfully with valid credentials and role", async () => {
      const mockQuery = db.promise().query;
      mockQuery.mockResolvedValueOnce([[{ email: "akhter@example.com", name: "Akhter" }]]);

      const loginData = {
        email: "akhter@example.com",
        password: "password123",
        role: "admin",
      };

      const response = await request(app).post("/api/auth/login").send(loginData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Login successful");
      expect(response.body.user).toEqual({
        email: "akhter@example.com",
        name: "Akhter",
        role: "admin",
      });
      expect(mockQuery).toHaveBeenCalledTimes(1);
    });

    it("should return 400 if any field is missing", async () => {
      const loginData = {
        email: "akhter@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/auth/login").send(loginData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("All fields are required");
    });

    it("should return 400 for an invalid role", async () => {
      const loginData = {
        email: "akhter@example.com",
        password: "password123",
        role: "invalidRole",
      };

      const response = await request(app).post("/api/auth/login").send(loginData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid role selected");
    });

    it("should return 401 for invalid email or password", async () => {
      const mockQuery = db.promise().query;
      mockQuery.mockResolvedValueOnce([[]]); 

      const loginData = {
        email: "wrong@example.com",
        password: "wrongpassword",
        role: "admin",
      };

      const response = await request(app).post("/api/auth/login").send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Invalid email or password");
      expect(mockQuery).toHaveBeenCalledTimes(1);
    });

    it("should return 500 on database errors", async () => {
      const mockQuery = db.promise().query;
      mockQuery.mockRejectedValueOnce(new Error("Database error")); 

      const loginData = {
        email: "akhter@example.com",
        password: "password123",
        role: "admin",
      };

      const response = await request(app).post("/api/auth/login").send(loginData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
      expect(mockQuery).toHaveBeenCalledTimes(1);
    });
  });
});
