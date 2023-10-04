const express = require('express');
const router = express.Router();
const sms = require('../functions/sendSMS');

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

module.exports =router;