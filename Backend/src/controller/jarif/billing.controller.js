const db = require('../../config/db'); // Adjust the path if necessary

// Function to get all bills
async function getAllBills(req, res) {
    try {
      // Query the database to get all bills
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
  

// Utility function to calculate the total bill
const calculateTotal = (roomCharge, servicesCharge, taxRate) => {
  const tax = (roomCharge + servicesCharge) * taxRate;
  return (roomCharge + servicesCharge + tax).toFixed(2);
};



// Function to create a new bill
async function createBill(req, res) {
  const { roomCharge, servicesCharge, taxRate, date } = req.body;

  // Validate inputs
  if (roomCharge === undefined || servicesCharge === undefined || taxRate === undefined || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Calculate the total bill
    const total = calculateTotal(roomCharge, servicesCharge, taxRate);

    // Insert new bill into the database
    const [result] = await db.promise().query(
      'INSERT INTO bill (total, date) VALUES (?, ?)',
      [total, date]
    );

    // Return the response with the new bill ID and total
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

// Function to update an existing bill (e.g., at checkout)
async function updateBill(req, res) {
  const { billId, roomCharge, servicesCharge, taxRate } = req.body;

  // Validate inputs
  if (!billId || roomCharge === undefined || servicesCharge === undefined || taxRate === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Calculate the new total
    const total = calculateTotal(roomCharge, servicesCharge, taxRate);

    // Update the bill in the database
    const [result] = await db.promise().query(
      'UPDATE bill SET total = ? WHERE bill_id = ?',
      [total, billId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    // Return the updated bill details
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

// Function to process a refund for a canceled reservation
async function processRefund(req, res) {
  const { billId, refundAmount } = req.body;

  // Validate inputs
  if (!billId || refundAmount === undefined || refundAmount <= 0) {
    return res.status(400).json({ error: 'Invalid refund details' });
  }

  try {
    // Fetch the bill for the refund
    const [bill] = await db.promise().query(
      'SELECT * FROM bill WHERE bill_id = ?',
      [billId]
    );

    if (bill.length === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    // Check if the refund amount is valid
    if (refundAmount > bill[0].total) {
      return res.status(400).json({ error: 'Refund amount cannot be greater than the bill total' });
    }

    // Deduct the refund amount from the total
    const newTotal = (bill[0].total - refundAmount).toFixed(2);

    // Update the bill total in the database
    const [result] = await db.promise().query(
      'UPDATE bill SET total = ? WHERE bill_id = ?',
      [newTotal, billId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    // Return the refund success message
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
