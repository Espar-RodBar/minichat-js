const { Server } = require('socket.io')
const MessageModel = require('./models/messageModel')
const User = require('./models/userModel')
const saveMessage = require('./helpers/saveMessage')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = function (server) {
  const io = new Server(server, {
    connectionStateRecovery: {
      maxDisconnectionDuration: 1000,
    },
  })

  //Middleware
  io.use(async (socket, next) => {
    try {
      const user = await fetchUser(socket)
      socket.user = user
    } catch (err) {
      console.error(err)
      next(new Error('unknown user'))
    }
  })

  io.on('connection', (socket) => {
    // guard clause
    if (!socket.handshake.headers.cookie) {
      console.log('no cookies on socket')
      return
    }

    console.log('user:', socket.user)

    const cookies = socket.handshake.headers.cookie
      .split(';')
      .reduce((obj, el) => {
        const keyVal = el.split('=').map((el) => el.trim())
        obj[`${keyVal[0]}`] = keyVal[1]
        return obj
      }, {})

    socket.on('disconnect', () => {
      console.log('User disconnected')
    })

    socket.on('client logout', () => {
      socket.handshake.headers.cookie = null
      console.log('User logout')
    })

    socket.on('client message', async (msg) => {
      try {
        // 1.- Decode the token
        const decoded = await promisify(jwt.verify)(
          cookies['jwt'],
          process.env.JWT_SECRET
        )

        // 2. find user in db
        let tokenUser = await User.findById(decoded.id)

        // 3.- Create the msg in db with the user
        const result = await saveMessage(msg, MessageModel, tokenUser.id)
        await result.populate({ path: 'user', select: '-__v -password' })
        io.emit('server message', result)
      } catch (e) {
        console.log(e)
      }
    })
  })
}
