const express = require('express');
const AuthController = require('../controllers/user.controller');
const router = express.Router();
const passport = require('passport');

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.get('/auth/user', passport.authenticate('jwt', {session: false}),AuthController.getUser);

module.exports = router;