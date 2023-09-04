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
