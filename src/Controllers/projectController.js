const express = require('express')
const authMiddleware = require('../Middlewares/Auth')

const routes2 = express.Router()

routes2.use(authMiddleware)

routes2.get('/', (req, res) => {
  return res.status(200).send({ ok: true })
})

module.exports = routes2