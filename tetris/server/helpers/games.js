const Game = require('./game');

class Games {
    constructor() {
        this.games = [];
    }

    add_player_to_game(player, game) {
        game.add_player(player);
    }

    create_game(player, room) {
        let game = new Game(player, room);
        this.games.push(game);
    }

    end_one_game(index) {
        this.games[index].end_game();
    }

    reset_one_game(index) {
        this.games[index].reset_game();
    }

    start_one_game(index) {
        this.games[index].start_game();
        this.games[index].init_players_tetriminos();
        return this.games[index];
    }

    smash_player(index, player) {
        this.games[index].freeze_players(player);
        return this.games[index];
    }

    game_over(index, player) {
        this.games[index].game_over_player(player)
        let winner = this.games[index].check_winner();
        if (winner) {
            winner.win();
        }
        return { curGame: this.games[index], winner: winner }
    }

    collision(index, player) {
        this.games[index].update_player(player);
        const need_refill = this.games[index].check_tetriminos(player);
        if (need_refill) {
            this.games[index].add_tetriminos();
        }
        return { curGame: this.games[index], need_refill }
    }

    player_leaving(index, player) {
        let winner = false;
        let ran = false;
        if (this.games[index] !== undefined) {
            ran = this.games[index].running;
            this.games[index].remove_player(player);
            if (this.games[index].players.length > 0) {
                if (player.id == this.games[index].leader.id) {
                    this.games[index].leader = this.games[index].players[0]
                }
                winner = this.games[index].check_winner();
                if (winner && this.games[index].running === true) {
                    winner.win();
                    this.games[index].end_game();
                }
            }
        }
        return { curGame: this.games[index], winner, ran }
    }
}

module.exports = Games;