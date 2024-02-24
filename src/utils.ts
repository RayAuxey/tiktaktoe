export function checkWinner(game: number[][]) {
	// check for horizontal and vertical wins
	for (let i = 0; i < game.length; i++) {
		// check for horizontal wins
		if (game[i][0] === game[i][1] && game[i][1] === game[i][2]) {
			if (game[i][0] === 0) {
				continue;
			}
			return game[i][0];
		}

		// check for vertical wins
		if (game[0][i] === game[1][i] && game[1][i] === game[2][i]) {
			if (game[0][i] === 0) {
				continue;
			}
			return game[0][i];
		}
	}

	// check for diagonal wins
	if (game[0][0] === game[1][1] && game[1][1] === game[2][2]) {
		return game[0][0];
	}
	if (game[0][2] === game[1][1] && game[1][1] === game[2][0]) {
		return game[0][2];
	}
	return 0;
}
