const express = require('express')
const users = require('../controllers/userController')

const userRouter = express.Router()

userRouter.route('/login').get(users.signIndex).post(users.signIn)

userRouter.route('/register').get(users.signUpIndex).post(users.signUp)

module.exports = userRouter
