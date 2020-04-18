const db = require('./db');

const init_db = async () => {
  try {
    await db.query(`CREATE SCHEMA IF NOT EXISTS tetris_postgres AUTHORIZATION user;`)
    await db.query(`CREATE TABLE IF NOT EXISTS tetris_postgres.scores (
                      score_id SERIAL PRIMARY KEY,
                      player_name VARCHAR(255),
                      score BIGINT,
                      created TIMESTAMP
                  );`)
  } catch (error) {
    return new Error(error);
  }
};

module.exports = init_db;
