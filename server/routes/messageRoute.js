const express = require('express')
const messageController = require('../controllers/messageController')
const auth = require('../controllers/auth')

const messageRouter = express.Router()

messageRouter.route('/').get(messageController.getMessages)

// Use this route if ejs is used
// messageRouter.route('/').get(auth.protect, messageController.getMessages)

module.exports = messageRouter
