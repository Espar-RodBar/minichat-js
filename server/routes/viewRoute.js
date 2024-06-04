const express = require('express')
const auth = require('../controllers/auth')
const viewController = require('../controllers/viewController')

const viewRouter = express.Router()

viewRouter.use(auth.isLoggedIn)

viewRouter.get('/', viewController.getIndex)
viewRouter.get('/login', viewController.getLogin)
viewRouter.get('/create_account', viewController.getSignup)
viewRouter.get('/chatroom', auth.protect, viewController.getChatroom)

module.exports = viewRouter
