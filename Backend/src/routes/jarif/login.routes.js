/**
 * @file login.routes.js
 * @description Defines routes for user login operations.
 */

const express = require('express');
const router = express.Router();
const loginController = require('../../controller/jarif/login.controller');

/**
 * Route to handle user login.
 * 
 * This route accepts a POST request to authenticate a user. 
 * It delegates the login functionality to the `loginUser` function in the login controller.
 * 
 * @name POST /login
 * @function
 * @memberof module:routes/login
 * 
 * @example
 * // Request example
 * // POST /login
 * // { "email": "john.doe@example.com", "password": "StrongPassword123!", "role": "admin" }
 * 
 * // Response example (200 OK)
 * // {
 * //   "message": "Login successful",
 * //   "user": { "email": "john.doe@example.com", "name": "John Doe", "role": "admin" }
 * // }
 * 
 * // Response example (401 Unauthorized)
 * // { "error": "Invalid email or password" }
 * 
 * // Response example (400 Bad Request)
 * // { "error": "All fields are required" }
 */
router.post('/', loginController.loginUser);

module.exports = router;
