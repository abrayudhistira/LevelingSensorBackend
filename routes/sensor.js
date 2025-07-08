const express = require('express');
const router = express.Router();
const sensorCtrl = require('../controllers/sensorController');

router.post('/post', sensorCtrl.postSensor);
router.get('/get',  sensorCtrl.getSensor);

module.exports = router;