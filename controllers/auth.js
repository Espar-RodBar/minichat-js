const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.signUp = async (req, res) => {
  console.log(req)
  try {
    const userName = req.body.userName.trim()
    const password = req.body.password
    if (!userName) {
      res.status(401).json({ status: 'fail', message: 'Provide username' })
    } else if (await User.findOne({ userName })) {
      return res
        .status(400)
        .json({ status: 'fail', message: `<${userName}> user exist` })
    }

    const user = await User.create({ userName, password })
    const token = `${signToken(user._id)}`

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    })
    return res.status(201).json({ status: 'success', token, data: { user } })
  } catch (err) {
    console.log('signup error:', err)
  }
}

exports.signIn = async (req, res) => {
  try {
    const userName = req.body.userName.trim()
    const password = req.body.password
    console.log(userName)
    // 1.- check if there is a name
    if (!userName) {
      // provide username error 400
      console.log('no user name')
      return res
        .status(400)
        .json({ status: 'fail', message: 'no username provided.' })
    }
    // 2.- Check user name and password/hash
    const user = await User.findOne({ userName })

    if (!user || !user.correctPassword(password)) {
      // User or password incorrect, error 401
      console.log('user incorrect')
      return res
        .status(401)
        .json({ status: 'fail', message: 'user o pass incorrect.' })
    }

    // 3.- send token
    const token = `${signToken(user._id)}`

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    })

    return res.status(200).json({ status: 'success', token })
  } catch (err) {
    console.log('login error: ', err)
  }
}

exports.protect = async (req, res, next) => {
  error = { message: '' }
  const cookie = req.cookies.jwt
  // 1.- Get token and if exist
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWidth('Bearer')
  ) {
    token = req.headers.authorization.split('Bearer ')[1]
  } else if (cookie) {
    token = cookie
  }

  console.log(token)
  if (token == (undefined || null)) {
    // User or password incorrect, error 401
    error.message = 'user not loged.'
    res.status(401).json({ status: 'fail', message: 'user  not loged.' })
  }

  // 2.- Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  console.log('result protect validation:', decoded)

  // 3.- Check if user exist
  const tokenUser = await User.findById(decoded.id)
  if (!tokenUser) {
    error.message = 'user token not valid.'
    res.status(401).json({ status: 'fail', message: 'user token not valid.' })
  }

  console.log('on protect', token)
  req.user = tokenUser
  next()
}
