const express = require('express')
const routes = express.Router()

const AuthController = require('./App/Controllers/authController')
const ProjectController = require('./App/Controllers/projectController')

routes.post('/register', AuthController.create)
routes.post('/authenticate', AuthController.authenticate)

module.exports = routes;