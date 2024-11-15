async function fetchAndDisplayRooms() {
  const apiURL = "http://localhost:3000/api/rooms";
  try {
    const response = await fetch(apiURL);
    const rooms = await response.json();

    // Group rooms by category for comparison
    const groupedRooms = rooms.reduce((acc, room) => {
      if (!acc[room.category]) acc[room.category] = [];
      acc[room.category].push(room);
      return acc;
    }, {});

    const tbody = document.getElementById("comparison-body");
    tbody.innerHTML = ""; // Clear any previous data

    // Populate the table with room details
    for (const category in groupedRooms) {
      const rooms = groupedRooms[category];
      rooms.forEach((room, index) => {
        const row = document.createElement("tr");

        // Only show category name for the first room of each type
        if (index === 0) {
          const categoryCell = document.createElement("td");
          categoryCell.textContent =
            room.category.charAt(0).toUpperCase() + room.category.slice(1);
          categoryCell.rowSpan = rooms.length;
          categoryCell.classList.add("text-center"); // Center text for category
          row.appendChild(categoryCell);
        }

        // Price column (centered)
        const priceCell = document.createElement("td");
        priceCell.textContent = `$${room.price}`;
        priceCell.classList.add("text-center"); // Center text for price
        row.appendChild(priceCell);

        // Description column (left-aligned)
        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = room.description;
        descriptionCell.classList.add("description"); // Left-align text for description
        row.appendChild(descriptionCell);

        // Booking status column (centered)
        const statusCell = document.createElement("td");
        const badge = document.createElement("span");
        badge.classList.add("badge");
        if (room.isBooked) {
          badge.classList.add("booked");
          badge.textContent = "Booked";
        } else {
          badge.classList.add("available");
          badge.textContent = "Available";
        }
        statusCell.classList.add("text-center"); // Center text for booking status
        statusCell.appendChild(badge);
        row.appendChild(statusCell);

        tbody.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching room data:", error);
  }
}

// Fetch and display rooms on page load
document.addEventListener("DOMContentLoaded", fetchAndDisplayRooms);
