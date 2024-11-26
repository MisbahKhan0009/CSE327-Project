// Preload the guest email from localStorage
document.addEventListener("DOMContentLoaded", () => {
    let guestEmail = localStorage.getItem("guestEmail");
    if (!guestEmail) {
        guestEmail = "tohid@ferdoush.com"; // Default email
    }
    document.getElementById("guestId").value = guestEmail;
});

// Handle star rating selection
document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        document.getElementById("rating").value = value;

        // Highlight selected stars
        document.querySelectorAll(".star").forEach((s) => {
            s.classList.remove("selected");
        });
        this.classList.add("selected");
        for (let prev = this.previousElementSibling; prev; prev = prev.previousElementSibling) {
            prev.classList.add("selected");
        }
    });
});

// Submit feedback
document.getElementById("feedbackForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    const guestId = document.getElementById("guestId").value.trim();
    const description = document.getElementById("description").value.trim();
    const rating = document.getElementById("rating").value;

    // Validate form inputs
    if (!guestId || !description || !rating) {
        const responseMessage = document.getElementById("responseMessage");
        responseMessage.style.color = "red";
        responseMessage.textContent = "Please fill out all fields before submitting.";
        return;
    }

    const feedbackData = {
        guest_id: guestId,
        description,
        date: new Date().toISOString().split("T")[0], // Get today's date
        rating,
    };

    try {
        const response = await fetch("http://localhost:3000/api/feedback", { // Use the correct backend URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
        });

        const result = await response.json();
        const responseMessage = document.getElementById("responseMessage");

        if (response.ok) {
            responseMessage.style.color = "green";
            responseMessage.textContent = result.message; // Success message
        } else {
            responseMessage.style.color = "red";
            responseMessage.textContent = result.error || "Failed to submit feedback.";
        }
    } catch (error) {
        console.error("Error submitting feedback:", error);
        const responseMessage = document.getElementById("responseMessage");
        responseMessage.style.color = "red";
        responseMessage.textContent = "An error occurred. Please try again.";
    }
});
