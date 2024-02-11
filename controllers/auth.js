const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res
      .status(201)
      .json({ status: 'success', data: { user: newUser, token: token } })
  } catch (err) {
    console.log('error on signup:', err)
  }
}

exports.signIn = async (req, res) => {
  try {
    const user = await Users.findOne(req.body)
    if (user) res.status(200).json({ status: 'success', data: { user } })
    else res.status(204).json({ status: 'success', data: { user } })
  } catch (err) {
    console.log('login error: ', err)
  }
}
