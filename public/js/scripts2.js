const networkSelect = document.getElementById("network");
const amountSelect = document.getElementById("amount");
const dataValueDisplay = document.getElementById("dataValueDisplay");
const submitOrderButton = document.getElementById("submitOrder");
const overlay = document.getElementById("overlay");
const phoneNumberInput = document.getElementById("phoneNumber");

const priceList = {
    "9MOBILE": [250, 420, 580, 740, 1900],
    "AIRTEL": [300, 550, 950, 1200, 2250],
    "GLO": [300, 550, 800, 1200, 2250],
    "MTN": [300, 550, 800, 1400, 2500]
};

const dataValues = {
    "9MOBILE": {
        250: "1gb",
        420: "2gb",
        580: "3gb",
        740: "5gb",
        1900: "10gb"
    },
    "AIRTEL": {
        300: "1gb",
        550: "2gb",
        950: "3gb",
        1200: "5gb",
        2250: "10gb"
    },
    "GLO": {
        300: "1gb",
        550: "2gb",
        800: "3gb",
        1200: "5gb",
        2250: "10gb"
    },
    "MTN": {
        300: "1gb",
        550: "2gb",
        800: "3gb",
        1400: "5gb",
        2500: "10gb"
    }
};

networkSelect.addEventListener("change", function () {
    const selectedNetwork = networkSelect.value;
    const amounts = priceList[selectedNetwork];
    amountSelect.innerHTML = "";

    // Add new options to the "amountSelect" dropdown based on the selected network
    amounts.forEach(amount => {
        // Create a new <option> element
        const optionAmount = document.createElement("option");
        // Set the value of the <option> element to the selected amount
        optionAmount.value = amount;
        // Set the text content of the <option> element to display the amount with a currency symbol
        optionAmount.textContent = `₦${amount}`;
        // Append the new <option> element to the "amountSelect" dropdown
        amountSelect.appendChild(optionAmount);
    });
    // Update the data value display
    updateDataValueDisplay();
});

// Function to update the data value display
function updateDataValueDisplay() {
    // Get the selected network from the "networkSelect" dropdown
    const selectedNetwork = networkSelect.value;

    // Get the selected amount from the "amountSelect" dropdown
    const selectedAmount = amountSelect.value;
}

// An event listener for the "amount" select
amountSelect.addEventListener("change", function () {
    // Updates the data value display when the "amount" selection changes
    updateDataValueDisplay();
});

submitOrderButton.addEventListener("click", () => {
    const selectedNetwork = networkSelect.value;
    const selectedAmount = amountSelect.value;
    const selectedDataValue = dataValues[selectedNetwork][selectedAmount];
    const phoneNumber = phoneNumberInput.value;

    if (selectedAmount === "" || phoneNumber === "") {
        displayErrorMessage("Please fill out all required fields.");
        return;
    }

    function validatePhoneNumber(phoneNumber) {
        const phonePattern = /^\+234\d{10}$/;
        return phonePattern.test(phoneNumber);
    }

    if (!validatePhoneNumber(phoneNumber)) {
        displayErrorMessage("Please enter a valid phone number in the format +234XXXXXXXXXX.");
        return;
    }

    openPopup(selectedNetwork, selectedAmount, selectedDataValue, phoneNumber);
});

function openPopup(network, amount, dataValue, phoneNumber) {
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
}

function sendPaymentDataToServer(paymentReference) {
    const selectedNetwork = networkSelect.value;
    const selectedAmount = amountSelect.value;
    const phoneNumber = phoneNumberInput.value;

    // Create an object with payment data
    const paymentData = {
        paymentReference: paymentReference,
        selectedNetwork: selectedNetwork,
        selectedAmount: selectedAmount,
        phoneNumber: phoneNumber,
    };

    // Make a POST request to your server
    fetch('/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    })
        .then(response => {
            if (response.ok) {
                // Payment data sent successfully
                return response.json();
            } else {
                // Handle server error
                throw new Error('Failed to send payment data to server.');
            }
        })
        .then(data => {
            if (data.success) {
                // Server processed the payment data successfully
                console.log('Payment data sent to server:', data.message);
            } else {
                // Server encountered an error processing the data
                console.error('Server error:', data.message);
            }
        })
        .catch(error => {
            // Handle any network or server errors
            console.error('Error sending payment data:', error);
        });
}