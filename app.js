const express = require('express')

const loger = require('morgan')
const ejs = require('ejs')
const db = require('./mongoDb')
const cors = require('cors')
const cookies = require('cookie-parser')

const usersRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute')
const viewRoute = require('./routes/viewRoute')

const app = express()

// Middleware
app.use(cors())
app.use(cookies())
app.use(loger('dev'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// routers
app.use('/api/user', usersRoute)
app.use('/api/messages', messageRoute)
app.use('/', viewRoute)

// views
// app.get('/', (req, res) => {

// })
// app.get('/login', (req, res) => {
//   res.status(200).render('login.ejs')
// })
// app.get('/create_account', (req, res) => {
//   res.status(200).render('register.ejs')
// })
// app.get('/chatroom', (req, res) => {
//   console.log(res.locals)
//   res.status(200).render('chatRoom.ejs')
// })

module.exports = app
