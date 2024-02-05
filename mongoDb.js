//const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'ClusterChatJS'

module.exports = mongoose
  .connect(dbConnectionStr, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection succesful'))
  .catch((err) => console.log('ERROR on DB connection'))

// const client = new MongoClient(dbConnectionStr, {
//   useUnifiedTopology: true,
// })

//module.exports = client.db('ClusterChatJS')
