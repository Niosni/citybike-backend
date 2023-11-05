require('dotenv').config()
const express = require('express')
const app = express()
const pg = require('pg');

/* Uses the following variables by default.
{
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
}
 */
const pool = new pg.Pool()
let client = null

const pgTest = async () => {
  try {
    client = await pool.connect()

    console.log('Connected to the database.');
    // Test query to ensure database connection works
    const result = await pool.query('SELECT * FROM journey WHERE distance IS NOT NULL ORDER BY distance DESC limit 10 ;')
    console.log(result.rows);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

pgTest()

app.get('/', (req, res) => {
  res.send('<h1>Citybike API</h1>')
})

app.get('/api/station', async (req, res) => {
  const result = await client.query('SELECT * FROM station;')
  res.send(result.rows)
})

app.get('/api/station/:id', async (req, res) => {
  const result = await client.query(`SELECT * FROM station WHERE id = ${req.params.id};`)
  res.send(result.rows)
})

app.get('/api/journey', async (req, res) => {
  const result = await client.query('SELECT * FROM journey limit 100;')
  res.send(result.rows)
})

app.get('/api/journey/:id', async (req, res) => {
  const journey = await client.query(`SELECT * FROM journey WHERE id = ${req.params.id};`)
  if (journey) {
    res.json(journey.rows)
  } else {
    res.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})