const stationsRouter = require('express').Router()
const db = require('../db/index')

// Show names of all stations
stationsRouter.get('/', async (req, res) => {
  const result = await db.query('SELECT id, station_name FROM station;')
  if (result) {
    res.send(result.rows)
  } else {
    response.status(404).end()
  }
})

// Show details of a single station
stationsRouter.get('/:id', async (req, res) => {
  const result = await db.query(`SELECT id, station_name, station_address, coordinate_x, coordinate_y FROM station WHERE id = ${req.params.id};`)
  if (result) {
    res.send(result.rows)
  } else {
    response.status(404).end()
  }
})

// Show all journeys departed from a specific station
stationsRouter.get('/:id/departures/', async (req, res) => {
  const result = await db.query(`SELECT id, return_station_id, distance, duration FROM journey WHERE departure_station_id = ${req.params.id};`)
  if (result) {
    res.send(result.rows)
  } else {
    response.status(404).end()
  }
})

// Return the number of journeys departed from a specific station
stationsRouter.get('/:id/departures/count', async (req, res) => {
  const result = await db.query(
    `SELECT count(*) FROM (
      SELECT * FROM journey WHERE return_station_id = ${req.params.id}
      );  
    `)
  if (result) {
    res.send(result.rows[0].count)
  } else {
    response.status(404).end()
  }
})

// Show all journeys returned to a specific station
stationsRouter.get('/:id/returns/', async (req, res) => {
  const result = await db.query(`SELECT id, distance, duration FROM journey WHERE return_station_id = ${req.params.id};`)
  if (result) {
    res.send(result.rows)
  } else {
    response.status(404).end()
  }
})

// Return the number of journeys returned to specific station
stationsRouter.get('/:id/returns/count', async (req, res) => {
  const { id } = req.params
  const result = await db.query(
    `SELECT count(*) FROM (
      SELECT * FROM journey WHERE departure_station_id = ${id}
      );
    `)
  if (result) {
    res.send(result.rows[0].count)
  } else {
    response.status(404).end()
  }
})

module.exports = stationsRouter