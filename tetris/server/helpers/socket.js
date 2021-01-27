const Game = require('./game');
const Player = require('./player');
const Games = require('./games');
const socketIO = require('socket.io');

class Socket {
    constructor(http) {
        this.games = new Games();
        this.io = socketIO(http, { 
            cors: {
                origin: "http://localhost:3005",
                methods: ["GET", "POST"]
              }, 
              pingTimeout: 60000 
            });
    }

    isRoom(games, room) {
        for (var i = 0; i < games.length ; i++) {
            if (games[i].room == room) {
                return i;
            }
        }
        return (-1);
    }

    initEngine() {
        this.io.sockets.on('connection', (socket) => {
            process.stdout.write("Socket connected: " + socket.id + '\n');
            socket.once('room', (room, username) => {
                socket.username = username;
                socket.room = room;
                const player = new Player (username, socket.id);
                let is_room = this.isRoom (this.games.games, room);
                if (is_room >= 0 && this.games.games[is_room].running == false) {
                    this.games.add_player_to_game(player, this.games.games[is_room]);
                    socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
                    this.io.sockets.in(room).emit('message', socket.username + ' has joined the game folks !');
                    socket.join(room);
                    this.io.sockets.in(room).emit('players', this.games.games[is_room].leader, this.games.games[is_room].players);
                }
                else if (is_room >= 0 && this.games.games[is_room].running == true) {
                    socket.emit('isRunning')
                }
                else {
                    this.games.create_game(player, room)
                    socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
                    socket.join(room);
                }
                if(this.io.sockets.adapter.rooms[room] !== undefined && this.io.sockets.adapter.rooms[room]['sockets'][socket.id] !== undefined) {
                    socket.on('disconnect', () => {
                        process.stdout.write("Socket disconnected: " + socket.id + '\n');
                        socket.leave(room);
                        const { curGame, winner, ran } = this.games.player_leaving(this.isRoom(this.games.games, room), player);
                            if (curGame !== undefined && curGame.players.length > 0) {
                                this.io.sockets.in(room).emit('message', socket.username + ' has left the game');
                                if (winner && ran === true) {
                                    this.io.sockets.in(room).emit('win', winner);
                                    this.io.sockets.in(room).emit('players', this.games.games[this.isRoom (this.games.games, room)].leader, this.games.games[this.isRoom (this.games.games, room)].players);
                                }
                                else {
                                    this.io.sockets.in(room).emit('players', this.games.games[this.isRoom (this.games.games, room)].leader, this.games.games[this.isRoom (this.games.games, room)].players);
                                }
                            }
                            else {
                                this.games.games.splice(this.isRoom (this.games.games, room), 1);
                            }
                    })
                }
                else {
                    socket.on('disconnect', () => {
                        process.stdout.write("Socket disconnected: " + socket.id + '\n');
                    });
                }
                socket.emit('player', player);
                socket.on('set_score', (person, room) => {
                    const curGame = this.games.games[this.isRoom(this.games.games, room)];
                    curGame.updateScore(person);
                    this.io.sockets.in(room).emit('players', curGame.leader, curGame.players);
                });
                socket.on('collision', (person, room) => {
                    const { curGame, need_refill } = this.games.collision(this.isRoom(this.games.games, room), person);
                    this.io.sockets.in(room).emit('players', curGame.leader, curGame.players);
                    if (need_refill) {
                        this.io.sockets.in(room).emit('refill', curGame.tetriminos);
                    }
                });
                socket.on('game_over', (person, room) => {
                    const { curGame, winner } = this.games.game_over(this.isRoom(this.games.games, room), person);
                    if (winner) {
                        this.io.sockets.in(room).emit('win', winner);
                    }
                    this.io.sockets.in(room).emit('players', curGame.leader, curGame.players);
                });
                socket.on('smash', (person, room) => {
                    const curGame = this.games.smash_player(this.isRoom(this.games.games, room), person);
                    this.io.sockets.in(room).emit('players', curGame.leader, curGame.players);
                    socket.broadcast.to(room).emit('freeze', person.smashed);
                });
            });
            socket.on('start', room => {
                const curGame = this.games.start_one_game(this.isRoom(this.games.games, room))
                this.io.sockets.in(room).emit('players', curGame.leader, curGame.players);
                this.io.sockets.in(room).emit('refill', curGame.tetriminos);
                this.io.sockets.in(room).emit('start_game');
                curGame.update_players_round();
            });
            socket.on('end', room => {
                this.games.end_one_game(this.isRoom(this.games.games, room))
            });
            socket.on('reset', room => {
                this.games.reset_one_game(this.isRoom(this.games.games, room))
                this.io.sockets.in(room).emit('restart_game', this.games.games[this.isRoom (this.games.games, room)].players);
            });
        });
    }
}

module.exports = Socket;