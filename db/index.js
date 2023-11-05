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
const pool = new pg.Pool()

const query = (text, params) => pool.query(text, params)

module.exports = { query }