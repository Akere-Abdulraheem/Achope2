const axios = require('axios');

exports.initiateAndVerifyPayment = async (event, context) => {
  try {
    const { email, amount, reference } = JSON.parse(event.body);
    // Make an API call to Paystack's verify_transaction endpoint
    const paystackResponse = await axios.post('https://api.paystack.com/transaction/verify/' + reference,{
    amount, email
    },{
      headers: {
        Authorization: process.env.PAYSTACK_API_KEY_SECRET
      },
    });
    // Check if the payment is successful in the response
    if (paystackResponse.data.status === true) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Payment verification successful' }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: 'Payment verification failed' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Payment verification failed' }),
    };
  }
};
