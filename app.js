const express = require('express')
const cors = require('cors')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const homeRouter = require('./routes/homeRoutes')
const authRouter = require('./routes/authRoutes')
const cookeParser = require('cookie-parser')
const session = require('express-session')

const PORT = process.env.PORT || 3000
const app = express()

// * middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cookeParser())
app.use(session({
  secret: "xyz",
  saveUninitialized: false,
  resave:true,
  cookie: {
    sameSite: 'strict',
    maxAge: 60 * 1000 * 60
  }
}))
app.use(expressLayouts)

// * static files 
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'public')))

// * view engine setup
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")


// * paths
app.use('/', homeRouter)
app.use('/auth', authRouter)


app.listen(PORT, () => console.log(`server is running at port ${PORT}`))
