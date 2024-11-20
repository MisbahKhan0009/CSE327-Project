document.addEventListener("DOMContentLoaded", function () {
    const roomsTableBody = document.getElementById('roomsBody');

    // Function to fetch available rooms from the API
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
