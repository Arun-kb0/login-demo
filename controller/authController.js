const bcrypt = require('bcrypt')
const userList = require("../model/userList.json")


const getLoginPageController = (req, res) => {
  if (req.session?.authorized) return res.redirect('/')
  res.render('login')
}

// * login
const loginController = async (req, res) => {
  const { email, password } = req.body
  console.log(email)
  console.log(password)

  try {
    if (!email || !password) return res.status(400).json({ "message": "email and password required" })
    foundUser = userList.find((user) => user.username === email)
    if (!foundUser) return res.status(404).json({ message: "invalid username" })
    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (!isMatch) return res.status(401).json({ message: "invalid password" })

    req.session.user = foundUser
    req.session.authorized = true
    console.log(`${req.session.user.username} login success`)
    res.status(200).json({ message: `login success !`, username: req.session.user.username })
  } catch (err) {
    res.sendStatus(500)
  }
}

// * logout
const logoutController = async (req, res) => {
  console.log(req.session.user)
  try {
    req.session.destroy()
    console.log("logout success")
    res.sendStatus(200)
  } catch (err) {
    console.log("logout failed")
    console.log(err)
    res.sendStatus(500)
  }
}

const signUpController = (req, res) => {
  res.render('login')
}



module.exports = {
  getLoginPageController,
  loginController,
  signUpController,
  logoutController
}

