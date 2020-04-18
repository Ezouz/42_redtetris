const http = require('http');
// const fs = require('fs');
// const https = require('https');
const express = require('express');
const Socket = require("./helpers/socket");
const cors = require('cors');
const router = require('./api/router');

class Server {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use('/tetris-api/',
      router
    );

    this.http = http.Server(this.app);
    // this.http = https.createServer({
    //             key: fs.readFileSync('/etc/letsencrypt/live/ezouz.com-0001/privkey.pem'),
    //             cert: fs.readFileSync('/etc/letsencrypt/live/ezouz.com-0001/fullchain.pem')
    //          }, this.app);
    this.sockets = new Socket(this.http).initEngine();
  }

  listen() {
    this.app.get('*', function (req, res) {
      res.status(404).send('<img src="http://giphygifs.s3.amazonaws.com/media/5ftsmLIqktHQA/giphy.gif" alt="hin hin hin ! This is not the magic word">');
    });
    this.app.enable('trust proxy');
    this.app.use(function (req, res, next) {
      if (req.secure) {
        // request was via https, so do no special handling
        next();
      } else {
        res.redirect('https://' + req.originalUrl);
      }
    });
   this.http.listen(process.env.MAIN_PORT, () => {
      console.log(`Listening on port ${process.env.MAIN_PORT}\n`);
    });
  }
}

new Server().listen();
