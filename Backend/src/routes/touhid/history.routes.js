const express = require("express");
const router = express.Router();
const paymentHistoryController = require('../../controller/touhid/history.controller');

// Route to fetch payment history
router.get("/payment-history", paymentHistoryController.getPaymentHistory);

module.exports = router;