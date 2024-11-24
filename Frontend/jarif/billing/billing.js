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
        responseMessage.textContent = result.error;
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
        responseMessage.textContent = result.error;
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
        responseMessage.textContent = `Refund of $${refundAmount} processed successfully.`;
      } else {
        responseMessage.style.color = 'red';
        responseMessage.textContent = result.error;
      }
    } catch (error) {
      responseMessage.style.color = 'red';
      responseMessage.textContent = 'An error occurred. Please try again.';
    }
  });
  