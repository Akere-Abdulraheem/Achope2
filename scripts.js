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
