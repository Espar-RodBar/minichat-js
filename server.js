const app = require('./app')
const dotenv = require('dotenv')
const result = dotenv.config()
const PORT = process.env.PORT || '2121'

if (result.error) console.log('error loading environment var')

app.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT)
})
