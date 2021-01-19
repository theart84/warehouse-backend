const express = require('express');
const ProductController = require('../controllers/product.controller')
const router = express.Router();
const passport = require('passport')

router.get('/product', passport.authenticate('jwt', {session: false}), ProductController.getProducts);
router.get('/product/:id', passport.authenticate('jwt', {session: false}), ProductController.getProduct);
router.post('/product', passport.authenticate('jwt', {session: false}), ProductController.createProduct);
router.patch('/product/:id', passport.authenticate('jwt', {session: false}), ProductController.editProduct);
router.delete('/product/:id', passport.authenticate('jwt', {session: false}), ProductController.deleteProduct);


module.exports = router;