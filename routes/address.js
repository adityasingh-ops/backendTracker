const router = require('express').Router();
const addressController = require('../Controller/addressController');
const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');

router.post('/', verifyTokenAndAuthorization, addressController.addAddress);
router.get('/all', verifyTokenAndAuthorization, addressController.getAddress);
router.delete('/:id', verifyTokenAndAuthorization, addressController.deleteAddress);
router.get('/default',verifyTokenAndAuthorization, addressController.getDefaultAddress);
router.patch('/default/:id',verifyTokenAndAuthorization, addressController.setAddressDefault);

module.exports = router;
