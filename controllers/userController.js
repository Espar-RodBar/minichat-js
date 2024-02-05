const user = require('../models/userModel')

const signIndex = async (req, res) => {
  res.render('login.ejs')
}
module.exports = signIndex

const signIn = (req, res) => {
  const { userName, password } = req.body
  users
    .findOne({ userName, password })
    .then((result) => console.log('user found'))
    .catch((err) => console.log('login error: ', err))
  res.redirect('/')
}

module.exports = signIn

const signUp = (req, res) => {
  const { userName, password } = req.body
  const user = {
    userName,
    password,
  }
  users.insertOne(user).then((result) => console.log(result))
  res.render('login.ejs')
}
module.exports = signUp
