const express = require('express');
const router = express.Router();
const adminController = require('../../controller/touhid/admin.controller');

// Route to get admin information
router.get('/info', adminController.getAdminInfo);

module.exports = router;
