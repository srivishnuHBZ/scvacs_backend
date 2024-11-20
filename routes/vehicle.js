const express = require('express')
const router = express.Router();
const { getVehicles } = require('../controller/vehicle')
router.route('/').get(getVehicles)
module.exports = router;