const express = require('express');
const router = express.Router();
const billingController = require('../../controller/jarif/billing.controller');

// Route to create a new bill
router.post('/create', billingController.createBill);

// Route to update an existing bill (e.g., at checkout)
router.put('/update', billingController.updateBill);

// Route to process a refund for a canceled reservation
router.post('/refund', billingController.processRefund);

router.get('/', billingController.getAllBills);

module.exports = router;
