const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv').config()

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'ClusterChatJS'

const client = new MongoClient(dbConnectionStr, {
  useUnifiedTopology: true,
})

/*
  .then((client) => {
    console.log(`Connected to db ${dbName} Database `)
    db = client.db(dbName)
    const messageBoard = db.collection('messages')
    const users = db.collection('users')
    let user_error_message = ''
  })
  .catch((err) => {
    console.log(`Error db connection: ${err}`)
  })*/

module.exports = client.db('ClusterChatJS')
