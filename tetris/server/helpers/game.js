const Tetriminos = require('./piece');

class Game {
  constructor(player, room) {
    this.leader = player;
    this.room = room;
    this.players = [];
    this.players.push(player);
    this.running = false;
    this.tetriminos = [];
    this.round = 0;
  }

  isPlayer(players, player) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == player.id) {
        return i;
      }
    }
    return -1;
  }

  updateScore(player) {
    this.players[this.isPlayer(this.players, player)].set_score(player.score, player.rows, player.level);
  }

  add_tetriminos() {
    let tetrimino = new Tetriminos().randomTetrimino();
    this.tetriminos.push(tetrimino);
  }

  init_players_tetriminos() {
    for (let i = 0; i < 5; i++) {
      this.add_tetriminos();
    }
  }

  freeze_players(player) {
    for (let i = 0; i < this.players.length; i++) {
      if (i != this.isPlayer(this.players, player) && player.smashed > 1) {
        this.players[i].add_line((player.smashed) - 1);
        this.players[i].add_freeze((player.smashed) - 1);
        this.players[i].smashed = 0;
      }
      else if (i == this.isPlayer(this.players, player)) {
        this.players[i].remove_line(player.smashed);
      }
    }
  }

  update_player(player) {
    this.players[this.isPlayer(this.players, player)].add_round();
    this.players[this.isPlayer(this.players, player)].set_spectre(player.spectre);
  }

  update_players_round() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].add_round();
    }
  }

  game_over_player(player) {
    this.players[this.isPlayer(this.players, player)].lose();
  }

  check_tetriminos(player) {
    if (this.players[this.isPlayer(this.players, player)].round >= this.tetriminos.length - 4) {
      return true;
    }
    return false;
  }

  add_player(player) {
    this.players.push(player);
  }

  remove_player(player) {
    let index = this.players.findIndex(p => p.id === player.id);
    if (index > -1) {
      this.players.splice(index, 1);
    }
    if ((player == this.leader)) {
      this.leader = this.players[0];
    }
  }

  start_game() {
    this.running = true;
  }

  end_game() {
    this.running = false;
  }

  check_winner() {
    let win = 0;
    let winner;
    for (var i = 0; i < this.players.length; i++) {
      if (!this.players[i].loser) {
        win += 1;
        winner = this.players[i];
      };
    }
    if (win == 1) {
      return winner;
    }
    else {
      return false;
    }
  }

  reset_game() {
    const new_leader = this.leader.reset_player();
    this.leader = new_leader;
    const new_players = this.players.map(function (p) {
      p = p.reset_player();
      return p;
    });
    this.players = new_players;
    this.tetriminos = [];
  }
}

module.exports = Game;
