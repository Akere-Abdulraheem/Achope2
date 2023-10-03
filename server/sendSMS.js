const twilio = require('twilio')

exports.handler = async (event) => {
  try {
    // Import the data
    const dataToSend = JSON.parse(event.body);

      // Access the data
    const { network, amount, dataValue, phoneNumber, paymentReference} = dataToSend

    const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);

    // Set up Twilio credentials from environment variables.
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number.
const twilioRecipientPhoneNumber = process.env.TWILIO_RECIPIENT_PHONE_NUMBER; // Your Twilio phone number.

await twilioClient.messages.create({
        body: `Network: ${network}, amount:${amount}, data:${dataValue}, phone Number:${phoneNumber} `,// Message content.
        to: twilioRecipientPhoneNumber, // Recipient's phone number.
        from: twilioPhoneNumber,       // Your Twilio phone number.
    });
    
    return {
        statusCode: 200,
        body: JSON.string({ message: `SMS sent: ${message.sid}` }); // Respond with success message.
    };
}
  .catch(error => {
        console.error(error);

        return {
        statusCode: 200,
        body: JSON.string({ message: `SMS sent: ${message.sid}` }); // Respond with success message.
    };
}
         };
