import { Elysia } from "elysia";
import { checkWinner } from "./utils";

const game = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

let currentPlayer = 1;

function play(x: number, y: number) {
	if (game[x][y] === 0) {
		game[x][y] = currentPlayer;
		currentPlayer = currentPlayer === 1 ? 2 : 1;
	}
}

function renderHTML() {
	let html = "<table id='game'>";
	for (let i = 0; i < 3; i++) {
		html += "<tr>";
		for (let j = 0; j < 3; j++) {
			html += `<td hx-target="#game" hx-get="play/${i}/${j}">${
				game[i][j] === 0 ? "" : game[i][j] === 1 ? "X" : "O"
			}</td>`;
		}
		html += "</tr>";
	}
	html += "</table>";
	return html;
}

const app = new Elysia()
	.get("/", Bun.file("public/index.html"))
	.get("/hello", () => {
		return `
  <div>Hello World!</div>
  `;
	})
	.get("/game", () => {
		return renderHTML();
	})
	.get("/play/:x/:y", ({ params: { x, y } }) => {
		play(parseInt(x), parseInt(y));
		const winner = checkWinner(game);
		if (winner) {
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					game[i][j] = 0;
				}
			}
			return `<div hx-get="/game">Player ${winner} wins!</div>`;
		}
		let tie = true;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (game[i][j] !== 0) {
					tie = false;
				}
			}
		}
		if (tie) {
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					game[i][j] = 0;
				}
			}
			return `<div hx-get="/game" >Tie!</div>`;
		}

		return renderHTML();
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
