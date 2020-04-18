class Player {
	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.spectre = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
		this.round = 0;
		this.freeze = 0;
		this.loser = false;
		this.color = (Math.floor(Math.random() * 255) + 1) + ',' + (Math.floor(Math.random() * 255) + 1) + ',' + (Math.floor(Math.random() * 255) + 1);
		this.rows = 0;
		this.score = 0;
		this.level = 0;
		this.smashed = 0;
	}

	set_score(score, rows, level) {
		this.score = score;
		this.rows = rows;
		this.level = level;
	}

	add_round() {
		this.round += 1;
	}

	add_freeze(n) {
		if (this.freeze + n <= 20)
			this.freeze += n;
		else
			this.freeze = 20;
	}

	set_spectre(spectre) {
		this.spectre = spectre;
	}

	add_line(n) {
		let tmp = this.spectre;
		this.spectre = tmp.map(e => {
			if (e - n >= 0)
				return e - n;
			else
				return 0;
		});
	}

	remove_line(n) {
		let tmp = this.spectre;
		this.spectre = tmp.map(e => {
			if (e + n <= 20)
				return e + n;
			else
				return 20;
		});
	}

	lose() {
		this.loser = true;
	}

	win() {
		this.winner = true
	}

	reset_player() {
		const player = new Player(this.name, this.id);
		return player;
	}
}

module.exports = Player;
