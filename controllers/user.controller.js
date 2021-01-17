const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

class UserController {
  async login(req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
      const isValidPassword = bcrypt.compareSync(req.body.password, candidate.password)
      if (isValidPassword) {
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, process.env.JWT, {expiresIn: '1h'})
        res.status(200).json({
          success: true,
          token,
        })
      } else {
        res.status(401).json({
          success: false,
          message: 'Login and password do not match.'
        })
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'User with this email was not found.'
      })
    }

  }

  async register(req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
      const response = {
        success: false,
        message: 'This user already exists.'
      }
      res.status(409).send(JSON.stringify(response))
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password = req.body.password;
      const newUser = await new User({
        email: req.body.email,
        password: bcrypt.hashSync(password, salt)
      });
      const response = {
        success: true,
        message: 'User was created successfully!'
      }
      try {
        await newUser.save();
        res.status(201).send(JSON.stringify(response))
      } catch (err) {
        res.status(500).json({
          success: false,
          message: 'Internal error'
        });
      }
    }
  }
}

module.exports = new UserController();







