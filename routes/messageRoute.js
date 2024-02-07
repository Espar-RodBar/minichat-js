const express = require('express')
const messageController = require('../controllers/messageController')

const messageRouter = express.Router()

messageRouter
  .route('/')
  .get(messageController.getMessages)
  .post(messageController.sendMessage)

module.exports = messageRouter
