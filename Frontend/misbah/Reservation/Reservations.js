/**
 * @file reservation.controller.js
 * @description Controller for managing reservations in the frontend.
 */

// DOM Elements
const reservationTable = document
  .getElementById("reservationTable")
  .querySelector("tbody");
const createReservationBtn = document.getElementById("createReservationBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const reservationForm = document.getElementById("reservationForm");

/**
 * Formats a date string into "day Month, year" format.
 *
 * @function formatDate
 * @param {string} dateStr - The date string to format (ISO format expected).
 * @returns {string} - Formatted date string (e.g., "14 November, 2024").
 *
 * @example
 * formatDate("2024-11-14"); // "14 November, 2024"
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

/**
 * Fetches reservations from the backend API and populates the reservation table.
 *
 * @function fetchReservations
 * @returns {void}
 *
 * @example
 * // Sample usage:
 * fetchReservations();
 */
function fetchReservations() {
  fetch("http://localhost:3000/api/reservations") // Replace with your backend URL
    .then((response) => response.json())
    .then((data) => {
      reservationTable.innerHTML = ""; // Clear the table
      data.forEach((reservation) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${reservation.reservation_id}</td>
          <td>${reservation.guest_id}</td>
          <td>${reservation.room_id}</td>
          <td>${formatDate(reservation.checkIn_date)}</td>
          <td>${formatDate(reservation.checkOut_date)}</td>
          <td>${reservation.bill_id}</td>
        `;
        reservationTable.appendChild(row);
      });
    })
    .catch((err) => console.error("Error fetching reservations:", err));
}

/**
 * Opens the modal for creating a new reservation.
 *
 * @event createReservationBtn:click
 */
createReservationBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

/**
 * Closes the modal for creating a reservation.
 *
 * @event closeModal:click
 */
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

/**
 * Submits the reservation form, sending data to the backend API.
 *
 * @event reservationForm:submit
 * @param {Event} e - The submit event object.
 *
 * @returns {void}
 *
 * @example
 * // Sample request body sent to the backend:
 * // {
 * //   "guest_id": "123",
 * //   "room_id": 45,
 * //   "checkIn_date": "2024-11-14",
 * //   "checkOut_date": "2024-11-20",
 * //   "bill_id": 789
 * // }
 */
reservationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newReservation = {
    guest_id: document.getElementById("guestId").value,
    room_id: parseInt(document.getElementById("roomId").value),
    checkIn_date: document.getElementById("checkInDate").value,
    checkOut_date: document.getElementById("checkOutDate").value,
    bill_id: parseInt(document.getElementById("billId").value),
  };

  fetch("http://localhost:3000/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newReservation),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Reservation created successfully") {
        alert("Reservation created!");
        modal.classList.add("hidden");
        fetchReservations(); // Refresh the table
      } else {
        alert("Error: " + (data.error || data.message));
      }
    })
    .catch((err) => console.error("Error creating reservation:", err));
});

// Fetch reservations when the page loads
fetchReservations();
