const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const routes = require('./routes/router');
app.set('view engine', 'ejs');
app.set('views', 'server');
app.use(express.static('public'));
app.use('/',routes);

const twilio = require('twilio');
const dotenv = require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }));

// Twilio Credentials
const accountSid = process.env.YOUR_TWILIO_ACCOUNT_SID;
const authToken = process.env.YOUR_TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.YOUR_TWILIO_PHONE_NUMBER;

// Initialize Twilio client
const client = new twilio(accountSid, authToken);

// Routes
const router = require('./routes/router');
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
