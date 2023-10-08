    overlay.style.display = "flex";
    const popupContent = document.createElement("div");
    popupContent.className = "popup-content";

    // Update the content of the "popupContent" element with HTML markup
    popupContent.innerHTML = `
        <!-- This is an HTML template for the popup content -->
        <div class="payment-details">
            <h3>Payment Details</h3>
            <p><strong>Network:</strong> ${network}</p>
            <p><strong>Amount:</strong> ₦${amount}</p>
            <p><strong>Data Value:</strong> ${dataValue}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        </div>
        <div class="paystack-form">
            <h3>Complete Payment</h3>
            <form id="paymentForm">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email-address" required />
                </div>
                <br>
                <div class="form-submit">
                    <button type="button" id="payButton"> Pay </button>
                </div>
            </form>
        </div>
        <div class="button-space"></div>
        <button id="closePopup">Close</button>
    `;

    // Updated code after changes
    const closePopupButton = popupContent.querySelector("#closePopup");

    closePopupButton.addEventListener("click", function () {
        // When the button is clicked, hide the overlay, effectively closing the popup
        overlay.style.display = "none";
    });

    // Initialize Paystack payment when Pay button is clicked
    const payButton = popupContent.querySelector("#payButton");

    payButton.addEventListener("click", async function () {
        // Initialize Paystack payment
        var handler = PaystackPop.setup({
            key: 'pk_test_a36196e0e57da2985d547ff354cd420aee807f01', // Your Paystack public key
            email: popupContent.querySelector("#email-address").value, // Get the email from the input field
            amount: amount * 100, // Convert the amount to kobo (100 kobo = 1 Naira)
            currency: 'NGN', // Set the currency to Nigerian Naira
            subaccount: 'ACCT_cd356rilazdkwy4', // Subaccount identifier, if applicable
            transaction_charge: 50, // Transaction charge, if applicable
            bearer: 'subaccount', // Payment bearer, if applicable
            // Callback function for handling payment response
            callback: function (response) {
                // Check if the payment was successful
                if (response.status === 'success') {
                    // Payment successful, you can display a success message to the user
                    showSuccessMessage('Payment successful! Thank you for using our service.');
                    // Send data to your server for SMS processing (see step 3)
                    sendPaymentDataToServer(response.reference);
                } else {
                    // Payment failed or was not completed
                    showError('Payment failed or was not completed. Please try again.');
                }
            }, onClose: function () {
                // This function is called when the payment window is closed
                alert('Payment window closed.');
            }
        });
        // Open the Paystack payment iframe
        handler.openIframe();
    });

    overlay.appendChild(popupContent);