const { Server } = require('socket.io')
const MessageModel = require('./models/messageModel')
const User = require('./models/userModel')
const saveMessage = require('./helpers/saveMessage')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const usersConnected = new Set()

module.exports = function (server) {
  const io = new Server(server, {
    connectionStateRecovery: {
      maxDisconnectionDuration: 1000,
    },
  })

  io.on('connection', async (socket) => {
    // guard clause no cookie
    if (!socket.handshake.headers.cookie) {
      console.log('no cookies on socket')
      return
    }

    const cookies = socket.handshake.headers.cookie
      .split(';')
      .reduce((obj, el) => {
        const keyVal = el.split('=').map((el) => el.trim())
        obj[`${keyVal[0]}`] = keyVal[1]
        return obj
      }, {})

    // 1.- get the username from the db
    // Decode the token
    const decoded = await promisify(jwt.verify)(
      cookies['jwt'],
      process.env.JWT_SECRET
    )

    // 2. find user in db and add it to the socket. Add usercoonected to the socket
    let tokenUser = await User.findById(decoded.id).select('userName')
    const userName = tokenUser.userName
    usersConnected.add(userName)
    socket.userName = userName

    // 3.- emite the list of users connected:
    io.sockets.emit('listUsers', Array.from(usersConnected).join(' '))

    // 4. If user connects from another client, close the first
    // TODO

    socket.on('disconnect', () => {
      socket.handshake.headers.cookie = null
      usersConnected.delete(socket.userName)
      console.log('User disconnected')
    })

    socket.on('client logout', () => {
      socket.handshake.headers.cookie = null
      usersConnected.delete(socket.userName)
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
