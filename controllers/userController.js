const Users = require('../models/userModel')

exports.signIn = (req, res) => {
  res.render('login.ejs')
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
  user_error_message = ''
  res.render('register.ejs', { user_error_message })
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
