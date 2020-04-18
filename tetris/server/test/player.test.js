const Player = require('../helpers/player');

describe('Player class is made to represent a player, store its name and socket id', () => {
    let player;
    beforeEach(() => { player = new Player('name', 42); });

    it('should update player with given values', () => {
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        });
    });

    it('should increment player round', () => {
        player.add_round();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 1,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        });
    });

    it('should set score to player', () => {
        player.set_score(3, 2, 1);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 1,
            rows: 2,
            score: 3,
            smashed: 0,
            spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        });
    });

    it('should set spectre of player', () => {
        player.set_spectre([1, 2, 1, 1, 1, 1, 1, 1, 1, 1]);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [1, 2, 1, 1, 1, 1, 1, 1, 1, 1]
        });
    });

    it('should add 1 line to player', () => {
        player.set_spectre([20, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
        player.add_line(1);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [19, 19, 19, 19, 19, 19, 19, 19, 19, 19]
        });
    });

    it('should add 2 lines to player', () => {
        player.set_spectre([20, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
        player.add_line(2);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
        });
    });

    it('should cap n lines to player', () => {
        player.set_spectre([20, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
        player.add_line(45);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        });
    });

    it('should remove 1 line to player', () => {
        player.set_spectre([15, 15, 15, 15, 15, 15, 15, 15, 15, 15]);
        player.remove_line(1);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
        });
    });

    it('should remove 2 lines to player', () => {
        player.set_spectre([19, 19, 19, 19, 19, 19, 19, 19, 19, 19]);
        player.remove_line(2);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        });
    });

    it('should be a loser', () => {
        player.lose();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: true,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        });
    });

    it('freeze should not go over 20', () => {
        player.freeze = 21;
        player.add_freeze(1);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 20,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        });
    });

    it('should freeze 1 line to player', () => {
        player.add_freeze(1);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 1,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        });
    });

    it('should become a winner', () => {
        player.win();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            winner: true,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        });
    });

    it('should reset a player', () => {
        player.win();
        player.add_round();
        player.add_freeze(1);
        const newPlayer = player.reset_player();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 1,
            loser: false,
            color: player.color,
            freeze: 1,
            winner: true,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        });
        expect(newPlayer).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: newPlayer.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            smashed: 0,
            spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        });
    });
});
