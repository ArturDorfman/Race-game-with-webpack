import 'focus-visible';

import '../scss/main.scss';
import '../index.html';

import { step } from './modules/game-drive';

document.addEventListener('DOMContentLoaded', function () {

	/* functions helpers */
	function restartGame() {
		window.location.reload(true);
	}
	/* ------------------- */

	let container = document.querySelector('.site-container');

	let registration = container.querySelector('#game-registration');
	let game = container.querySelector('#game');
	let gameResult = container.querySelector('#game-result');

	registration.style.display = 'block';
	game.style.display = 'none';
	gameResult.style.display = 'none';


	/* counters */
	let counters = document.querySelector('.counters');
	let scoreCounter = counters.querySelector('.counters__score-counter');
	let livesCounter = document.querySelector('.counters__live-counter');
	/* -------- */

	function startGame() {
		registration.style.display = 'none';
		game.style.display = 'block';

		step(({ score, lives, timer }) => {
			scoreCounter.innerHTML = score;
			livesCounter.innerHTML = lives;

			if (timer <= 0) {
				game.style.display = 'none';
				gameResult.style.display = 'block';
				results(score);
			}
		});
	}

	/*------------------- result -------------------------------*/
	let userName = registration.querySelector('#registration-name');

	function results(score) {
		let resultYourScore = gameResult.querySelector('#result-score');
		let resultUserName = gameResult.querySelector('#result-username');

		resultYourScore.innerHTML = resultYourScore.innerHTML + ' ' + score;
		resultUserName.innerHTML = resultUserName.innerHTML + ' ' + userName.value;

		game.style.display = 'none';
		gameResult.style.display = 'block';
	}

	/* global object */
	window.game = {
		startGame: startGame,
		restartGame: restartGame,
	}
});
