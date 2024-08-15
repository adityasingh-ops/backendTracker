const router = require('express').Router();
const ratingController = require('../Controller/ratingController');
const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');

router.post('/addRating',verifyTokenAndAuthorization, ratingController.addRating);
router.get('/checkUserRating',verifyTokenAndAuthorization, ratingController.checkUserRating);

module.exports = router;