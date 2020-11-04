const express = require('express');
const router = express.Router();
const productContoller = require('../controllers/product.contoller');

router.get('/', productContoller.get);
router.post('/', productContoller.post);
router.patch('/:productId', productContoller.patch);

module.exports = router;