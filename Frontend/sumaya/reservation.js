/**
 * @file reservations.js
 * @description Frontend script for managing reservation-related operations, including fetching reservations and creating new reservations via a modal form.
 */

document.addEventListener("DOMContentLoaded", () => {
  const reservationModal = document.getElementById("reservationModal"); // Modal element for creating reservations
  const createReservationBtn = document.getElementById("createReservationBtn"); // Button to open the reservation modal
  const closeModalBtn = document.querySelector(".close-btn"); // Button to close the reservation modal
  const reservationForm = document.getElementById("reservationForm"); // Form element for creating reservations
  const reservationTableBody = document.querySelector("#reservationTable tbody"); // Table body for displaying reservations

  /**
   * Utility function to format dates.
   * 
   * Converts a date string to a human-readable format.
   * 
   * @function formatDate
   * @param {string} dateString - The input date string (e.g., "2024-01-01").
   * @returns {string} - Formatted date string (e.g., "January 1, 2024").
   */
  function formatDate(dateString) {
      const date = new Date(dateString); // Convert to Date object
      const options = { day: "numeric", month: "long", year: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  /**
   * Fetch reservations from the API and display them in the table.
   * 
   * This function sends a GET request to the reservations API and populates the table with the response data.
   * 
   * @function fetchReservations
   * @returns {void}
   * 
   * @example
   * // Table display example
   * // | Reservation ID | Room ID | Guest Name | Check-In Date | Check-Out Date |
   * // |----------------|---------|------------|---------------|----------------|
   * // | 1              | 101     | John Doe   | January 1, 2024 | January 5, 2024 |
   */
  function fetchReservations() {
      fetch("http://localhost:3000/api/reservations")
          .then(response => response.json())
          .then(data => {
              reservationTableBody.innerHTML = ""; // Clear table before inserting
              data.forEach(reservation => {
                  const row = `
                      <tr>
                          <td>${reservation.reservation_id}</td>
                          <td>${reservation.room_id}</td>
                          <td>${reservation.guest_name}</td>
                          <td>${formatDate(reservation.checkIn_date)}</td>
                          <td>${formatDate(reservation.checkOut_date)}</td>
                      </tr>
                  `;
                  reservationTableBody.innerHTML += row;
              });
          })
          .catch(err => console.error("Error fetching reservations:", err));
  }

  /**
   * Open the reservation modal.
   * 
   * Displays the modal form for creating a new reservation.
   * 
   * @event click
   */
  createReservationBtn.addEventListener("click", () => {
      reservationModal.style.display = "block";
  });

  /**
   * Close the reservation modal.
   * 
   * Hides the modal form for creating a new reservation.
   * 
   * @event click
   */
  closeModalBtn.addEventListener("click", () => {
      reservationModal.style.display = "none";
  });

  /**
   * Handle reservation form submission.
   * 
   * Submits the reservation form data to the API and updates the table with the new reservation.
   * 
   * @event submit
   * @param {Event} e - The submit event object.
   * 
   * @returns {void}
   * 
   * @example
   * // Form data example
   * // {
   * //   "room_id": 101,
   * //   "guest_name": "John Doe",
   * //   "checkIn_date": "2024-01-01",
   * //   "checkOut_date": "2024-01-05"
   * // }
   */
  reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
          room_id: document.getElementById("room_id").value,
          guest_name: document.getElementById("guest_name").value,
          checkIn_date: document.getElementById("checkIn_date").value,
          checkOut_date: document.getElementById("checkOut_date").value,
      };

      fetch("http://localhost:3000/api/reservations", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      })
          .then(response => response.json())
          .then(data => {
              alert(data.message || "Reservation created!");
              reservationModal.style.display = "none";
              fetchReservations(); // Refresh the table
          })
          .catch(err => console.error("Error creating reservation:", err));
  });

  // Fetch and display reservations on page load
  fetchReservations();
});
