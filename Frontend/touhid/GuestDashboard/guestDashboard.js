// Fetch and display guest data
async function fetchAndDisplayGuestData() {
  // Get the guest email from localStorage
  let guestEmail = localStorage.getItem("guestEmail");
  if (!guestEmail) {
      guestEmail = "tohid@ferdoush.com"; // Default email
      localStorage.setItem("guestEmail", guestEmail); // Store the default email in localStorage
  }
  const apiURL = `http://localhost:3000/api/guest/info?email=${guestEmail}`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const guest = await response.json();

    // Populate profile card
    document.getElementById("guest-name").textContent = guest.name || "N/A";
    document.getElementById("guest-email").textContent = guest.email || "N/A";
    document.getElementById("guest-phone").textContent = guest.phone || "N/A";
  } catch (error) {
    console.error("Error fetching guest data:", error);
    document.getElementById("guest-name").textContent = "Error loading data";
    document.getElementById("guest-email").textContent = "Error loading data";
    document.getElementById("guest-phone").textContent = "Error loading data";
  }
}

// Fetch and display current reservation
async function fetchAndDisplayReservation() {
  // Get the guest email from localStorage
  const guestEmail = localStorage.getItem("guestEmail") || "misbah@khan.com"; // Default email for testing
  const apiURL = `http://localhost:3000/api/getreservations/current-reservation?guestId=${guestEmail}`;

  try {
    const response = await fetch(apiURL);
    
    // Check the response status
    if (response.status === 404) {
      // This means no current reservation was found
      const reservationContainer = document.getElementById("reservation-details");
      reservationContainer.innerHTML = `
        <div class="reservation-loading">No current reservation found.</div>
      `;
      return;
    }

    // Check if the response is not ok for other error cases
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const reservations = await response.json();

    const reservationContainer = document.getElementById("reservation-details");
    reservationContainer.innerHTML = ""; // Clear previous data

    if (reservations.length === 0) {
      reservationContainer.innerHTML = `
        <div class="reservation-loading">No current reservation found.</div>
      `;
      return;
    }

    // Assuming the first reservation in the array is the current one
    const reservation = reservations[0];

    // Create reservation details card
    const reservationCard = `
      <div class="reservation-item">
        <i class="fas fa-bed icon"></i>
        <p class="label">Room Category</p>
        <p class="value">${reservation.roomCategory || 'N/A'}</p>
      </div>
      <div class="reservation-item">
        <i class="fas fa-calendar-check icon"></i>
        <p class="label">Check-In Date</p>
        <p class="value">${reservation.checkInDate || 'N/A'}</p>
      </div>
      <div class="reservation-item">
        <i class="fas fa-calendar-times icon"></i>
        <p class="label">Check-Out Date</p>
        <p class="value">${reservation.checkOutDate || 'N/A'}</p>
      </div>
      <div class="reservation-item">
        <i class="fas fa-info-circle icon"></i>
        <p class="label">Booking Status</p>
        <p class="value">${reservation.bookingStatus || 'N/A'}</p>
      </div>
    `;

    reservationContainer.innerHTML = reservationCard;
  } catch (error) {
    console.error("Error fetching reservation details:", error);
    const reservationContainer = document.getElementById("reservation-details");
    reservationContainer.innerHTML = `
      <div class="reservation-loading">Error loading reservation details.</div>
    `;
  }
}
// Fetch and display amenities (unchanged)
async function fetchAndDisplayAmenities() {
  const apiURL = "http://localhost:3000/api/guest/amenities";
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const amenities = await response.json();

    const tbody = document.getElementById("amenities-body");
    tbody.innerHTML = ""; // Clear previous data

    amenities.forEach((amenity) => {
      const row = document.createElement("tr");

      // Name
      const nameCell = document.createElement("td");
      nameCell.textContent = amenity.name;
      row.appendChild(nameCell);

      // Description
      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = amenity.description;
      row.appendChild(descriptionCell);

      // Numbers
      const numbersCell = document.createElement("td");
      numbersCell.textContent = amenity.numbers;
      row.appendChild(numbersCell);

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching amenities:", error);
  }
}
async function fetchAndDisplayPaymentHistory() {
  // Get the guest email from localStorage
  const guestEmail = localStorage.getItem("guestEmail") || "misbah@khan.com"; // Default email for testing
  const apiURL = `http://localhost:3000/api/payments/payment-history?guestEmail=${guestEmail}`;

  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Parse the response JSON
    const data = await response.json();

    const paymentHistoryBody = document.getElementById("payment-history-body");
    
    // Clear previous data
    paymentHistoryBody.innerHTML = ""; 

    // Comprehensive error handling
    if (!response.ok) {
      console.error('Response not OK:', data);
      paymentHistoryBody.innerHTML = `
        <tr>
          <td colspan="3" class="payment-history-loading">
            ${data.message || 'Error fetching payment history'}
          </td>
        </tr>
      `;
      return;
    }

    // Check if data is empty
    if (!data || data.length === 0) {
      paymentHistoryBody.innerHTML = `
        <tr>
          <td colspan="3" class="payment-history-loading">
            No payment history found.
          </td>
        </tr>
      `;
      return;
    }

    // Populate the table with payment history
    data.forEach((payment) => {
      const row = document.createElement("tr");

      // Validate payment object properties
      const billId = payment.bill_id ?? 'N/A';
      const total = payment.total ?? 0;
      const paymentDate = payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : 'N/A';

      row.innerHTML = `
        <td>${billId}</td>
        <td>$${Number(total).toFixed(2)}</td>
        <td>${paymentDate}</td>
      `;

      paymentHistoryBody.appendChild(row);
    });

  } catch (error) {
    console.error("Error fetching payment history:", error);
    const paymentHistoryBody = document.getElementById("payment-history-body");
    paymentHistoryBody.innerHTML = `
      <tr>
        <td colspan="3" class="payment-history-loading">
          ${error.message || "Error loading payment history. Please try again later."}
        </td>
      </tr>
    `;
  }
}
//DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayGuestData();
  fetchAndDisplayReservation();
  fetchAndDisplayAmenities();
  fetchAndDisplayPaymentHistory();
});
