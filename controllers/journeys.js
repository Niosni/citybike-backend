const journeysRouter = require('express').Router()
const db = require('../db/index')
const sql = require('sql-template-strings')

// 10 first journeys from the table
journeysRouter.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM journey limit 10;')

  if(result.rowCount) {
    res.send(result.rows)
  } else {
    throw new Error('Journeys couldn\'t be found.')
  }
})

// Show details of a single journey
journeysRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const result = await db.query(sql`SELECT * FROM journey WHERE id = ${id}`)

  if(result.rowCount) {
    res.send(result.rows)
  } else {
    throw new Error(`Journey with id:${id} couldn't be found.`)
  }
})

module.exports = journeysRouter