/**
 * @file admin.routes.js
 * @description Routes for handling admin-related operations.
 */

const express = require('express');
const router = express.Router();
const adminController = require('../../controller/touhid/admin.controller');

/**
 * Route to get admin information by email.
 * 
 * @route GET /api/admin/info
 * @group Admin - Operations related to admin
 * @param {string} email.query.optional - Email of the admin to fetch information for. Default: `kuddus@ali.com`
 * @returns {Object} 200 - An object containing admin information (email, name, phone).
 * @returns {Object} 404 - Admin not found.
 * @returns {Object} 500 - Database error.
 * 
 * @example
 * // Request example
 * // GET /api/admin/info?email=kuddus@ali.com
 * 
 * // Response example (200 OK)
 * // {
 * //   "email": "kuddus@ali.com",
 * //   "name": "Kuddus Ali",
 * //   "phone": "1234567890"
 * // }
 */
router.get('/info', adminController.getAdminInfo);

module.exports = router;
