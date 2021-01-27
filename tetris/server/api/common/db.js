const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.PG_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_USER,
  port: process.env.POSTGRES_PORT,
});

module.exports = {
  query: (stmt, callback) => pool.query(stmt, callback)
};
