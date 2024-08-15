const router = require('express').Router();
const StoreController = require('../Controller/storeController');
const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');

router.post('/', verifyTokenAndAuthorization, StoreController.addStore);
router.get('/byId/:id', StoreController.getStorebyId);
router.get('/:type/:code', StoreController.getNearbyStore);
router.get('/all/:type/:code', StoreController.getallNearbyStore);

module.exports = router;