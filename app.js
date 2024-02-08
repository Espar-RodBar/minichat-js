const express = require('express')

const ejs = require('ejs')
const db = require('./mongoDb')
const cors = require('cors')

// conection to DB
// const users = db.collection('user')
// const messageBoard = db.collection('messages')

const app = express()

// Middleware
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// routers
const usersRoute = require('./routes/userRoute')
app.use('/', usersRoute)
const messageRoute = require('./routes/messageRoute')
app.use('/messages', messageRoute)

app.get('/', (req, res) => {
  res.status(200).render('index.ejs')
})

app.put('/addOneLike', (req, res) => {
  const messageId = Number(req.body['id'])

  messageBoard
    .findOne({ id: messageId })
    .then((msg) => {
      return msg.likes
    })
    .then((like) => {
      messageBoard
        .findOneAndUpdate({ id: messageId }, { $set: { likes: like + 1 } })
        .then((result) => {
          res.status(200).json('+1 like')
        })
    })
    .catch((err) => res.status(500).json(err))
})

// TODO: Add edit msg function

// end TODO

app.delete('/deleteMsg', (req, res) => {
  const messageId = Number(req.body['id'])

  console.log('Deleting...' + messageId)

  messageBoard.findOneAndDelete({ id: messageId })

  res.status(200).json('Message deleted')
})

// let messageBoard = [];
// user format
// const user = {
//     id: "0",
//     name: "Espar",
//     pin: "0000",
// };

// message format
// const message = {
//     _id: "0",
//     userId: "0",
//     userName: "Espar",
//     text: "ola k ase?",
//     likes: 0,
// };

module.exports = app
