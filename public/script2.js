// public/script.js
$(document).ready(function() {
    $("form").submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting via HTTP
  
      const message = $("#message").val();
  
      // AJAX request to submit the form data without reloading the page
      $.ajax({
        type: "POST",
        url: "/send-sms",
        data: { message: message },
        success: function(response) {
          // Display a success message or perform any other desired actions
          alert("SMS sent successfully!");
          $("#message").val(""); // Clear the input field
        },
        error: function(error) {
          // Display an error message or handle errors gracefully
          console.error("Error sending SMS: " + error);
          alert("Error sending SMS. Please try again.");
        }
      });
    });
  });
  