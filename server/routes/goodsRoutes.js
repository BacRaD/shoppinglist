const express = require('express')
const router = express.Router()
const { getGoods, postGood, putGood, deleteGood} = require('../controllers/goodsController')

const { protect } = require('../middleware/authMiddleware')
 
router.route('/').get(protect, getGoods).post(protect, postGood) 
router.route('/:id').put(protect, putGood).delete(protect, deleteGood)

module.exports = router