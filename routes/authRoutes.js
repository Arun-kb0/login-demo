const express = require('express')
const { loginController, signUpController, getLoginPageController, logoutController } = require('../controller/authController')
const router = express.Router()


router.route('/login')
  .get(getLoginPageController)
  .post(loginController)

router.get('/logout', logoutController)

router.post('/signup', signUpController)


module.exports = router