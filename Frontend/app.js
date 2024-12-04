// API Base URL
const API_URL = "http://localhost:3000/api";

// Handle Ride Request Form Submission
document.getElementById("rideRequestForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const pickup = document.getElementById("pickup").value;
  const dropoff = document.getElementById("dropoff").value;

  // Send ride request to backend
  const response = await fetch(`${API_URL}/rides/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pickupLocation: pickup, dropoffLocation: dropoff }),
  });

  const data = await response.json();
  document.getElementById("rideStatus").textContent = `Ride Requested! Ride ID: ${data._id}`;
});

// Fetch Ride Requests for Drivers
async function fetchRideRequests() {
  const response = await fetch(`${API_URL}/rides`);
  const rideRequests = await response.json();

  const rideRequestsContainer = document.getElementById("rideRequests");
  rideRequestsContainer.innerHTML = "";

  rideRequests.forEach((ride) => {
    const rideDiv = document.createElement("div");
    rideDiv.className = "ride-request";
    rideDiv.innerHTML = `
      <p><strong>Pickup:</strong> ${ride.pickupLocation}</p>
      <p><strong>Dropoff:</strong> ${ride.dropoffLocation}</p>
      <button onclick="acceptRide('${ride._id}')">Accept Ride</button>
    `;
    rideRequestsContainer.appendChild(rideDiv);
  });
}

// Accept Ride as Driver
async function acceptRide(rideId) {
  const response = await fetch(`${API_URL}/rides/${rideId}/accept`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ driver: "Driver_ID" }), // Replace with actual driver ID
  });

  const data = await response.json();
  alert(`Ride Accepted! Ride ID: ${data._id}`);
  fetchRideRequests(); // Refresh ride requests
}

// Fetch ride requests periodically
setInterval(fetchRideRequests, 5000); // Poll every 5 seconds
