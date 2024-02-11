const express = require('express')
const users = require('../controllers/userController')
const auth = require('../controllers/auth')

const userRouter = express.Router()

userRouter.route('/login').get(users.signIndex)
userRouter.route('/register').get(users.signUpIndex)
userRouter.post('/signup', auth.signUp)

module.exports = userRouter
