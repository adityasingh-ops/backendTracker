
const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

let otp = "";

exports.sendOTP = async (req, res) => {
    try {
        const { number } = req.body;        
        let digits = '0123456789';
        otp = '';
        
        for (let i = 0; i < 4; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        
        await client.messages.create({
            body: `Your ShopEase  OTP is ${otp}
            Do not share this OTP with anyone.`,
            from: twilioPhoneNumber,
            to: `+91${number}`
        });

        return res.status(200).send({ message: "OTP sent successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { otp: userOtp, number,username } = req.body;
        let existingUser = await User.findOne({ number});

        if (!existingUser) {
            // If user not found, create a new user
            existingUser = new User({ number,username });
            await existingUser.save();
        }

        if (userOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const accessToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

        otp = ""; // Reset OTP after successful verification

        return res.status(200).json({  accessToken, ...existingUser._doc});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};
