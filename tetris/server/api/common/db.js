const { Pool } = require('pg');
// const fs = require('fs');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.PG_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_USER,
  port: process.env.POSTGRES_PORT,
  // ssl: {
  //   rejectUnauthorized: false,
  //   ca: fs.readFileSync('/etc/ssl/certs/dhparam-2048.pem').toString(),
  //   key: fs.readFileSync('/etc/letsencrypt/live/ezouz.com-0001/privkey.pem').toString(),
  //   cert: fs.readFileSync('/etc/letsencrypt/live/ezouz.com-0001/fullchain.pem').toString()
  // },
});

module.exports = {
  query: (stmt, callback) => pool.query(stmt, callback)
};
