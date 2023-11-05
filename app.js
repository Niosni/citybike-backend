require('dotenv').config()
const express = require('express')
const app = express()
const stationsRouter = require('./controllers/stations')
const journeysRouter = require('./controllers/journeys')

app.get('/', (req, res) => {
  res.send('<h1>Citybike API</h1>')
})

app.use(express.json())
app.use('/api/stations', stationsRouter)
app.use('/api/journeys', journeysRouter)

module.exports = app