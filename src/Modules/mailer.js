const path = require('path')
const nodemailer = require('nodemailer')
const exphbs = require('express-handlebars')
const hbs = require('nodemailer-express-handlebars')

const { host, port, user, pass} = require('../config/mail.json')

var transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass
  }
});

transport.use('compile', hbs({
  viewEngine: {
    partialsDir: path.resolve('./src/Resources/Mail'),
    layoutsDir: path.resolve('./src/Resources/Mail/Auth'),
    defaultLayout: "forgot-password.hbs",
    extname: ".hbs"
  },
  extName: ".hbs",
  viewPath: path.resolve('./src/Resources/Mail')
}))

module.exports = transport