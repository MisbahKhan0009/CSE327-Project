const express = require('express');
const router = express.Router();
const registrationController = require('../../controller/jarif/registration.controller');

// Route to register a user
router.post('/register', registrationController.registerUser);

module.exports = router;
