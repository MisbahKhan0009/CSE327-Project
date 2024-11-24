// adminDashboard.js

// Modal elements and state
const modal = document.getElementById("edit-modal");
let currentAmenityId = null;

// Modal functions
function openModal() {
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Fetch and display admin data
async function fetchAndDisplayAdminData() {
    const apiURL = "http://localhost:3000/api/admin/info";
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

// Create table row function
function createTableRow(amenity) {
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
    editButton.className = "edit-btn";
    editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editButton.onclick = () => editAmenity(amenity);
    actionsCell.appendChild(editButton);
    row.appendChild(actionsCell);

    return row;
}

// Fetch and display amenities
async function fetchAndDisplayAmenities() {
    const apiURL = "http://localhost:3000/api/amenities";
    try {
        const response = await fetch(apiURL);
        const amenities = await response.json();

        const tbody = document.getElementById("amenities-body");
        tbody.innerHTML = ""; // Clear previous data

        amenities.forEach((amenity) => {
            const row = createTableRow(amenity);
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching amenities:", error);
    }
}

// Edit amenity function
async function editAmenity(amenity) {
    currentAmenityId = amenity.amenity_id;
    
    // Populate the form
    document.getElementById("edit-amenity-id").value = amenity.amenity_id;
    document.getElementById("edit-amenity-name").value = amenity.name;
    document.getElementById("edit-amenity-description").value = amenity.description;
    document.getElementById("edit-amenity-numbers").value = amenity.numbers;
    
    openModal();
}

// Add amenity function
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
        } else {
            throw new Error("Failed to add amenity");
        }
    } catch (error) {
        console.error("Error adding amenity:", error);
        alert("Failed to add amenity. Please try again.");
    }
}

// Handle edit form submission
async function handleEditFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById("edit-amenity-name").value,
        description: document.getElementById("edit-amenity-description").value,
        numbers: document.getElementById("edit-amenity-numbers").value
    };

    try {
        const response = await fetch(`http://localhost:3000/api/amenities/${currentAmenityId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            closeModal();
            await fetchAndDisplayAmenities(); // Refresh the table
        } else {
            throw new Error("Failed to update amenity");
        }
    } catch (error) {
        console.error("Error updating amenity:", error);
        alert("Failed to update amenity. Please try again.");
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayAdminData();
    fetchAndDisplayAmenities();
    
    // Add event listeners
    document.getElementById("add-amenity-form").addEventListener("submit", addAmenity);
    document.getElementById("edit-amenity-form").addEventListener("submit", handleEditFormSubmit);
    
    // Close button in modal
    const closeButton = document.querySelector(".close");
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }
});