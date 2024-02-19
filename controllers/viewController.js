exports.getIndex = (req, res) => {
  let user = ''
  if (res.locals.user) user = res.locals.user.userName
  res.status(200).render('index.ejs', { user })
}

exports.getLogin = (req, res) => {
  let user = ''
  if (res.locals.user) user = res.locals.user.userName
  res.status(200).render('login.ejs', { user })
}

exports.getSignup = (req, res) => {
  let user = ''
  if (res.locals.user) user = res.locals.user.userName
  res.status(200).render('register.ejs', { user })
}

exports.getChatroom = (req, res) => {
  let user = ''
  if (res.locals.user) user = res.locals.user.userName
  res.status(200).render('chatRoom.ejs', { user })
}
