const express = require('express')

const messageRouter = express.Router()

messageRouter.route('/').get(async (req, res) => {
  messageBoard
    .find()
    .toArray()
    .then((messages) => {
      res.render('index.ejs', { messages })
    })
    .catch((error) => console.log(error))
})

messageRouter.route('/addMsg').post((req, res) => {
  const msg = {
    id: newId,
    userId: '0',
    userName: req.body.userName,
    text: req.body.message,
    likes: 0,
  }
  messageBoard.insertOne(msg).then((result) => console.log(result))

  res.redirect('/')
})
