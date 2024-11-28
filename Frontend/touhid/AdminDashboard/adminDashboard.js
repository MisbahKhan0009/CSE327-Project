/**
 * @file adminDashboard.js
 * @description Manages the admin dashboard functionalities such as fetching admin data, managing amenities, 
 * and handling modal operations for editing amenities.
 */

/** Modal element for editing amenities */
const modal = document.getElementById("edit-modal");

/** Stores the ID of the amenity currently being edited */
let currentAmenityId = null;

/**
 * Opens the edit modal.
 */
function openModal() {
    modal.classList.add("show");
}

/**
 * Closes the edit modal.
 */
function closeModal() {
    modal.classList.remove("show");
}

/**
 * Closes the modal when clicking outside of it.
 * @param {Event} event - The click event.
 */
window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

/**
 * Fetches and displays admin data on the dashboard.
 * Populates the admin profile card with the fetched data.
 */
async function fetchAndDisplayAdminData() {
    let adminEmail = localStorage.getItem("adminEmail");
    if (!adminEmail) {
        adminEmail = "kuddus@ali.com"; // Default email
        localStorage.setItem("adminEmail", adminEmail);
    }
    const apiURL = `http://localhost:3000/api/admin/info?email=${adminEmail}`;
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

/**
 * Creates a table row for an amenity.
 * @param {Object} amenity - The amenity object containing its details.
 * @returns {HTMLElement} - The created table row.
 */
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

/**
 * Fetches and displays the list of amenities.
 * Populates the amenities table with the fetched data.
 */
async function fetchAndDisplayAmenities() {
    const apiURL = "http://localhost:3000/api/amenities";
    try {
        const response = await fetch(apiURL);
        const amenities = await response.json();

        const tbody = document.getElementById("amenities-body");
        tbody.innerHTML = ""; 

        amenities.forEach((amenity) => {
            const row = createTableRow(amenity);
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching amenities:", error);
    }
}

/**
 * Opens the edit modal with the details of the selected amenity pre-filled.
 * @param {Object} amenity - The amenity object to edit.
 */
async function editAmenity(amenity) {
    currentAmenityId = amenity.amenity_id;

    document.getElementById("edit-amenity-id").value = amenity.amenity_id;
    document.getElementById("edit-amenity-name").value = amenity.name;
    document.getElementById("edit-amenity-description").value = amenity.description;
    document.getElementById("edit-amenity-numbers").value = amenity.numbers;

    openModal();
}

/**
 * Adds a new amenity based on the form data.
 * @param {Event} event - The form submission event.
 */
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
            fetchAndDisplayAmenities(); 
            document.getElementById("add-amenity-form").reset();
        } else {
            throw new Error("Failed to add amenity");
        }
    } catch (error) {
        console.error("Error adding amenity:", error);
        alert("Failed to add amenity. Please try again.");
    }
}

/**
 * Handles the edit form submission to update the amenity details.
 * @param {Event} event - The form submission event.
 */
async function handleEditFormSubmit(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("edit-amenity-name").value,
        description: document.getElementById("edit-amenity-description").value,
        numbers: document.getElementById("edit-amenity-numbers").value,
    };

    try {
        const response = await fetch(`http://localhost:3000/api/amenities/${currentAmenityId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            closeModal();
            await fetchAndDisplayAmenities(); 
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

    document.getElementById("add-amenity-form").addEventListener("submit", addAmenity);
    document.getElementById("edit-amenity-form").addEventListener("submit", handleEditFormSubmit);

    const closeButton = document.querySelector(".close");
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }
});
