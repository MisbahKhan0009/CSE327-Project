/**
 * @file bill.controller.js
 * @description Controller for handling bill management operations, including creating, updating, retrieving, and processing refunds for bills.
 */

const db = require('../../config/db'); // Adjust the path if necessary

/**
 * Get all bills.
 * 
 * This function retrieves all bills from the database. If no bills are found, it responds with a 404 status.
 * 
 * @function getAllBills
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // GET /api/bills
 * 
 * // Response example (200 OK)
 * // [
 * //   { "bill_id": 1, "total": 100.00, "date": "2024-01-01" },
 * //   { "bill_id": 2, "total": 200.50, "date": "2024-01-02" }
 * // ]
 * 
 * // Response example (404 Not Found)
 * // { "message": "No bills found" }
 */
async function getAllBills(req, res) {
  try {
    const [bills] = await db.promise().query('SELECT * FROM bill');
    
    if (bills.length === 0) {
      return res.status(404).json({ message: 'No bills found' });
    }

    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Utility function to calculate the total bill.
 * 
 * @function calculateTotal
 * @param {number} roomCharge - The charge for the room.
 * @param {number} servicesCharge - The charge for additional services.
 * @param {number} taxRate - The tax rate to be applied (e.g., 0.10 for 10%).
 * 
 * @returns {string} The calculated total bill amount rounded to two decimal places.
 */
const calculateTotal = (roomCharge, servicesCharge, taxRate) => {
  const tax = (roomCharge + servicesCharge) * taxRate;
  return (roomCharge + servicesCharge + tax).toFixed(2);
};

/**
 * Create a new bill.
 * 
 * This function calculates the total bill amount and saves it in the database along with the provided date.
 * 
 * @function createBill
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Body parameters for the new bill.
 * @param {number} req.body.roomCharge - The charge for the room.
 * @param {number} req.body.servicesCharge - The charge for additional services.
 * @param {number} req.body.taxRate - The tax rate to be applied (e.g., 0.10 for 10%).
 * @param {string} req.body.date - The date of the bill.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // POST /api/bills
 * // { "roomCharge": 100, "servicesCharge": 50, "taxRate": 0.10, "date": "2024-01-01" }
 * 
 * // Response example (201 Created)
 * // { "message": "Bill created successfully", "billId": 1, "total": "165.00", "date": "2024-01-01" }
 */
async function createBill(req, res) {
  const { roomCharge, servicesCharge, taxRate, date } = req.body;

  if (roomCharge === undefined || servicesCharge === undefined || taxRate === undefined || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const total = calculateTotal(roomCharge, servicesCharge, taxRate);
    const [result] = await db.promise().query(
      'INSERT INTO bill (total, date) VALUES (?, ?)',
      [total, date]
    );

    res.status(201).json({
      message: 'Bill created successfully',
      billId: result.insertId,
      total,
      date
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Update an existing bill.
 * 
 * This function recalculates the total based on updated charges and updates the bill record in the database.
 * 
 * @function updateBill
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Body parameters for the bill update.
 * @param {number} req.body.billId - The ID of the bill to be updated.
 * @param {number} req.body.roomCharge - The updated room charge.
 * @param {number} req.body.servicesCharge - The updated services charge.
 * @param {number} req.body.taxRate - The updated tax rate.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // PUT /api/bills
 * // { "billId": 1, "roomCharge": 120, "servicesCharge": 60, "taxRate": 0.15 }
 * 
 * // Response example (200 OK)
 * // { "message": "Bill updated successfully", "billId": 1, "total": "207.00" }
 * 
 * // Response example (404 Not Found)
 * // { "error": "Bill not found" }
 */
async function updateBill(req, res) {
  const { billId, roomCharge, servicesCharge, taxRate } = req.body;

  if (!billId || roomCharge === undefined || servicesCharge === undefined || taxRate === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const total = calculateTotal(roomCharge, servicesCharge, taxRate);
    const [result] = await db.promise().query(
      'UPDATE bill SET total = ? WHERE bill_id = ?',
      [total, billId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.status(200).json({
      message: 'Bill updated successfully',
      billId,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Process a refund for a bill.
 * 
 * This function deducts the refund amount from the total and updates the bill record in the database.
 * 
 * @function processRefund
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Body parameters for the refund.
 * @param {number} req.body.billId - The ID of the bill for the refund.
 * @param {number} req.body.refundAmount - The amount to be refunded.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // POST /api/bills/refund
 * // { "billId": 1, "refundAmount": 50 }
 * 
 * // Response example (200 OK)
 * // { "message": "Refund of $50 processed successfully", "newTotal": "115.00" }
 * 
 * // Response example (400 Bad Request)
 * // { "error": "Refund amount cannot be greater than the bill total" }
 */
async function processRefund(req, res) {
  const { billId, refundAmount } = req.body;

  if (!billId || refundAmount === undefined || refundAmount <= 0) {
    return res.status(400).json({ error: 'Invalid refund details' });
  }

  try {
    const [bill] = await db.promise().query('SELECT * FROM bill WHERE bill_id = ?', [billId]);

    if (bill.length === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    if (refundAmount > bill[0].total) {
      return res.status(400).json({ error: 'Refund amount cannot be greater than the bill total' });
    }

    const newTotal = (bill[0].total - refundAmount).toFixed(2);
    const [result] = await db.promise().query(
      'UPDATE bill SET total = ? WHERE bill_id = ?',
      [newTotal, billId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.status(200).json({
      message: `Refund of $${refundAmount} processed successfully`,
      newTotal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createBill,
  updateBill,
  processRefund,
  getAllBills
};
