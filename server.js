const { Server } = require('socket.io')
const { createServer } = require('node:http')

const app = require('./app')
const dotenv = require('dotenv')
const result = dotenv.config()
const PORT = process.env.PORT || '2121'

const server = Server(app)

io.on('connection', () => {
  console.log('User connected')
})

if (result.error) console.log('error loading environment var')

server.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT)
})
