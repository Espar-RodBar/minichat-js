const express = require('express')
const path = require('path')
const loger = require('morgan')
//const ejs = require('ejs')
const db = require('./mongoDb')
const cors = require('cors')
const cookies = require('cookie-parser')

const usersRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute')

const app = express()

// Middleware
app.use(cors())
// app.options('*', cors())
app.use(cookies())
app.use(loger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routers
app.use('/api/user', usersRoute)
app.use('/api/messages', messageRoute)
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})
// for the use of ejs templates.
//app.use('/', viewRoute)

// for ejs view
//const viewRoute = require('./routes/viewRoute')

// for using ejs
//app.set('view engine', 'ejs')
// app.use(express.static('public'))

// for using the react client
app.use(express.static(path.resolve(__dirname, '../client/build')))

module.exports = app
