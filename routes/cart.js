const router = require('express').Router();
const cartController = require('../Controller/cartController');
const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/',verifyToken, cartController.addProductToCart);
router.post('/decreament',verifyToken, cartController.decreamentProductQTY);
router.delete("/:id",verifyToken, cartController.removeCartItems);
router.get('/',verifyToken, cartController.getCart);
router.get('/count',verifyToken, cartController.getCartCount);
router.post('/increament',verifyToken, cartController.incrementProductQty);

module.exports = router;
