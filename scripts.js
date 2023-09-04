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
