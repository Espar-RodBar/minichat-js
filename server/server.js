const { createServer } = require('node:http')
const connectIO = require('./connect-io')
const app = require('./app')
const server = createServer(app)

connectIO(server)
const dotenv = require('dotenv')
const result = dotenv.config()
if (result.error) console.log('error loading environment var')

const PORT = process.env.PORT || '2121'

server.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT)
})
