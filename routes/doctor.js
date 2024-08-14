const router = require('express').Router();
const DoctorController = require('../controller/doctor controller');
const {verifyAdmin} = require('../middleware/verifyToken');


router.post('/', DoctorController.addDoctor);
router.get('/', DoctorController.getalldoctors);
router.get('/:name', DoctorController.findbyName);
router.get('/id/:id', DoctorController.findbyid);

module.exports = router;