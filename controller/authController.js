const bcrypt = require('bcrypt')
const userList = require("../model/userList.json")

const getLoginPageController = (req, res) => {
  res.render('login')
}

const loginController = async (req, res) => {
  const { email, password } = req.body
  // const hashedPwd = await bcrypt.hash(password, 10)
  // console.log(hashedPwd)
  console.log(email)
  console.log(password)
  if(!email || !password) return res.status(400).json({"message": "email and password required"})
  foundUser = userList.find((user) => user.username === email)
  if (!foundUser) return res.status(404).json({message:"invalid username"}) 
  const isMatch = await bcrypt.compare(password , foundUser.password )
  if(!isMatch) return res.status(401).json({message:"invalid password"})
  console.log("login success")
  res.status(200).json({message:"login success !"})
}

const signUpController = (req, res) => {
  res.render('login')
}



module.exports = {
  getLoginPageController,
  loginController,
  signUpController
}

