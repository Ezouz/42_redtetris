const Socket = require('../helpers/socket');
const io = require('socket.io-client');
const params = require('../config/params');
const http = require('http');
const express = require('express');
const Game = require("../helpers/game");
const Player = require("../helpers/player");

let httpServer;
let ClientSocket;
let sockets;
let app;
const host = '0.0.0.0';
const port = 3006;

const player1 = new Player('p1', 'a');
const game = new Game(player1, 42);

beforeAll((done) => {
  jest.setTimeout(20000);
  app = express();
  httpServer = http.Server(app);
  httpServer.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}\n`);
  });
  sockets = new Socket(httpServer);
  sockets.initEngine();
  done();
});

afterAll((done) => {
  httpServer.close();
  done();
});

beforeEach((done) => {
  ClientSocket = io.connect(`http://[${host}]:${port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });
  ClientSocket.on('connect', () => {
    done();
  });
});


afterEach((done) => {
  if (ClientSocket.connected) {
    ClientSocket.disconnect();
  }
  done();
});

describe('Testing backend answer from front emit actions', () => {
  it('should communicate between client and server', (done) => {
    ClientSocket.on('echo', (message) => {
      expect(message).toBe('Hello World');
      done();
    });
    sockets.io.emit('echo', 'Hello World');
    sockets.io.on('connection', (socket) => {
      expect(socket).toBeDefined();
      done();
    });
    done();
  });

  it('player creating new room', (done) => {
    expect(sockets.games.games).toHaveLength(0);
    ClientSocket.emit('room', '42', 'p1');
    ClientSocket.emit('start', '42');
    setTimeout(() => {
      expect(sockets.games.games).toHaveLength(1);
      done();
    }, 50);
  });

  it('socket on collision', (done) => {
    ClientSocket.emit('room', 42, 'p1');
    setTimeout(() => {
      player1.id = sockets.games.games[0].leader.id;
      ClientSocket.emit('collision', player1, 42);
      setTimeout(() => {
        expect(sockets.games.games[0].leader.round).toBe(1);
        done();
      }, 50);
    }, 50);
  });

  it('socket on game_over', (done) => {
    ClientSocket.emit('room', 42, 'p1');
    setTimeout(() => {
      player1.id = sockets.games.games[0].leader.id;
      ClientSocket.emit('game_over', player1, 42);
      setTimeout(() => {
        expect(sockets.games.games[0].leader.loser).toBe(true);
        done();
      }, 50);
    }, 50);
  });

  it('socket on smash', (done) => {
    ClientSocket.emit('room', 42, 'p1');
    setTimeout(() => {
      player1.id = sockets.games.games[0].leader.id;
      player1.smashed = 1;
      sockets.games.games[0].leader.spectre = [
        18, 18, 18, 18, 18,
        18, 18, 18, 18, 18
      ];
      sockets.games.games[0].players[0].spectre = [
        18, 18, 18, 18, 18,
        18, 18, 18, 18, 18
      ]
      ClientSocket.emit('smash', player1, 42);
      setTimeout(() => {
        expect(sockets.games.games[0].players[0].spectre).toEqual([
          19, 19, 19, 19, 19,
          19, 19, 19, 19, 19
        ]);
        done();
      }, 50);
    }, 50);
  });

  it('socket on start', (done) => {
    ClientSocket.emit('room', '42', 'p1');
    ClientSocket.emit('start', '42');
    setTimeout(() => {
      expect(sockets.games.games[0].running).toBe(true);
      done();
    }, 50);
  });

  it('socket on end', (done) => {
    ClientSocket.emit('room', '42', 'p1');
    ClientSocket.emit('start', '42');
    ClientSocket.emit('end', '42');
    setTimeout(() => {
      expect(sockets.games.games[0].running).toBe(false);
      done();
    }, 50);
  });

  it('socket on reset', (done) => {
    ClientSocket.emit('room', '42', 'p1');
    ClientSocket.emit('start', '42');
    ClientSocket.emit('end', '42');
    ClientSocket.emit('reset', '42');
    setTimeout(() => {
      expect(sockets.games.games[0].tetriminos).toEqual([]);
      done();
    }, 50);
  });

  it('should return the room position in games array', (done) => {
    sockets.games.games.push(game)
    expect(sockets.isRoom(sockets.games.games, '42')).toBe(0)
    done();
  });

  it('should return -1 if not in the games array', (done) => {
    sockets.games.games.push(game)
    expect(sockets.isRoom(sockets.games.games, '43')).toBe(-1)
    sockets.games.games.push(game)
    done();
  });
});