const dotenv = require('dotenv')
dotenv.config()

const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./src/app/router')
const port = 8080
const env = process.env.NODE_ENV || 'dev'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', routes)

const server = app.listen(port, () => {
    console.log(`Running in: ${env} and listening on port: ${port}`)
})

module.exports = server