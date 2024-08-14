const router = require('express').Router();
const CategoryController = require('../controller/categoryController');
const {verifyAdmin} = require('../middleware/verifyToken');

router.post('/',verifyAdmin, CategoryController.createCategory);
router.get('/', CategoryController.getallCategory);
router.get('/random', CategoryController.getRandomCategory);

module.exports = router;