const express = require('express')
const crypto = require('crypto')

const User = require('../Models/user')

const mailer = require('../../Modules/mailer')

const routes = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authConfig = require('../../config/auth.json')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400 // segundos (1 dia)
  })
}

routes.post('/register', async (req, res) => {
  const { email } = req.body

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "User already exists" })

    
    const user = await User.create(req.body)

    user.password = undefined

    return res.send({ 
      user,
      token: generateToken({ id: user.id })
    })
  } catch(err) {
    return res.status(400).json({ error: err })
  }
})

routes.post('/authenticate', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

  if (!user)
    return res.status(400).send({ error: "User not found"})

  /* Comparar as senhas criptografadas */
  if (!await bcrypt.compare(password, user.password))
    return res.status(401).send({ error: "Invalid password "})

  user.password = undefined

  return res.status(200).send({ 
    user, 
    token: generateToken({ id: user.id })
  })
})

routes.post('/forgot_password', async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user)
      return res.status(400).send({ error: 'User not found' })

    const token = crypto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await User.findByIdAndUpdate(user._id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    }, { new: true });

    mailer.sendMail({
      to: email,
      from: 'mnopedrodias@gmail.com',
      template: 'Auth/forgot-password',
      context: { token }
    }, (err) => {
      if (err)
        return res.status(400).send({ error: err })
      
      return res.status(200).send()
    })
  } catch (err) {
    res.status(400).send({ error: "Error" })
  }
})

routes.post('/reset_password', async (req, res) => {
  const { email, token, password } = req.body

  try {
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires')
    
    if (!user)
      return res.status(400).send({ error: 'User not found' })

    if (token !== user.passwordResetToken)
      return res.status(401).send({ error: 'Token invalid' })


    const now = new Date()
    if (now > user.passwordResetExpires)
      return res.status(401).send({ error: 'Token expires, generate another' })

    user.password = password
    await user.save()

    return res.status(200).send()

  } catch (err) {
    return res.status(400).send({ error: 'Cannot reset password, try again' })
  }
})

module.exports = routes