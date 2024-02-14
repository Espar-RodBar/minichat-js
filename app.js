const express = require('express')

const loger = require('morgan')
const ejs = require('ejs')
const db = require('./mongoDb')
const cors = require('cors')

const usersRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute')

const app = express()

// Middleware
app.use(cors())
app.use(loger('dev'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// routers
app.use('/api/user', usersRoute)
app.use('/api/messages', messageRoute)

// views
app.get('/', (req, res) => {
  res.status(200).render('index.ejs')
})
app.get('/login', (req, res) => {
  res.status(200).render('login.ejs')
})
app.get('/create_account', (req, res) => {
  res.status(200).render('register.ejs')
})
app.get('/chat_room', (req, res) => {
  res.status(200).render('chatRoom.ejs')
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
