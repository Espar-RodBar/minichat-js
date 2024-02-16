const Users = require('../models/userModel')

exports.signIn = (req, res) => {
  error = { message: '' }
  res.render('login.ejs', error)
}

// exports.signIn = async (req, res) => {
//   const { userName, password } = req.body
//   try {
//     const user = await Users.findOne({ userName, password })
//     if (user) res.status(200).redirect('/')
//     else res.status(200).redirect('/login')
//   } catch (err) {
//     console.log('login error: ', err)
//   }
// }

exports.signUpIndex = (req, res) => {
  const error = { status: false, message: '' }
  res.render('register.ejs', { error })
}

// exports.signUp = async (req, res) => {
//   try {
//     const { userName, password } = req.body
//     const user = {
//       userName,
//       password,
//     }

//     // first find if exist an user:
//     const userExist = await Users.findOne({ userName })
//     if (!userExist) {
//       const newUser = new Users(user)
//       newUser.save()
//     }
//     // users.insertOne(user).then((result) => console.log(result))
//     res.status(200).render('login.ejs')
//   } catch (err) {
//     console.log('error on signup')
//   }
// }
