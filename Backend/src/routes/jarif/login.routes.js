const express = require('express');
const router = express.Router();
const loginController = require('../../controller/jarif/login.controller');

// Define the login route
router.post('/', loginController.loginUser);

module.exports = router;
