/**
 * @file room.controller.js
 * @description Controller for fetching and displaying room information in the frontend.
 */

/**
 * Fetches room data from the backend API, groups rooms by category, and dynamically generates and displays room cards on the page.
 *
 * Each card includes room details like price, description, category, amenities, and a "Book Now" button.
 *
 * @async
 * @function fetchAndDisplayRooms
 * @returns {Promise<void>}
 */
async function fetchAndDisplayRooms() {
  const apiURL = "http://localhost:3000/api/rooms";
  try {
    const response = await fetch(apiURL);
    const rooms = await response.json();

    // Get the container element to append cards
    const container = document.getElementById("pricing-cards-container");

    // Filter rooms by category (Single, Double, Suite)
    const filteredRooms = {
      single: rooms.find(room => room.category === "single"),
      double: rooms.find(room => room.category === "double"),
      suite: rooms.find(room => room.category === "suite")
    };

    // Create and append cards for each category (if data is available)
    Object.values(filteredRooms).forEach(room => {
      if (room) {
        const card = createRoomCard(room);
        container.appendChild(card);
      }
    });
  } catch (error) {
    console.error("Error fetching room data:", error);
  }
}

// Function to create a room card dynamically
function createRoomCard(room) {
  // Create card elements
  const card = document.createElement('div');
  card.classList.add('pricing-card');
  
  const title = document.createElement('h2');
  title.textContent = room.category.charAt(0).toUpperCase() + room.category.slice(1);
  
  const price = document.createElement('p');
  price.classList.add('price');
  price.textContent = `$${room.price}/month`;

  const features = document.createElement('div');
  features.classList.add('features');
  
  const bedFeature = document.createElement('p');
  bedFeature.innerHTML = `<i class="fas fa-bed"></i> ${room.beds} Bed${room.beds > 1 ? 's' : ''}`;
  features.appendChild(bedFeature);
  
  const userFeature = document.createElement('p');
  userFeature.innerHTML = `<i class="fas fa-users"></i> ${room.maxUsers} User${room.maxUsers > 1 ? 's' : ''}`;
  features.appendChild(userFeature);

  const wifiFeature = document.createElement('p');
  wifiFeature.innerHTML = `<i class="fas fa-wifi"></i> ${room.wifi ? 'Free WiFi' : 'No WiFi'}`;
  features.appendChild(wifiFeature);

  const description = document.createElement('p');
  description.classList.add('details');
  description.textContent = room.description;

  const button = document.createElement('button');
  button.classList.add('btn');
  button.textContent = 'Book Now';

  // Append all elements to the card
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(features);
  card.appendChild(description);
  card.appendChild(button);
  
  return card;
}

// Fetch and display room data on page load
document.addEventListener("DOMContentLoaded", fetchAndDisplayRooms);
