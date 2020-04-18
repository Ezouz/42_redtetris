const Game = require("../helpers/game");
const Player = require("../helpers/player");
const Games = require("../helpers/games");

describe('Games is dealing with games from sockets', () => {
    let player1;
    let player2;
    let player3;
    let games;

    beforeEach(() => {
        player1 = new Player('p1', 'a');
        player2 = new Player('p2', 'b');
        player2.player = { pos: { y: 15 } };
        player3 = new Player('p3', 'c');
        player3.player = { pos: { y: 1 } };
        games = new Games();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('New game should be created with first player', () => {
        games.create_game(player1, '42');
        expect(games.games).toHaveLength(1);
    });

    it('Player should be added o the game', () => {
        games.create_game(player1, '42');
        games.add_player_to_game(player2, games.games[0]);
        expect(games.games[0].players).toHaveLength(2);
    });

    it('Specific game should be ended', () => {
        const spy = jest.spyOn(Game.prototype, 'end_game');
        games.create_game(player1, '42');
        games.end_one_game(0);
        expect(spy).toHaveBeenCalled();
        expect(games.games[0].running).toBe(false);
    });

    it('Specific game should be reseted', () => {
        const spy = jest.spyOn(Game.prototype, 'reset_game');
        games.create_game(player1, '42');
        games.reset_one_game(0);
        expect(spy).toHaveBeenCalled();
        expect(games.games[0].running).toBe(false);
        expect(games.games[0].tetriminos).toHaveLength(0);
        expect(games.games[0].players).toHaveLength(1);
    });


    it('Specific game should be start', () => {
        const spy1 = jest.spyOn(Game.prototype, 'start_game');
        const spy2 = jest.spyOn(Game.prototype, 'init_players_tetriminos');
        games.create_game(player1, '42');
        games.start_one_game(0);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        expect(games.games[0].running).toBe(true);
        expect(games.games[0].tetriminos).toHaveLength(5);
    });

    it('Specific game should be freezed for player', () => {
        const spy = jest.spyOn(Game.prototype, 'freeze_players');
        games.create_game(player1, '42');
        games.smash_player(0, player1);
        expect(spy).toHaveBeenCalled();
    });

    it('Game_over should update player andcheck for winner', () => {
        const spy1 = jest.spyOn(Game.prototype, 'game_over_player');
        const spy2 = jest.spyOn(Game.prototype, 'check_winner');
        const spy3 = jest.spyOn(Player.prototype, 'win');
        games.create_game(player1, '42');
        games.add_player_to_game(player2, games.games[0]);
        games.add_player_to_game(player3, games.games[0]);
        games.game_over(0, player1);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        expect(spy3).not.toHaveBeenCalled();
        games.game_over(0, player2);
        expect(spy3).toHaveBeenCalled();
    });

    it('Check collision', () => {
        const spy1 = jest.spyOn(Game.prototype, 'update_player');
        const spy2 = jest.spyOn(Game.prototype, 'check_tetriminos');
        const spy3 = jest.spyOn(Game.prototype, 'add_tetriminos');
        games.create_game(player3, '42');
        player3.round = -10;
        games.collision(0, player3);
        expect(spy3).not.toHaveBeenCalled();
        player3.round = 5;
        games.collision(0, player3);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        expect(spy3).toHaveBeenCalled();
    });

    it('Disconnect should remove player and check for winner', () => {
        const spy1 = jest.spyOn(Game.prototype, 'remove_player');
        const spy2 = jest.spyOn(Game.prototype, 'check_winner');
        const spy3 = jest.spyOn(Player.prototype, 'win');
        const spy4 = jest.spyOn(Game.prototype, 'end_game');
        games.create_game(player1, '42');
        games.start_one_game(0);
        games.add_player_to_game(player2, games.games[0]);
        games.add_player_to_game(player3, games.games[0]);
        games.player_leaving(0, player1);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        expect(spy3).not.toHaveBeenCalled();
        expect(spy4).not.toHaveBeenCalled();
        games.player_leaving(0, player2);
        expect(spy3).toHaveBeenCalled();
        expect(spy4).toHaveBeenCalled();
    });

    it('Disconnect last player', () => {
        const spy1 = jest.spyOn(Game.prototype, 'remove_player');
        const spy2 = jest.spyOn(Game.prototype, 'check_winner');
        const spy3 = jest.spyOn(Player.prototype, 'win');
        const spy4 = jest.spyOn(Game.prototype, 'end_game');
        games.create_game(player1, '42');
        games.start_one_game(0);
        games.player_leaving(0, player1);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
        expect(spy3).not.toHaveBeenCalled();
        expect(spy4).not.toHaveBeenCalled();
    });

    it('Disconnect undefined game', () => {
        const spy1 = jest.spyOn(Game.prototype, 'remove_player');
        const spy2 = jest.spyOn(Game.prototype, 'check_winner');
        const spy3 = jest.spyOn(Player.prototype, 'win');
        const spy4 = jest.spyOn(Game.prototype, 'end_game');
        games.create_game(player1, '42');
        games.start_one_game(0);
        games.player_leaving(1, player1);
        expect(spy1).not.toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
        expect(spy3).not.toHaveBeenCalled();
        expect(spy4).not.toHaveBeenCalled();
    });
});