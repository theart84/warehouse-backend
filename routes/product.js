const express = require('express');
const ProductController = require('../controllers/product.controller')
const router = express.Router();

router.get('/product', ProductController.getProducts);
router.get('/product/:id', ProductController.getProduct);
router.post('/product', ProductController.createProduct);
router.patch('/product/:id', ProductController.editProduct);
router.delete('/product/:id', ProductController.deleteProduct);


module.exports = router;