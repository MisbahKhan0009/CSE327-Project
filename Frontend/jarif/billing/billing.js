// Function to format the date as '31 October, 2024'
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }
  
  // Function to fetch all bills from the backend
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
  
  // Function to display the bills in a table
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
  
  // Call the function to load the bills when the page loads
  document.addEventListener('DOMContentLoaded', fetchBills);
  
  // Handle Create Bill
  document.getElementById('createBillForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const roomCharge = document.getElementById('roomCharge').value;
    const servicesCharge = document.getElementById('servicesCharge').value;
    const taxRate = document.getElementById('taxRate').value;
    const date = document.getElementById('date').value;
  
    const responseMessage = document.getElementById('responseMessage');
  
    const data = {
      roomCharge,
      servicesCharge,
      taxRate,
      date,
    };
  
    try {
      const res = await fetch('http://localhost:3000/api/bills/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      if (res.status === 200) {
        responseMessage.style.color = 'green';
        responseMessage.textContent = `Bill created successfully. Total: $${result.total}`;
      } else {
        responseMessage.style.color = 'red';
        responseMessage.textContent = result.message || 'Error creating bill';
      }
    } catch (error) {
      responseMessage.style.color = 'red';
      responseMessage.textContent = 'An error occurred. Please try again.';
    }
  });
  
  // Handle Update Bill
  document.getElementById('updateBillForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const billId = document.getElementById('billId').value;
    const roomCharge = document.getElementById('roomCharge').value;
    const servicesCharge = document.getElementById('servicesCharge').value;
    const taxRate = document.getElementById('taxRate').value;
  
    const responseMessage = document.getElementById('responseMessage');
  
    const data = {
      billId,
      roomCharge,
      servicesCharge,
      taxRate,
    };
  
    try {
      const res = await fetch('http://localhost:3000/api/bills/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      if (res.status === 200) {
        responseMessage.style.color = 'green';
        responseMessage.textContent = `Bill updated successfully. Total: $${result.total}`;
      } else {
        responseMessage.style.color = 'red';
        responseMessage.textContent = result.message || 'Error updating bill';
      }
    } catch (error) {
      responseMessage.style.color = 'red';
      responseMessage.textContent = 'An error occurred. Please try again.';
    }
  });
  
  // Handle Refund Bill
  document.getElementById('refundBillForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const billId = document.getElementById('billId').value;
    const refundAmount = document.getElementById('refundAmount').value;
  
    const responseMessage = document.getElementById('responseMessage');
  
    const data = {
      billId,
      refundAmount,
    };
  
    try {
      const res = await fetch('http://localhost:3000/api/bills/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      if (res.status === 200) {
        responseMessage.style.color = 'green';
        responseMessage.textContent = `Refund of $${refundAmount} processed successfully. New total: $${result.newTotal}`;
      } else {
        responseMessage.style.color = 'red';
        responseMessage.textContent = result.message || 'Error processing refund';
      }
    } catch (error) {
      responseMessage.style.color = 'red';
      responseMessage.textContent = 'An error occurred. Please try again.';
    }
  });
  