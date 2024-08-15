const router = require('express').Router();
const userController = require('../Controller/userController');
const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');
const express = require('express');

router.post('/sendotp', userController.sendOTP);
router.post('/verifyotp', userController.verifyOTP);

module.exports = router;


module.exports = router;