const User = require('../model/User');
const generateOTP = require('../utils/otp_generator');
const sendSMS = require('../utils/smtp_function');

module.exports = {
    loginUser: async (req, res) => {
        try {

                otp = generateOTP();
                sendSMS(req.body.phone, otp);
            

            // Send OTP via SMS
           

            res.status(200).json({ message: 'OTP sent successfully' });
            
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },  
};
