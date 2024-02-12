const express = require('express')
const users = require('../controllers/userController')
const auth = require('../controllers/auth')

const userRouter = express.Router()

userRouter.route('/register').get(users.signUpIndex)
userRouter.route('/login').get(users.signIn).post(auth.signIn)
userRouter.post('/signup', auth.signUp)

module.exports = userRouter
