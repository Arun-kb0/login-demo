const fruits = require('../model/fruits.json')

const homeController = (req, res) => {
  if (!req.session.authorized) return res.redirect('/auth/login')
  res.render('index', { fruits })
}

module.exports = { homeController }