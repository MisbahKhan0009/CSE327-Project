document.addEventListener("DOMContentLoaded", () => {
    const reservationModal = document.getElementById("reservationModal");
    const createReservationBtn = document.getElementById("createReservationBtn");
    const closeModalBtn = document.querySelector(".close-btn");
    const reservationForm = document.getElementById("reservationForm");
    const reservationTableBody = document.querySelector("#reservationTable tbody");
  
    // Utility function to format dates
    function formatDate(dateString) {
      const date = new Date(dateString); // Convert to Date object
      const options = { day: "numeric", month: "long", year: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    }
  
    // Fetch reservations and display in the table
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
  
    // Open the modal
    createReservationBtn.addEventListener("click", () => {
      reservationModal.style.display = "block";
    });
  
    // Close the modal
    closeModalBtn.addEventListener("click", () => {
      reservationModal.style.display = "none";
    });
  
    // Submit reservation form
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
  