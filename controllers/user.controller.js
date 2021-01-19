const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

class UserController {
  async getUser(req, res) {
    const candidate = await User.findOne({email: req.user.email});
    if (candidate) {
      console.log(req.user)
      res.status(200).json({
        "_id": "600695712d0f781200023ede",
        "email": "demo@demo",
        "username": "Art",
        "create_At": "2021-01-19T08:16:49.191Z",
        "isAdmin": true,
      })
    } else {
      res.status(401).json({
        success: false,
        message: 'Login and password do not match.'
      })
    }
  }
  

  async login(req, res) {
    console.log(req.body)
    const candidate = await User.findOne({email: req.body.credentials.email});
    if (candidate) {
      const isValidPassword = bcrypt.compareSync(req.body.credentials.password, candidate.password)
      if (isValidPassword) {
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, process.env.JWT, {expiresIn: '1h'})
        res.status(200).json({
          success: true,
          user: {
            username: candidate.username,
            email: candidate.email,
            isAdmin: candidate.isAdmin ? true : false
          },
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
    console.log(req.body)
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
        username: req.body.username,
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
        console.log(err)
        res.status(500).json({
          success: false,
          message: 'Internal error'
        });
      }
    }
  }
}

module.exports = new UserController();







