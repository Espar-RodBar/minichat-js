import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js'

const baseUrl = window.location.origin

export default io(baseUrl, { autoConnect: false })
