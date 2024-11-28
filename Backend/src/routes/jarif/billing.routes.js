/**
 * @file billing.routes.js
 * @description Defines routes for billing-related operations, such as creating, updating, and refunding bills.
 */

const express = require('express');
const router = express.Router();
const billingController = require('../../controller/jarif/billing.controller');

/**
 * Route to create a new bill.
 * 
 * Accepts a POST request with billing details, calculates the total, and stores the new bill in the database.
 * 
 * @name POST /billing/create
 * @function
 * @memberof module:routes/billing
 * 
 * @example
 * // Request example
 * // POST /billing/create
 * // { "roomCharge": 100, "servicesCharge": 50, "taxRate": 0.1, "date": "2024-11-25" }
 * 
 * // Response example (201 Created)
 * // { "message": "Bill created successfully", "billId": 1, "total": 165, "date": "2024-11-25" }
 */
router.post('/create', billingController.createBill);

/**
 * Route to update an existing bill.
 * 
 * Accepts a PUT request to update bill details (e.g., at checkout). Recalculates the total and updates the bill in the database.
 * 
 * @name PUT /billing/update
 * @function
 * @memberof module:routes/billing
 * 
 * @example
 * // Request example
 * // PUT /billing/update
 * // { "billId": 1, "roomCharge": 120, "servicesCharge": 60, "taxRate": 0.1 }
 * 
 * // Response example (200 OK)
 * // { "message": "Bill updated successfully", "billId": 1, "total": 198 }
 */
router.put('/update', billingController.updateBill);

/**
 * Route to process a refund for a canceled reservation.
 * 
 * Accepts a POST request to deduct the refund amount from the total of an existing bill.
 * 
 * @name POST /billing/refund
 * @function
 * @memberof module:routes/billing
 * 
 * @example
 * // Request example
 * // POST /billing/refund
 * // { "billId": 1, "refundAmount": 50 }
 * 
 * // Response example (200 OK)
 * // { "message": "Refund of $50 processed successfully", "newTotal": 115 }
 */
router.post('/refund', billingController.processRefund);

/**
 * Route to get all bills.
 * 
 * Accepts a GET request to fetch all bills from the database.
 * 
 * @name GET /billing
 * @function
 * @memberof module:routes/billing
 * 
 * @example
 * // Request example
 * // GET /billing
 * 
 * // Response example (200 OK)
 * // [
 * //   { "billId": 1, "total": 165, "date": "2024-11-25" },
 * //   { "billId": 2, "total": 200, "date": "2024-11-26" }
 * // ]
 * 
 * // Response example (404 Not Found)
 * // { "message": "No bills found" }
 */
router.get('/', billingController.getAllBills);

module.exports = router;
