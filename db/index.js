const pg = require('pg')
/* Uses the following variables by default.
{
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
}
 */
const pool = new pg.Pool({ connectionTimeoutMillis: 2000 })

// Add an error event listener to the pool
pool.on('error', (error, client) => {
  console.error('Error in PostgreSQL pool:', error)
  client.release()
})

// Used for logging
pool.on('release', (error, client) => {
  if (error) {
    console.error('Error in pool release:', error, client)
  } else {
    //console.log('User', client.user, 'accessed database', client.database )
  }
})

const query = async (text, params) => {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } catch (error) {
    console.error(error.message)
  } finally {
    client.release()
  }

}
module.exports = { query, pool }