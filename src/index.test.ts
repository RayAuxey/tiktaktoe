import { expect, test } from "bun:test";
import { checkWinner } from "./utils";

test("checkWinner should return 0 for an empty game", () => {
	const game = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
	const winner = checkWinner(game);
	expect(winner).toBe(0);
});

test("checkWinner should return the correct winner for a horizontal win", () => {
	const game = [
		[1, 1, 1],
		[0, 0, 0],
		[0, 0, 0],
	];
	const winner = checkWinner(game);
	expect(winner).toBe(1);
});

test("checkWinner should return the correct winner for a vertical win", () => {
	const game = [
		[2, 0, 0],
		[2, 0, 0],
		[2, 0, 0],
	];
	const winner = checkWinner(game);
	expect(winner).toBe(2);
});

test("checkWinner should return the correct winner for a diagonal win", () => {
	const game = [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
	];
	const winner = checkWinner(game);
	expect(winner).toBe(1);
});

test("checkWinner should return 0 for a tie game", () => {
	const game = [
		[1, 2, 1],
		[1, 2, 2],
		[2, 1, 1],
	];
	const winner = checkWinner(game);
	expect(winner).toBe(0);
});

test("checkWinner center", () => {
	const game = [
		[1, 2, 1],
		[1, 2, 0],
		[2, 2, 1],
	];
	const winner = checkWinner(game);
	expect(winner).toBe(2);
});

test("checkWinner bottom", () => {
	const game = [
		[0, 0, 0],
		[0, 0, 0],
		[2, 2, 2],
	];
	const winner = checkWinner(game);

	expect(winner).toBe(2);
});
