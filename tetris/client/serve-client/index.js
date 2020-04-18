const express = require('express');

const app = express();

app.use(express.static('/home/node/public/'));
app.use('/', (req, res) => res.sendFile('/home/node/public/index.html'));

app.listen(process.env.REACT_APP_TETRIS_APP_PORT, () => {
  console.log('Application running on port: ' + process.env.REACT_APP_TETRIS_APP_PORT);
});
