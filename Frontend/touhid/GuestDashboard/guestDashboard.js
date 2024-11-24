// Fetch and display guest data
async function fetchAndDisplayGuestData() {
  // Get the guest email from localStorage
  const guestEmail = localStorage.getItem("guestEmail") || "misbah@khan.com"; // Default email for testing
  const apiURL = `http://localhost:3000/api/guest/info?email=${guestEmail}`;
  //encodeURIComponent()
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

// Fetch and display amenities
async function fetchAndDisplayAmenities() {
  const apiURL = "http://localhost:3000/api/guest/amenities"; // Reuse amenities endpoint
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

// Fetch data on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayGuestData();
  fetchAndDisplayAmenities();
});
