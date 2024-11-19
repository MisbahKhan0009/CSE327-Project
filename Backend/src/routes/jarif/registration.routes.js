const express = require('express');
const router = express.Router();
const registrationController = require('../../controller/jarif/registration.controller');

// Define route to register a user
router.post('/', registrationController.registerUser);  // This should be '/register' without an extra 'register' part.

module.exports = router;
