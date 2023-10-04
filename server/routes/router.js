const express = require('express');
const router = express.Router();
const sms = require('../functions/sendSMS');
const initiateAndVerifyPayment = require("../functions/verifyPayment");

router.get('/', (req,res) => {
    res.render('index')
});

// Handle form submission (POST request)
router.post('/send-sms', async (req, res) => {
    const { selectedAmount, selectedDataValue, selectedNetwork, phoneNumber } = req.body;
  
    try {
      const result = await sms(selectedAmount, selectedDataValue, selectedNetwork, phoneNumber);
      //if (error) throw err;
      res.json({ success: true, message: result });
    } catch (error) {
      if (error.message === 'Error sending SMS') {
        // Handle the specific error related to sending SMS
        console.error('Error sending SMS');
        res.status(500).json({ success: false, message: 'Error sending SMS.' });
      } else {
      console.error(error);
      res.status(500).json({ success: false, message: 'An error occurred.' });
    }
  }
  });

// Route to initiate payment and send SMS after payment
router.post("/send-sms-after-payment", async (req, res) => {
    const { selectedAmount, selectedDataValue, selectedNetwork, phoneNumber, email } = req.body;

    try {
        // Define the order data (you should structure this data according to your requirements)
        const orderData = {
            amount: selectedAmount,
            dataValue: selectedDataValue,
            network: selectedNetwork,
            phoneNumber: phoneNumber,
            email: email,
        };

        // Initiate and verify the payment using Paystack
        const paymentResult = await initiateAndVerifyPayment(orderData);

        if (paymentResult) {
            // Payment is successful, proceed to send SMS
            const result = await sendSMS(selectedAmount, selectedDataValue, selectedNetwork, phoneNumber);
            res.json({ success: true, message: result });
        } else {
            res.status(400).json({ success: false, message: "Payment failed or not verified." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error processing payment or sending SMS." });
    }
});

module.exports = router;
