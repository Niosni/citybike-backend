const stationsRouter = require('express').Router()
const db = require('../db/index')

stationsRouter.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM station;')
  res.send(result.rows)
})

stationsRouter.get('/:id', async (req, res) => {
  const result = await db.query(`SELECT * FROM station WHERE id = ${req.params.id};`)
  res.send(result.rows)
})

module.exports = stationsRouter