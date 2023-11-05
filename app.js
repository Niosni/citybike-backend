require('dotenv').config()
const express = require('express')
const app = express()
const stationsRouter = require('./controllers/stations')
const journeysRouter = require('./controllers/journeys')

app.use(express.json())
app.use('/api/station', stationsRouter)
app.use('/api/journey', journeysRouter)

module.exports = app