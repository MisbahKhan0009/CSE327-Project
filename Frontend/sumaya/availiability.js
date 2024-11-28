/**
 * @file rooms.js
 * @description Frontend script for fetching and displaying available rooms from the API.
 */

document.addEventListener("DOMContentLoaded", function () {
    const roomsTableBody = document.getElementById('roomsBody'); // Table body to display room data

    /**
     * Fetch available rooms.
     * 
     * This function fetches the list of available rooms from the backend API and displays them in the table.
     * If no rooms are available or an error occurs, appropriate messages are shown.
     * 
     * @async
     * @function fetchAvailableRooms
     * 
     * @returns {Promise<void>}
     * 
     * @example
     * // API response example
     * // [
     * //   {
     * //     "room_id": 1,
     * //     "price": 100,
     * //     "category": "Deluxe",
     * //     "description": "Spacious room with a king-sized bed",
     * //     "isBooked": 0
     * //   }
     * // ]
     * 
     * @example
     * // Table display example
     * // | Room ID | Price  | Category | Description               | Action     |
     * // |---------|--------|----------|---------------------------|------------|
     * // | 1       | $100   | Deluxe   | Spacious room with a ...  | Book Now   |
     * 
     * // Error message example
     * // <tr><td colspan="5" style="text-align:center;">Error fetching data</td></tr>
     */
    async function fetchAvailableRooms() {
        try {
            const response = await fetch('http://localhost:3000/api/rooms/available'); // Update the URL based on your backend
            const rooms = await response.json();
            
            if (rooms.length === 0) {
                roomsTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No available rooms</td></tr>';
            } else {
                roomsTableBody.innerHTML = ''; // Clear previous rows

                rooms.forEach(room => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${room.room_id}</td>
                        <td>$${room.price}</td>
                        <td>${room.category}</td>
                        <td>${room.description}</td>
                        <td>
                            <button ${room.isBooked ? 'disabled' : ''}>Book Now</button>
                        </td>
                    `;

                    roomsTableBody.appendChild(row);
                });
            }
        } catch (error) {
            console.error('Error fetching rooms:', error);
            roomsTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Error fetching data</td></tr>';
        }
    }

    // Call the function to fetch rooms when the page is loaded
    fetchAvailableRooms();
});
