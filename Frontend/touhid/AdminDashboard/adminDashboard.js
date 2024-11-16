// adminDashboard.js
async function fetchAndDisplayAdminData() {
    const apiURL = "http://localhost:3000/api/admin/info"; // Update to pass email query parameter
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const admin = await response.json();
  
      // Populate profile card
      document.getElementById("admin-name").textContent = admin.name || "N/A";
      document.getElementById("admin-email").textContent = admin.email || "N/A";
      document.getElementById("admin-phone").textContent = admin.phone || "N/A";
    } catch (error) {
      console.error("Error fetching admin data:", error);
      document.getElementById("admin-name").textContent = "Error loading data";
      document.getElementById("admin-email").textContent = "Error loading data";
      document.getElementById("admin-phone").textContent = "Error loading data";
    }
  }
  // Fetch and display admin data on page load
  document.addEventListener("DOMContentLoaded", fetchAndDisplayAdminData);
  // Fetch and display amenities
async function fetchAndDisplayAmenities() {
  const apiURL = "http://localhost:3000/api/amenities";
  try {
    const response = await fetch(apiURL);
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

      // Actions
      const actionsCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = () => editAmenity(amenity);
      actionsCell.appendChild(editButton);
      row.appendChild(actionsCell);

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching amenities:", error);
  }
}

// Add amenity
async function addAmenity(event) {
  event.preventDefault();
  const name = document.getElementById("amenity-name").value;
  const description = document.getElementById("amenity-description").value;
  const numbers = document.getElementById("amenity-numbers").value;

  try {
    const response = await fetch("http://localhost:3000/api/amenities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, numbers }),
    });

    if (response.ok) {
      alert("Amenity added successfully!");
      fetchAndDisplayAmenities(); // Refresh amenities
      document.getElementById("add-amenity-form").reset();
    }
  } catch (error) {
    console.error("Error adding amenity:", error);
  }
}

// Edit amenity
async function editAmenity(amenity) {
  const name = prompt("Enter new name:", amenity.name);
  const description = prompt("Enter new description:", amenity.description);
  const numbers = prompt("Enter new numbers:", amenity.numbers);

  if (name && description && numbers) {
    try {
      const response = await fetch(`http://localhost:3000/api/amenities/${amenity.amenity_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, numbers }),
      });

      if (response.ok) {
        alert("Amenity updated successfully!");
        fetchAndDisplayAmenities(); // Refresh amenities
      }
    } catch (error) {
      console.error("Error updating amenity:", error);
    }
  }
}

// Add event listeners
document.getElementById("add-amenity-form").addEventListener("submit", addAmenity);
document.addEventListener("DOMContentLoaded", fetchAndDisplayAmenities);

  