const express = require('express');
const AuthController = require('../controllers/user.controller');
const router = express.Router();
const passport = require('passport');

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.get('/auth/user', function (req, res, next) {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({success: false, message: 'Token has been expired'})
    }
    AuthController.getUser(req, res, user)
  })(req, res, next);
});

module.exports = router;