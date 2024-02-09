const { Server } = require('socket.io')
const messageModel = require('./models/messageModel')
const saveMessage = require('./helpers/saveMessage')

module.exports = function (server) {
  const io = new Server(server, {
    connectionStateRecovery: {
      maxDisconnectionDuration: 1000,
    },
  })

  io.on('connection', (socket) => {
    console.log('User connected')
    socket.on('disconnect', () => {
      console.log('User disconnected')
    })
    socket.on('chat message', async (msg) => {
      try {
        const result = await saveMessage(msg, messageModel)
        console.log(result)
        io.emit('chat message', result)
      } catch (e) {
        console.log(e)
      }
    })
  })
}
