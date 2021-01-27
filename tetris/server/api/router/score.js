const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({
  mergeParams: true // inherit params from earlier router
});

const db = require('../common/db');

router.get('/leaderboard', async (req, res) => {
  try {
    var leaderboard = (
      await db.query(
        `SELECT player_name, score
        FROM tetris_postgres.scores
        ORDER BY score DESC
        LIMIT 10;`)
    );
  } catch (error) {
    return (res.status(500).send({
      message: 'Internal Server Error',
      code: 500
    }));
  }
  return (
    res.status(200).send(leaderboard.rows)
  );
});

router.post('/new', async (req, res) => {
  let scored = false;
  if ((!req.body.score && req.body.score !== 0) || !req.body.player) {
    res.status(400).send({
      code: 400,
      message: 'Missing Parameters'
    });
    res.end();
    return;
  }
  if (/^[a-zA-Z]{3}$/.exec(req.body.player) && /^\d+$/.exec(req.body.score)) {
    try {
      if (req.body.score > 0) {
        const leaderboard = (
          await db.query(
            `SELECT score_id, player_name, score
            FROM tetris_postgres.scores
            ORDER BY score DESC
            LIMIT 10;`)
        ).rows;
        if (leaderboard.length === 10) {
          let highest = leaderboard[leaderboard.length - 1];
          if (req.body.score > highest.score) {
            scored = true;
            await db.query(
              `UPDATE tetris_postgres.scores SET player_name = '${req.body.player}', score = ${req.body.score} WHERE score_id = ${highest.score_id}`
            );
          }
        } else if (leaderboard.length < 10) {
          scored = true;
          await db.query(
            `INSERT INTO tetris_postgres.scores (player_name, score)
            VALUES ('${req.body.player}', ${req.body.score});`
          );
        }
      }
    } catch (error) {
      return (res.status(500).send({
        message: 'Internal Server Error',
        code: 500
      }));
    }
    return (
      res.status(200).send(scored)
    );
  } else {
    return (res.status(400).send({
      message: 'Bad Request',
      code: 400
    }));
  }
});

module.exports = router;

