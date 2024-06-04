const express = require('express')

const loger = require('morgan')
const ejs = require('ejs')
const db = require('./mongoDb')
const cors = require('cors')
const cookies = require('cookie-parser')

const usersRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute')

// for ejs view
//const viewRoute = require('./routes/viewRoute')

const app = express()

// Middleware
app.use(cors())
// app.options('*', cors())
app.use(cookies())
app.use(loger('dev'))
//app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// routers
app.use('/api/user', usersRoute)
app.use('/api/messages', messageRoute)

// for the use of ejs templates.
//app.use('/', viewRoute)

// for using the react client
app.use(express.static((__dirname, '../client/build')))

module.exports = app
