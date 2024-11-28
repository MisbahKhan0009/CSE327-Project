/**
 * @file guestDashboard.js
 * @description This file contains functions to fetch and display guest data, reservation details, amenities, and payment history
 * for the guest on their dashboard.
 */
// Fetch and display guest data
/**
 * @function fetchAndDisplayGuestData
 * @description Fetches the guest's personal data using their email, which is either stored in `localStorage` or set to a default value.
 * If the data is successfully retrieved, it populates the profile card with guest details (name, email, and phone).
 * In case of an error, an error message is displayed instead of the guest information.
 */
async function fetchAndDisplayGuestData() {
  let guestEmail = localStorage.getItem("guestEmail");
  if (!guestEmail) {
      guestEmail = "tohid@ferdoush.com"; // Default email
      localStorage.setItem("guestEmail", guestEmail);
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
/**
 * @function fetchAndDisplayReservation
 * @description Fetches the current reservation details for the guest and displays them.
 * If no current reservation is found, a message indicating no reservation is shown.
 * The reservation details include room category, check-in and check-out dates, and booking status.
 */
async function fetchAndDisplayReservation() {
  // Get the guest email from localStorage
  const guestEmail = localStorage.getItem("guestEmail") || "tohid@ferdoush.com"; 
  const apiURL = `http://localhost:3000/api/getreservations/current-reservation?guestId=${guestEmail}`;

  try {
    const response = await fetch(apiURL);
    

    if (response.status === 404) {
 
      const reservationContainer = document.getElementById("reservation-details");
      reservationContainer.innerHTML = `
        <div class="reservation-loading">No current reservation found.</div>
      `;
      return;
    }


    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const reservations = await response.json();

    const reservationContainer = document.getElementById("reservation-details");
    reservationContainer.innerHTML = ""; 

    if (reservations.length === 0) {
      reservationContainer.innerHTML = `
        <div class="reservation-loading">No current reservation found.</div>
      `;
      return;
    }


    const reservation = reservations[0];

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

// Fetch and display amenities
/**
 * @function fetchAndDisplayAmenities
 * @description Fetches and displays available amenities in a table.
 * Each amenity's name, description, and number are displayed in the table. 
 */
async function fetchAndDisplayAmenities() {
  const apiURL = "http://localhost:3000/api/guest/amenities";
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const amenities = await response.json();

    const tbody = document.getElementById("amenities-body");
    tbody.innerHTML = ""; 

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

// Fetch and display payment history
/**
 * @function fetchAndDisplayPaymentHistory
 * @description Fetches and displays the payment history for the guest in a table.
 * Each payment's bill ID, total amount, and payment date are displayed in the table.
 * If there is no payment history, a message is shown. 
 * If an error occurs during fetching, an error message is displayed.
 */
async function fetchAndDisplayPaymentHistory() {
  const guestEmail = localStorage.getItem("guestEmail") || "tohid@ferdoush.com"; // Default email for testing
  const apiURL = `http://localhost:3000/api/payments/payment-history?guestEmail=${guestEmail}`;

  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

   
    const data = await response.json();
    const paymentHistoryBody = document.getElementById("payment-history-body");

    paymentHistoryBody.innerHTML = "";


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

  
    data.forEach((payment) => {
      const row = document.createElement("tr");

  
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

// Event listener for DOM content loaded
/**
 * @event DOMContentLoaded
 * @description This event listener triggers the functions to fetch and display guest data, reservation details, amenities, 
 * and payment history when the DOM content has loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayGuestData();
  fetchAndDisplayReservation();
  fetchAndDisplayAmenities();
  fetchAndDisplayPaymentHistory();
});
