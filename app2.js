const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Twilio Credentials
const accountSid = process.env.YOUR_TWILIO_ACCOUNT_SID;
const authToken = process.env.YOUR_TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Serve an HTML page with a form for user input
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/send-sms', (req, res) => {
  const message = req.body.message;
  const recipientPhoneNumber = req.body.recipient; 

  // Send an SMS using Twilio
  client.messages
    .create({
      body: message,
      from: process.env.YOUR_TWILIO_PHONE_NUMBER,
      to: recipientPhoneNumber,
    })
    .then(() => {
      res.send('SMS sent successfully!');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending SMS.');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
