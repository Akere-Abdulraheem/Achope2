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
    const networkSelect = document.getElementById("network");
    const amountSelect = document.getElementById("amount");
    const dataValueDisplay = document.getElementById("dataValueDisplay");
    const overlay = document.getElementById("overlay");
    const phoneNumberInput = document.getElementById("phoneNumber");
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
    // Update the data value display
    updateDataValueDisplay();
});

const submitOrderButton = document.getElementById("submitOrder");
submitOrderButton.addEventListener("click", () => {
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
    popupContainer.style.display = "block";
})

const confirmButton = document.getElementById("payButton");
function confirmButton() {
    const selectedNetwork = networkSelect.value;
    const selectedAmount = amountSelect.value;
    const selectedDataValue = dataValues[selectedNetwork][selectedAmount];
    const phoneNumber = phoneNumberInput.value;
    const email = document.getElementById('email-address').value;
    // Create object for paystack and twilio
    const paymentData = {
        Network: selectedNetwork,
        DataValue:selectedDataValue,
        Amount: selectedAmount,
        phoneNumber: phoneNumber,
        email: email,
    };

    // object sent to route /send-sms
    fetch('/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    }).then(response => {
        if (response.ok) {
                return response.json();
            } else {
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

closeButton.addEventListener("click", () => {
    popupContainer.style.display = "none";
  });
