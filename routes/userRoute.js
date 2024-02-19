const express = require('express')
const auth = require('../controllers/auth')

const userRouter = express.Router()

userRouter.route('/login').post(auth.signIn)
userRouter.post('/signup', auth.signUp)

module.exports = userRouter
