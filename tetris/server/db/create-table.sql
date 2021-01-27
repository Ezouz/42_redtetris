CREATE SCHEMA IF NOT EXISTS tetris_postgres AUTHORIZATION user42;

CREATE TABLE IF NOT EXISTS tetris_postgres.scores (
    score_id SERIAL PRIMARY KEY,
    player_name VARCHAR(255),
    score BIGINT,
    created TIMESTAMP
);