//const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const dbConnectionStr = process.env.DB_STRING

module.exports = mongoose
  .connect(dbConnectionStr)
  .then(() => console.log('DB connection succesful'))
  .catch((err) => console.log('ERROR on DB connection', err))
