/**
 * @file billing.js
 * @description Frontend script for managing billing operations, including fetching bills, creating new bills, updating bills, and processing refunds.
 */

/**
 * Formats a date string into '31 October, 2024' format.
 *
 * @function formatDate
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

/**
* Fetches all bills from the backend and displays them in a table.
*
* @async
* @function fetchBills
* @returns {void}
*/
async function fetchBills() {
  try {
      const response = await fetch('http://localhost:3000/api/bills');
      const data = await response.json();

      if (response.ok) {
          displayBills(data);
      } else {
          document.getElementById('responseMessage').textContent = data.message || 'No bills found.';
      }
  } catch (error) {
      console.error('Error fetching bills:', error);
  }
}

/**
* Displays a list of bills in a table on the frontend.
*
* @function displayBills
* @param {Array<Object>} bills - The list of bills to display.
*/
function displayBills(bills) {
  const billsTableBody = document.querySelector('#bills-table tbody');
  billsTableBody.innerHTML = ''; // Clear any existing rows

  bills.forEach(bill => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${bill.billId}</td>
          <td>${bill.total}</td>
          <td>${formatDate(bill.date)}</td>
          <td>
              <button onclick="window.location.href='update-bill.html?id=${bill.billId}'">Update</button>
              <button onclick="refundBill(${bill.billId})">Refund</button>
          </td>
      `;
      billsTableBody.appendChild(row);
  });
}

// Load bills when the page loads
document.addEventListener('DOMContentLoaded', fetchBills);

/**
* Handles the submission of the create bill form.
*
* @event submit#createBillForm
* @param {Event} e - The form submission event.
*/
document.getElementById('createBillForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const roomCharge = document.getElementById('roomCharge').value;
  const servicesCharge = document.getElementById('servicesCharge').value;
  const taxRate = document.getElementById('taxRate').value;
  const date = document.getElementById('date').value;

  const responseMessage = document.getElementById('responseMessage');

  const data = { roomCharge, servicesCharge, taxRate, date };

  try {
      const res = await fetch('http://localhost:3000/api/bills/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      });

      const result = await res.json();
      responseMessage.style.color = res.ok ? 'green' : 'red';
      responseMessage.textContent = res.ok
          ? `Bill created successfully. Total: $${result.total}`
          : result.message || 'Error creating bill';
  } catch (error) {
      responseMessage.style.color = 'red';
      responseMessage.textContent = 'An error occurred. Please try again.';
  }
});

/**
* Handles the submission of the update bill form.
*
* @event submit#updateBillForm
* @param {Event} e - The form submission event.
*/
document.getElementById('updateBillForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const billId = document.getElementById('billId').value;
  const roomCharge = document.getElementById('roomCharge').value;
  const servicesCharge = document.getElementById('servicesCharge').value;
  const taxRate = document.getElementById('taxRate').value;

  const responseMessage = document.getElementById('responseMessage');

  const data = { billId, roomCharge, servicesCharge, taxRate };

  try {
      const res = await fetch('http://localhost:3000/api/bills/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      });

      const result = await res.json();
      responseMessage.style.color = res.ok ? 'green' : 'red';
      responseMessage.textContent = res.ok
          ? `Bill updated successfully. Total: $${result.total}`
          : result.message || 'Error updating bill';
  } catch (error) {
      responseMessage.style.color = 'red';
      responseMessage.textContent = 'An error occurred. Please try again.';
  }
});

/**
* Handles the submission of the refund bill form.
*
* @event submit#refundBillForm
* @param {Event} e - The form submission event.
*/
document.getElementById('refundBillForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const billId = document.getElementById('billId').value;
  const refundAmount = document.getElementById('refundAmount').value;

  const responseMessage = document.getElementById('responseMessage');

  const data = { billId, refundAmount };

  try {
      const res = await fetch('http://localhost:3000/api/bills/refund', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      });

      const result = await res.json();
      responseMessage.style.color = res.ok ? 'green' : 'red';
      responseMessage.textContent = res.ok
          ? `Refund of $${refundAmount} processed successfully. New total: $${result.newTotal}`
          : result.message || 'Error processing refund';
  } catch (error) {
      responseMessage.style.color = 'red';
      responseMessage.textContent = 'An error occurred. Please try again.';
  }
});
