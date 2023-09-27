// All variables are declared here otherwise needed inside a function
    const networkSelect = document.getElementById("network");
    const amountSelect = document.getElementById("amount");
    const dataValueDisplay = document.getElementById("dataValueDisplay");
    const submitOrderButton = document.getElementById("submitOrder");
    const overlay = document.getElementById("overlay");
    const phoneNumberInput = document.getElementById("phoneNumber");

// All price data are now created here as array
    const priceList = {
        "9MOBILE": [250, 420, 580, 740, 1900],
        "AIRTEL": [300, 550, 950, 1200, 2250],
        "GLO": [300, 550, 800, 1200, 2250],
        "MTN": [300, 550, 800, 1400, 2500]
    };

// Correlating data values for selected network and amount
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

// Populate amount options based on selected network
networkSelect.addEventListener("change", function () {
    // This part runs when the user changes the value in the "networkSelect" dropdown.

    // Get the currently selected value from the "networkSelect" dropdown
    const selectedNetwork = networkSelect.value;

    // Look up a list of amounts associated with the selected network
    const amounts = priceList[selectedNetwork];

    // Clear the previous options in the "amountSelect" dropdown
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

    // Look up the data value associated with the selected network and amount
    //const selectedDataValue = dataValues[selectedNetwork][selectedAmount];

    // Update the content of the "dataValueDisplay" element with the selected data value
    //dataValueDisplay.textContent = selectedDataValue;
}

// an event listener for the "amount" select
amountSelect.addEventListener("change", function () {
    // Updates the data value display when the "amount" selection changes
    updateDataValueDisplay();
});


// Handles form submission and open payment popup
submitOrderButton.addEventListener("click", function () {
    // Get the selected network from the "networkSelect" dropdown
    const selectedNetwork = networkSelect.value;

    // Get the selected amount from the "amountSelect" dropdown
    const selectedAmount = amountSelect.value;

    // Get the selected data value associated with the selected network and amount
    const selectedDataValue = dataValues[selectedNetwork][selectedAmount];

    // Get the phone number entered by the user from the "phoneNumberInput" field
    const phoneNumber = phoneNumberInput.value;

    // Validate form fields
    if (selectedAmount === "" || phoneNumber === "") {
        // Display an error message if any required field is empty
        displayErrorMessage("Please fill out all required fields.");
        return;
    }

    // Validate phone number format
    function validatePhoneNumber(phoneNumber) {
        // Define a regular expression pattern for valid phone numbers (+234XXXXXXXXXX)
        const phonePattern = /^\+234\d{10}$/;
        
        // Test if the provided phone number matches the pattern
        return phonePattern.test(phoneNumber);
    }

    if (!validatePhoneNumber(phoneNumber)) {
        // Display an error message if the phone number format is not valid
        displayErrorMessage("Please enter a valid phone number in the format +234XXXXXXXXXX.");
        return;
    }

    // Display error message
    function displayErrorMessage(message) {
        // Get the element with the ID "errorMessage"
        const errorMessageElement = document.getElementById("errorMessage");
        
        // Set the text content of the error message element to the provided message
        errorMessageElement.textContent = message;

        // Display the error message element (make it visible)
        errorMessageElement.style.display = "block";

        // Use a timeout to hide the error message after 1 second (1000 milliseconds)
        setTimeout(function () {
            errorMessageElement.style.display = "none";
        }, 1000);
    }

    // If all validations pass, it calls the `openPopup` function
    openPopup(selectedNetwork, selectedAmount, selectedDataValue, phoneNumber);
});

// function openpopup
function openPopup(network, amount, dataValue, phoneNumber) {
    // This function takes four parameters: network, amount, dataValue, and phoneNumber.

    // Display an overlay to cover the entire page with a semi-transparent background
    overlay.style.display = "flex";

    // Find an HTML element with the class "popup" and store it in the variable "popupContent"
    const popupContent = document.querySelector(".popup");

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

    // Find an HTML element with the ID "closePopup" and store it in the variable "closePopupButton"
    const closePopupButton = document.getElementById("closePopup");

    // Add a click event listener to the "closePopupButton"
    closePopupButton.addEventListener("click", function () {
        // When the button is clicked, hide the overlay, effectively closing the popup
        overlay.style.display = "none";
    });

    // Initialize Paystack payment when Pay button is clicked
    const payButton = document.getElementById("payButton");
    const emailInput = document.getElementById("email-address");
    // Add a click event listener to the "Pay" button
    payButton.addEventListener("click", function () {
        // Initialize Paystack payment
        var handler = PaystackPop.setup({
            key:'pk_test_a36196e0e57da2985d547ff354cd420aee807f01', // Your Paystack public key
            email: emailInput.value, // Get the email from the input field
            amount: amount * 100, // Convert the amount to kobo (100 kobo = 1 Naira)
            currency: 'NGN', // Set the currency to Nigerian Naira
            subaccount:'ACCT_cd356rilazdkwy4', // Subaccount identifier, if applicable
            transaction_charge: 50, // Transaction charge, if applicable
            bearer: 'subaccount', // Payment bearer, if applicable
            callback: function (response) {
                // This function is called when the payment is successful
                var reference = response.reference;
                alert('Payment complete! Reference: ' + reference);

                // Make an AJAX call to your server to verify the transaction
                const verificationData = {
                    network: network,
                    amount: amount,
                    reference: reference
                };

                // Call a function to verify the transaction on your server
                verifyTransaction(verificationData);
               },
            },
            onClose: function () {
                // This function is called when the payment window is closed
                alert('Payment window closed.');
            }
        });

        // Open the Paystack payment iframe
        handler.openIframe();
    });
}

// Function to verify the transaction on your server
function verifyTransaction(verificationData) {
    // The function takes a parameter called verificationData, which is presumably an object containing information about the transaction.

    // Fetch data from a server-side endpoint (defined in the process.env.FUNCTION_ENDPOINT)
    fetch('/functions/verifyPayment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reference: reference }) // Send a JSON object with a 'reference' property
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        // After fetching data from the server, handle the response data

        if (data.success) {
            // If the server responds with a 'success' status
            const message = {
                Network: selectedNetwork,
                Amount: selectedAmount,
                dataValue: selectedDataValue,
                phoneNumber: phoneNumber,
                paymentReference: reference,
            }
                    // Send data to the server for SMS sending
                    fetch('/functions/sendSMS', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(message),
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
         alert('Transaction verified on server.'); // Display an alert message
        }
        else {
            alert('Transaction verification failed.'); // If the server responds with a failure status, display an error message
        }
    })
    .catch(error => {
        console.error('Error verifying transaction:', error); // Handle any errors that occur during the process
        alert('Error verifying transaction on server.');
    });
}
});
