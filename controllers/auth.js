const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.signUp = async (req, res) => {
  try {
    const { userName, password } = req.body
    if (!userName.trim())
      res.status(400).json({ status: 'fail', message: 'Provide username' })

    const newUser = await User.create({ userName, password })
    const token = signToken(newUser._id)

    res
      .status(201)
      .json({ status: 'success', data: { user: newUser, token: token } })
  } catch (err) {
    console.log('error on signup:', err)
  }
}

exports.signIn = async (req, res) => {
  try {
    const { userName, password } = req.body

    // 1.- check if there is a name
    if (!userName) {
      // provide username error 400
      res.status(400).json({ status: 'fail', message: 'no username provided.' })
    }
    // 2.- Check user name and password/hash
    const user = await User.findOne({ userName })

    if (!user || !user.correctPassword(password)) {
      // User or password incorrect, error 401
      console.log('user o password incorrect')
      res
        .status(401)
        .json({ status: 'fail', message: 'user o pass incorrect.' })
    }

    // 3.- send token
    const token = signToken(user._id)
    res.status(200).json({ status: 'success', token })
  } catch (err) {
    console.log('login error: ', err)
  }
}

exports.protect = async (req, res, next) => {
  console.log('on protect')
  next()
}
