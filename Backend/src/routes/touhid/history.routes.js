/**
 * @file history.routes.js
 * @description Routes for handling payment history related requests.
 * These routes are responsible for fetching payment history of a guest.
 */

const express = require("express");
const router = express.Router();
const paymentHistoryController = require('../../controller/touhid/history.controller');

/**
 * Route to fetch payment history for a guest.
 * 
 * @route GET /api/payment/payment-history
 * @group Payment History - Operations related to payment history.
 * @param {string} guestEmail.query - The email of the guest for fetching payment history.
 * @returns {Array<Object>} 200 - A list of payment history records for the guest.
 * @returns {Object} 400 - Error message if the guest email is missing.
 * @returns {Object} 404 - Error message if the guest is not found or no payment history exists.
 * @returns {Object} 500 - Error message if there is a database error.
 * 
 * @example
 * // Request example
 * // GET /api/payments/payment-history?guestEmail=tohid@ferdoush.com
 * 
 * // Response example (200 OK)
 * // [
 * //   {
 * //     "bill_id": 3,
 * //     "total": 1500,
 * //     "payment_date": "2024-11-20"
 * //   },
 * //   {
 * //     "bill_id": 4,
 * //     "total": 2000,
 * //     "payment_date": "2024-10-15"
 * //   }
 * // ]
 * 
 * // Error response example (400 Bad Request)
 * // { "message": "Guest email is required." }
 * 
 * // Error response example (404 Not Found - Guest)
 * // { "message": "Guest not found." }
 * 
 * // Error response example (404 Not Found - Payment History)
 * // { "message": "No payment history found for this guest." }
 * 
 * // Error response example (500 Internal Server Error)
 * // { "message": "An error occurred while fetching payment history." }
 */
router.get("/payment-history", paymentHistoryController.getPaymentHistory);

module.exports = router;
