const express = require("express")
const bodyParser = require("body-parser")
const routes = require('./Controllers/authController')
const routes2 = require('./Controllers/projectController')

const app = express()

app.use(express.json())
app.use(routes)
app.use(routes2)

app.listen(3000)