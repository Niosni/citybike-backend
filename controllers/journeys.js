const journeysRouter = require('express').Router()
const db = require('../db/index')

// 10 first journeys from the table
journeysRouter.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM journey limit 10;')
  if (result) {
    res.send(result.rows)
  } else {
    response.status(404).end()
  }
})

// Show details of a single journey
journeysRouter.get('/:id', async (req, res) => {
  const result = await db.query(`SELECT * FROM journey WHERE id = ${req.params.id};`)
  if (result) {
    res.send(result.rows)
  } else {
    response.status(404).end()
  }
})

module.exports = journeysRouter