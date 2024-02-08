const { Server } = require('socket.io')
const { createServer } = require('node:http')

const app = require('./app')
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:2121',
  },
})

const dotenv = require('dotenv')
const result = dotenv.config()
if (result.error) console.log('error loading environment var')

const PORT = process.env.PORT || '2121'

io.on('connection', (socket) => {
  console.log('User connected')
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

server.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT)
})
