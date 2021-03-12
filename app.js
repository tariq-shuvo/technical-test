var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// Load Mongo Database Connection
var mongoConnection = require('./config/db')
mongoConnection()

var adminRouter = require('./routes/api/admin/admin')
var adminAuthRouter = require('./routes/api/admin/auth')
var userRouter = require('./routes/api/user/users')
var userAuthRouter = require('./routes/api/user/auth')

var menuRouter = require('./routes/api/menu')
var orderRouter = require('./routes/api/order')

var app = express()

app.use(logger('dev'))
app.use(
  express.json({
    extended: false
  })
)
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/admin', adminRouter)
app.use('/api/admin/auth', adminAuthRouter)

app.use('/api/user', userRouter)
app.use('/api/user/auth', userAuthRouter)

app.use('/api/menu', [menuRouter.addMenu, menuRouter.getMenu, menuRouter.updateMenu])
app.use('/api/order', [orderRouter.addOrder, orderRouter.getOrder])

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use('/', express.static(path.join(__dirname, './client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'))
  })
}

// Set static folder
app.use('/', express.static(path.join(__dirname, './client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'))
})

module.exports = app
