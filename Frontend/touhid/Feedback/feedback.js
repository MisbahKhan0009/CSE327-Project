/**
 * @file feedbackHandler.js
 * @description Handles the feedback submission functionality, including preloading the guest email, 
 * managing star rating selection, and submitting feedback to the backend.
 */

/**
 * Preloads the guest email from localStorage into the feedback form.
 * If no email is stored, a default email is used.
 */
document.addEventListener("DOMContentLoaded", () => {
    let guestEmail = localStorage.getItem("guestEmail");
    if (!guestEmail) {
        guestEmail = "tohid@ferdoush.com"; // Default email
    }
    document.getElementById("guestId").value = guestEmail;
});

/**
 * Handles the selection of star ratings.
 * Updates the rating value and visually highlights the selected stars.
 */
document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        document.getElementById("rating").value = value;

        document.querySelectorAll(".star").forEach((s) => {
            s.classList.remove("selected");
        });
        this.classList.add("selected");
        for (let prev = this.previousElementSibling; prev; prev = prev.previousElementSibling) {
            prev.classList.add("selected");
        }
    });
});

/**
 * Handles the feedback form submission.
 * Validates form inputs, sends the feedback data to the backend, and displays appropriate messages.
 * @param {Event} event - The form submission event.
 */
document.getElementById("feedbackForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const guestId = document.getElementById("guestId").value.trim();
    const description = document.getElementById("description").value.trim();
    const rating = document.getElementById("rating").value;

    if (!guestId || !description || !rating) {
        const responseMessage = document.getElementById("responseMessage");
        responseMessage.style.color = "red";
        responseMessage.textContent = "Please fill out all fields before submitting.";
        return;
    }

    const feedbackData = {
        guest_id: guestId,
        description,
        date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
        rating,
    };

    try {
        const response = await fetch("http://localhost:3000/api/feedback", {
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
            responseMessage.textContent = result.message;
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
