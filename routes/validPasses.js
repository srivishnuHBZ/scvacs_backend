const express = require('express')
const router = express.Router();
const { createPass, getAllPasses, getPass, updatePass, deletePass } = require('../controller/validpasses')
router.route('/').get(getAllPasses).post(createPass)
router.route('/:id').get(getPass).put(updatePass).delete(deletePass)
module.exports = router;