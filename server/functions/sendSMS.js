const twilio = require('twilio');
const dotenv = require('dotenv').config();

// Twilio Credentials (Replace with your actual credentials)
const accountSid = process.env.YOUR_TWILIO_ACCOUNT_SID;
const authToken = process.env.YOUR_TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.YOUR_TWILIO_PHONE_NUMBER;

// Initialize Twilio client
const client = new twilio(accountSid, authToken);

// Function to send an SMS
exports.sendSMS = async function sendSMS(selectedAmount, selectedDataValue, selectedNetwork, phoneNumber) {
  try {
    // Construct your SMS message based on the input parameters
    const message = `Amount: ${selectedAmount}, Data Value: ${selectedDataValue}, Network: ${selectedNetwork} Number: ${phoneNumber}`;

    // Send an SMS using Twilio
    const sentMessage = await client.messages.create({
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
}