const express = require('express');
const ProductController = require('../controllers/product.controller')
const router = express.Router();
const passport = require('passport')

router.get('/product', function (req, res, next) {
    passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({success: false, message: 'Token has been expired'})
      }
      ProductController.getProducts(req, res, user)
    })(req, res, next);
  });

router.get('/product/:id', function (req, res, next) {
    passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({success: false, message: 'Token has been expired'})
      }
      ProductController.getProduct(req, res, user)
    })(req, res, next);
  });

router.post('/product', function (req, res, next) {
    passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({success: false, message: 'Token has been expired'})
      }
      ProductController.createProduct(req, res, user)
    })(req, res, next);
  });

router.patch('/product/:id', function (req, res, next) {
    passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({success: false, message: 'Token has been expired'})
      }
      ProductController.editProduct(req, res, user)
    })(req, res, next);
  });

router.delete('/product/:id', function (req, res, next) {
    passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({success: false, message: 'Token has been expired'})
      }
      ProductController.delete(req, res, user)
    })(req, res, next);
  });


module.exports = router;