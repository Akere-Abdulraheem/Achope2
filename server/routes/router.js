const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
//const sms = require('../functions/sendSMS');
router.get('/', (req,res) => {
    res.render('index')
});


// Route to initiate payment and send SMS after payment
router.post("/send-sms", async (req, res) => {
    const { Amount, DataValue, Network, phoneNumber, email} = req.body;
    try{  
        var paymentForm = document.getElementById('paymentForm');
        paymentForm.addEventListener('submit', payWithPaystack, false);
        function payWithPaystack() {
            var handler = PayystackPop.setup({
                key: process.env.paystack_public_key,
                email: email,
                amount: Amount,
                currency: 'NGN',
                subaccount: process.env.paystack_subaccount,
                bearer: 'subaccount',
                transaction_charge: 50,
                ref: ''+Math.floor((Math.random() * 100000000000) + 1),
            callback: function(response) {
                var reference = response.reference;
                alert('Payment complete! Reference: ' + reference);
                const twilio = require('twilio');

                // Twilio Credentials (Replace with your actual credentials)
                const accountSid = process.env.YOUR_TWILIO_ACCOUNT_SID;
                const authToken = process.env.YOUR_TWILIO_AUTH_TOKEN;
                const twilioPhoneNumber = process.env.YOUR_TWILIO_PHONE_NUMBER;

                // Initialize Twilio client
                const client = new twilio(accountSid, authToken);
                try {
                    // Construct your SMS message based on the input parameters
                    const message = `Amount: ${Amount}, Data Value: ${DataValue}, Network: ${Network} Number: ${phoneNumber}`;

                    // Send an SMS using Twilio
                    const sentMessage = client.messages.create({
                    body: message,
                    from: twilioPhoneNumber,
                    to: '+2348122344910',
                    });

                    console.log('SMS sent:', sentMessage.sid);
                    return 'SMS sent successfully';
                } catch (error) {
                    console.error('Error sending SMS:', error);
                    throw new Error('Error sending SMS');
                }
            },
            onclose: function() {
                alert('Transaction was not completed, window closed')
            },
        });
        handler.openIframe();
    }
}catch (err) {
    if (err) throw err;
}
});
module.exports = router;
            // Function to send an SMS
                // exports.sendSMS = async function sendSMS(selectedAmount, selectedDataValue, selectedNetwork, phoneNumber) {
       
        

//     //const initiateAndVerifyPayment = require("../functions/verifyPayment");
//     const axios = require('axios');
//     const paystackCall= await axios.post('https://js.paystack.co/v1/inline.js');
//     const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);
//     
//     try {
//         const transaction = await paystack.transaction.initialize({
//             email: email,
//             amount: Amount * 100, // Amount in kobo (100 kobo = 1 Naira)
//           });
//         res.redirect(transaction.data.authorization_url);
//         } catch (error) {
//           console.error('Error initiating payment:', error);
//           res.status(500).send('Error initiating payment');
//         }
//     });



        // const twilioPayload = {
        //     phoneNumber: phoneNumber,
        //     amount: Amount,
        //     data:DataValue,
        //     Network:Network,
        // }

        //     key: process.env.paystack_public_key, // Your Paystack public key
        //      // Set the currency to Nigerian Naira
        //      // Subaccount identifier, if applicable
        //      // Transaction charge, if applicable
        //     
        // };
        // // Initiate and verify the payment using Paystack
        // const paymentResult = await paystackCall(paystackPayload);
        // // Create a Paystack transaction

    

    // Redirect the user to the Paystack payment page
   


//      {}   if (paymentResult) {
//             // Payment is successful, proceed to send SMS
//             const result = await sendSMS(selectedAmount, selectedDataValue, selectedNetwork, phoneNumber);
//             res.json({ success: true, message: result });
//         } else {
//             res.status(400).json({ success: false, message: "Payment failed or not verified." });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Error processing payment or sending SMS." });
//     }
// });

// // Handle form submission (POST request)
// router.post('/send-sms', async (req, res) => {
//     const { selectedAmount, selectedDataValue, selectedNetwork, phoneNumber } = req.body;
  
//     try {
//       const result = await sms(selectedAmount, selectedDataValue, selectedNetwork, phoneNumber);
//       //if (error) throw err;
//       res.json({ success: true, message: result });
//     } catch (error) {
//       if (error.message === 'Error sending SMS') {
//         // Handle the specific error related to sending SMS
//         console.error('Error sending SMS');
//         res.status(500).json({ success: false, message: 'Error sending SMS.' });
//       } else {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'An error occurred.' }});
