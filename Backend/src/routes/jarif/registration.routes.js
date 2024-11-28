/**
 * @file registration.routes.js
 * @description Defines routes for user registration operations.
 */

const express = require('express');
const router = express.Router();
const registrationController = require('../../controller/jarif/registration.controller');

/**
 * Route to register a new user.
 * 
 * This route accepts a POST request to register a user with the required details.
 * It delegates the request to the `registerUser` function in the registration controller.
 * 
 * @name POST /register
 * @function
 * @memberof module:routes/registration
 * 
 * @example
 * // Request example
 * // POST /register
 * // { "name": "John Doe", "email": "john.doe@example.com", "phoneNumber": "1234567890", "password": "StrongPassword123!" }
 * 
 * // Response example (201 Created)
 * // { "message": "User registered successfully" }
 * 
 * // Response example (400 Bad Request)
 * // { "error": "All required fields must be filled" }
 */
router.post('/', registrationController.registerUser);

module.exports = router;
