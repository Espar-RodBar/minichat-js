exports.signIn = (req, res) => {
  error = { message: '' }
  res.render('login.ejs', error)
}

exports.signUpIndex = (req, res) => {
  const error = { status: false, message: '' }
  res.render('register.ejs', { error })
}
