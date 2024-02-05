const express = require('express')
const user = require('../controllers/userController')

const userRouter = express.Router()

userRouter.route('/login').get(user.signIndex).post(user.signIn)

userRouter.route('/register').post(user.signUp)

module.exports = userRouter
