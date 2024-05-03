const express = require('express')
const { loginController, signUpController, getLoginPageController } = require('../controller/authController')
const router = express.Router()


router.route('/login')
  .get(getLoginPageController)
  .post(loginController)

router.post('/signup', signUpController)


module.exports = router