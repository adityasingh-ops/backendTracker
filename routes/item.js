const router = require('express').Router();
const ItemController = require('../controller/itemController');
const {verifyStore} = require('../middleware/verifyToken');

router.post('/', ItemController.addItem);
router.get('/byId/:id', ItemController.getItembyId);
router.get('/byStore/:id', ItemController.getitembystore);
router.get('/byCategory/:category/:code', ItemController.getitembycategoryandcode);
router.get('/search/:search', ItemController.searchitems);
router.get('/code/:code', ItemController.getItembycode);
router.post('/photo', ItemController.photoUpload);

module.exports = router;