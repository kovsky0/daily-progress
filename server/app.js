const express = require('express')
const app = express()
const config = require('./config')
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const goalsRoutes = require('./routes/goals')
const userRoutes = require('./routes/user')

mongoose.connect(
    config.mongoURL,
    {
        useMongoClient: true
    }
  )
mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/goals', goalsRoutes)
app.use('/user', userRoutes)

app.use((req, res, next) => {
    const error = new Error("Not found")
    error.status = 404
    next(error)
})  
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app