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
  