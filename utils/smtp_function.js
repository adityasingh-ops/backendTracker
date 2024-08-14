const e = require('express');
const twilio = require('twilio');


async function sendSMS(userPhone, otp) {
    console.log(userPhone, otp);
    const accountSid =  process.env.YOUR_TWILIO_ACCOUNT_SID;
    const authToken = process.env.YOUR_TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.YOUR_TWILIO_PHONE_NUMBER;

    const client = twilio(accountSid, authToken);

    try {
        await client.messages.create({
            body: `Your ShopEase verification code is: ${otp}`,
            from: twilioPhoneNumber,
            to: userPhone
        });
        console.log('SMS sent');
    } catch (error) {
        console.log('Error sending SMS:', error);
    }
}

module.exports = sendSMS;
