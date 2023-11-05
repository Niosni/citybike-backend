const journeysRouter = require('express').Router()
const db = require('../db/index')

journeysRouter.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM journey limit 10;')
  res.send(result.rows)
})

journeysRouter.get('/:id', async (req, res) => {
  const result = await db.query(`SELECT * FROM journey WHERE id = ${req.params.id};`)
  res.send(result.rows)
})

module.exports = journeysRouter