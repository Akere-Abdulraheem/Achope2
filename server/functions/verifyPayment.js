const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { network, amount, reference } = JSON.parse(event.body);
    // Make an API call to Paystack's verify_transaction endpoint
    const paystackResponse = await axios.post('https://api.paystack.com/transaction/verify/' + reference, null, {
      headers: {
        Authorization: process.env.PAYSTACK_API_KEY_SECRET
      },
    });
    // Check if the payment is successful in the response
    if (paystackResponse.data.status === true) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Payment verification successful' }),
      };
    } else {
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
