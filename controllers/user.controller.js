const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

class UserController {
  async getUser(req, res, user) {
    const candidate = await User.findOne({email: user.email});
    if (candidate) {
      res.status(200).json({
        success: true,
        user: {
          username: candidate.username,
          email: candidate.email,
          isAdmin: candidate.isAdmin
        }}
        )
    } else {
      res.status(401).json({
        success: false,
        message: 'Login and password do not match.'
      })
    }
  }

  async login(req, res) {
    const candidate = await User.findOne({email: req.body.credentials.email});
    if (candidate) {
      const isValidPassword = bcrypt.compareSync(req.body.credentials.password, candidate.password)
      if (isValidPassword) {
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, keys.jwt, {expiresIn: '1h'})
        res.status(200).json({
          success: true,
          user: {
            username: candidate.username,
            email: candidate.email,
            isAdmin: candidate.isAdmin
          },
          token: `Bearer ${token}`
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
    const candidate = await User.findOne({email: req.body.credentials.email});
    if (candidate) {
      const response = {
        success: false,
        message: 'This user already exists.'
      }
      res.status(409).send(JSON.stringify(response))
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password = req.body.credentials.password;
      const newUser = await new User({
        email: req.body.credentials.email,
        username: req.body.credentials.username,
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







