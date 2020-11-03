const express = require('express');
const productContoller = require('../controllers/product');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/', productContoller.get);
router.post('/new', productContoller.post)

module.exports = router;