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
// an event listener for the "amount" select
amountSelect.addEventListener("change", function () {
    // Updates the data value display when the "amount" selection changes
    updateDataValueDisplay();
});

//979217

submitOrderButton.addEventListener("click", () => {

    // const messageData ={
        const selectedNetwork = networkSelect.value;
        const selectedAmount = amountSelect.value;
        const selectedDataValue = dataValues[selectedNetwork][selectedAmount];
        const phoneNumber = phoneNumberInput.value;

    // }
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

// Make an AJAX POST request to your Node.js server
fetch("/send-sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({selectedAmount, selectedDataValue, selectedNetwork,phoneNumber}),
  })
    .then((response) => response.json())
    .then( () => {
      console.log('Sucess'); // You can handle the response from the server here
    })
    .catch((error) => {
      console.error(error);
    });
});

function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById("errorMessage");
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
    setTimeout(function () {
        errorMessageElement.style.display = "none";
    }, 1000);
}     