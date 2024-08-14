const router = require('express').Router();
const orderController = require('../controller/orderController');
const { verifyToken} = require('../middleware/verifyToken');

router.post('/', verifyToken, orderController.placeOrder);
router.get('/', verifyToken, orderController.getUserOrder);

module.exports = router;
