const stationsRouter = require('express').Router()
const db = require('../db/index')
const sql = require('sql-template-strings')

// Handles database query results
const handleQueryResult = (response, result) => {
  if (!result) {
    throw new Error('invalid input syntax.')
  } else if (result.rowCount){
    response.send(result.rows)
  } else {
    throw new Error('Station couldn\'t be found.')
  }
}
// Show names of all stations
stationsRouter.get('/', async (req, response) => {
  const result = await db.query('SELECT id, station_name FROM station;')
  handleQueryResult(response, result)
})

// Show details of a single station
stationsRouter.get('/:id', async (req, response) => {
  const { id } = req.params
  const result = await db.query(sql`SELECT id, station_name, station_address, coordinate_x, coordinate_y FROM station WHERE id = ${id}`)
  handleQueryResult(response, result)
})

// Show all journeys departed from a specific station
stationsRouter.get('/:id/departures/', async (req, response) => {
  const { id } = req.params
  const result = await db.query(sql`SELECT id, return_station_id, distance, duration FROM journey WHERE departure_station_id = ${id};`)
  handleQueryResult(response, result)
})

/**TODO: HANDLE WHEN STATION IS NOT FOUND */
// Return the number of journeys departed from a specific station
stationsRouter.get('/:id/departures/count', async (req, response) => {
  const { id } = req.params
  const result = await db.query(
    sql`SELECT count(*) FROM (
      SELECT * FROM journey WHERE departure_station_id = ${id}
      );  
    `)
  handleQueryResult(response, result)
})

// Show all journeys returned to a specific station
stationsRouter.get('/:id/returns/', async (req, response) => {
  const { id } = req.params
  const result = await db.query(sql`SELECT id, distance, duration FROM journey WHERE return_station_id = ${id};`)
  handleQueryResult(response, result)
})

/**TODO: HANDLE WHEN STATION IS NOT FOUND */
// Return the number of journeys returned to specific station
stationsRouter.get('/:id/returns/count', async (req, response) => {
  const { id } = req.params
  const result = await db.query(
    sql`SELECT count(*) FROM (
      SELECT * FROM journey WHERE return_station_id = ${id}
      );
    `)
  handleQueryResult(response, result)
})

module.exports = stationsRouter