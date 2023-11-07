const stationsRouter = require('express').Router()
const db = require('../db/index')
const sql = require('sql-template-strings')

// Show names of all stations
stationsRouter.get('/', async (req, res) => {
  const result = await db.query('SELECT id, station_name FROM station;')
  if (result.rowCount) {
    res.send(result.rows)
  } else {
    throw new Error('Stations couldn\'t be found.')
  }
})

// Show details of a single station
stationsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const result = await db.query(sql`SELECT id, station_name, station_address, coordinate_x, coordinate_y FROM station WHERE id = ${id}`)
  if (result.rowCount) {
    res.send(result.rows)
  } else {
    throw new Error('Station couldn\'t be found.')
  }
})

// Show all journeys departed from a specific station
stationsRouter.get('/:id/departures/', async (req, res) => {
  const { id } = req.params
  const result = await db.query(sql`SELECT id, return_station_id, distance, duration FROM journey WHERE departure_station_id = ${id};`)
  if (result.rowCount) {
    res.send(result.rows)
  } else {
    throw new Error('Station couldn\'t be found.')
  }
})

/**TODO: HANDLE WHEN STATION IS NOT FOUND */
// Return the number of journeys departed from a specific station
stationsRouter.get('/:id/departures/count', async (req, res) => {
  const { id } = req.params
  const result = await db.query(
    sql`SELECT count(*) FROM (
      SELECT * FROM journey WHERE return_station_id = ${id}
      );  
    `)
  if (result.rowCount) {
    res.send(result.rows[0].count)
  } else {
    throw new Error('Station couldn\'t be found.')
  }
})

// Show all journeys returned to a specific station
stationsRouter.get('/:id/returns/', async (req, res) => {
  const { id } = req.params
  const result = await db.query(sql`SELECT id, distance, duration FROM journey WHERE return_station_id = ${id};`)
  if (result.rowCount) {
    res.send(result.rows)
  } else {
    throw new Error('Station couldn\'t be found.')
  }
})

/**TODO: HANDLE WHEN STATION IS NOT FOUND */
// Return the number of journeys returned to specific station
stationsRouter.get('/:id/returns/count', async (req, res) => {
  const { id } = req.params
  const result = await db.query(
    sql`SELECT count(*) FROM (
      SELECT * FROM journey WHERE departure_station_id = ${id}
      );
    `)
  if (result.rowCount) {
    res.send(result.rows[0].count)
  } else {
    throw new Error('Station couldn\'t be found.')
  }
})

module.exports = stationsRouter