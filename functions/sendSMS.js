// const express = require('express');        // Import the Express.js framework.
// const bodyParser = require('body-parser');  // Middleware for parsing JSON data.
// const cors = require('cors');              // Middleware for handling Cross-Origin Resource Sharing (CORS).
// const app = express();                     // Create an Express application.
// app.use(cors());                           // Enable CORS for the app.
// app.use(bodyParser.json());                // Parse JSON data in request bodies.

// Set up Twilio credentials from environment variables.
const accountSid = process.env.TWILIO_ACCOUNT_SID;    // Your Twilio Account SID.
const authToken = process.env.TWILIO_AUTH_TOKEN;      // Your Twilio Auth Token.
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number.
const twilioRecipientPhoneNumber = process.env.TWILIO_RECIPIENT_PHONE_NUMBER; // Your Twilio phone number.
const twilio = require('twilio')(accountSid, authToken); // Twilio SDK for sending SMS messages. // Create a Twilio client instance.

// Define a route for handling SMS sending.
app.post('/send-sms', (req, res) => {
    const { message } = req.body; // Extract phone number and message from the request body.

    // Use the Twilio client to send an SMS message.
    client.messages.create({
        body: message,                  // Message content.
        to: twilioRecipientPhoneNumber, // Recipient's phone number.
        from: twilioPhoneNumber,       // Your Twilio phone number.
    })
    .then(message => {
        res.json({ message: `SMS sent: ${message.sid}` }); // Respond with success message.
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Error sending SMS' }); // Handle errors and respond with an error message.
    });
});
