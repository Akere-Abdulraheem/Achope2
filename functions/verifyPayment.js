const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // Parse the POST data from the request body
    const { network, amount, reference } = JSON.parse(event.body);

    // Make an API call to Paystack's verify_transaction endpoint
    const paystackResponse = await axios.post('https://api.paystack.com/transaction/verify/' + reference, null, {
      headers: {
        Authorization: process.env.PAYSTACK_API_KEY_SECRET
       // Authorization: 'sk_test_a96696227c7015313116af942a8616f34b540c1f', // Replace with your Paystack secret key
      },
    });

    // Check if the payment is successful in the response
    if (paystackResponse.data.status === true) {
      // Payment was successful
      // You can perform additional actions here, such as updating your database
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Payment verification successful' }),
      };
    } else {
      // Payment failed
      // Handle the error scenario
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Payment verification failed' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Payment verification failed' }),
    };
  }
};
