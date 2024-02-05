const express = require('express')

const userRouter = express.Router()

userRouter
  .route('/login')
  .get(async (req, res) => {
    res.render('login.ejs')
  })
  .post((req, res) => {
    const { userName, password } = req.body
    users
      .findOne({ userName, password })
      .then((result) => console.log('user found'))
      .catch((err) => console.log('login error: ', err))
    res.redirect('/')
  })

userRouter.route('/register').post((req, res) => {
  const { userName, password } = req.body
  const user = {
    userName,
    password,
  }
  users.insertOne(user).then((result) => console.log(result))
  res.render('login.ejs')
})
