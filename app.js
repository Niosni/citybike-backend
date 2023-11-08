require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
require('express-async-errors')

const stationsRouter = require('./controllers/stations')
const journeysRouter = require('./controllers/journeys')
const { errorHandler } = require('./utils/middleware')

app.get('/', (req, res) => {
  res.send('<h1>Citybike API</h1>')
})
app.use(cors())
app.use(express.json())
app.use('/api/stations', stationsRouter)
app.use('/api/journeys', journeysRouter)
app.use(errorHandler)

module.exports = app