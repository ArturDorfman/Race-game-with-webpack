import '../../node_modules/focus-visible/dist/focus-visible';

import '../scss/main.scss';
import '../index.html';

document.addEventListener('DOMContentLoaded', () => {

	/* functions helpers */
	function restartGame() {
		window.location.reload(true);
	}
	/* ------------------- */

	/* main game letiables */
	let container = document.getElementById('container');

	let registration = container.querySelector('#game-rules-registration');
	let game = container.querySelector('#game');
	let gameResult = container.querySelector('#game-result');

	registration.style.display = 'block';
	game.style.display = 'none';
	gameResult.style.display = 'none';

	let road = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];

	let frameId;

	let spaceShip = 1;
	let coinCode = 1;
	let bugCode = 2;
	let liveCode = 3;

	let bug = document.getElementById('bug');
	let coin = document.getElementById('coin');
	let heart = document.getElementById('heart');
	let ship = document.getElementById('spaceship');
	/* ------------------- */

	/* game settings */
	let timer = 99;
	let lives = 3;
	let score = 0;
	let gameSpeed = 400; // ! this parameter is changing in depends of increasing total score
	/* ------------- */

	/* counters */
	let counters = document.querySelector('.counters');
	let scoreCounter = counters.querySelector('.counters__score-counter');
	let livesCounter = counters.querySelector('.counters__live-counter');
	let timeCounter = counters.querySelector('#timer');
	/* -------- */

	function startGame() {
		registration.style.display = 'none';
		game.style.display = 'block';

		let timerId = setTimeout(function tick() {
			timeCounter.innerHTML = timer;
			timerId = setTimeout(tick, 1000);
			if (timer > 0) {
				timer--;
			} else {
				clearTimeout(timerId);
				game.style.display = 'none';
				gameResult.style.display = 'block';
				results();
				console.log('game over');
			}
		}, 1000);

		function moveShip(e) {
			switch (e.keyCode) {
				case 38:   // if press up
					if (spaceShip !== 0) spaceShip -= 1;
					break;
				case 40:   // if press down
					if (spaceShip !== road.length - 1) spaceShip += 1;
					break;
			}
		}

		function drawCanvas() {
			let canvas = document.getElementById('playground');
			let ctx = canvas.getContext('2d');

			// canvas letiebles
			const maxWidthVal = canvas.getBoundingClientRect().width;
			const maxHeightVal = canvas.getBoundingClientRect().height;

			const cellsCounter = 10;
			const roadLines = 3;

			const startSecondLineYPos = maxHeightVal / roadLines;
			const startThirdLineYPos = (maxHeightVal / roadLines) + startSecondLineYPos;

			const cellWidth = maxWidthVal / cellsCounter;
			const cellHeight = maxHeightVal / roadLines;

			ctx.clearRect(0, 0, maxWidthVal, maxHeightVal);

			// up playground border
			ctx.restore();
			ctx.beginPath();
			ctx.strokeStyle = 'yellow';
			ctx.lineWidth = '10';
			ctx.moveTo(0, 0);
			ctx.lineTo(maxWidthVal, 0);
			ctx.stroke();
			ctx.save();

			// down playground border
			ctx.beginPath();
			ctx.strokeStyle = 'yellow';
			ctx.lineWidth = '10';
			ctx.moveTo(0, maxHeightVal);
			ctx.lineTo(maxWidthVal, maxHeightVal);
			ctx.stroke();

			// first road's line
			ctx.beginPath();
			ctx.strokeStyle = 'white'
			ctx.lineWidth = '2';
			ctx.setLineDash([20, 15]);
			ctx.moveTo(0, startSecondLineYPos);
			ctx.lineTo(maxWidthVal, startSecondLineYPos);
			ctx.stroke();

			// second road's line
			ctx.beginPath();
			ctx.strokeStyle = 'white';
			ctx.lineWidth = '2';
			ctx.setLineDash([20, 15]);
			ctx.moveTo(0, startThirdLineYPos);
			ctx.lineTo(maxWidthVal, startThirdLineYPos);
			ctx.stroke();

			// ! game objects
			for (let i = 0; i < roadLines; i++) {
				let roadLine = i;
				for (let j = 0; j < cellsCounter; j++) {

					let cellVal = road[i][j];

					if (cellVal) {

						switch (cellVal) {
							case 1:
								ctx.drawImage(coin, j * cellWidth, roadLine * cellHeight, 100, 100);
								break;
							case 2:
								ctx.drawImage(bug, j * cellWidth, roadLine * cellHeight, 100, 100);
								break;
							case 3:
								ctx.drawImage(heart, j * cellWidth, roadLine * cellHeight, 100, 100);
								break;
						}
					}

				}
			}

			// ! space ship
			ctx.drawImage(ship, 0, (spaceShip * cellHeight), 100, 100);
		}


		function step() {
			setTimeout(() => { // moving road with help of requestAnimationFrame
				if (timer > 0) {
					frameId = requestAnimationFrame(step);
				} else {
					cancelAnimationFrame(frameId);
				}
			}, gameSpeed);


			const buffer = [];

			for (let i = 0; i < road.length; i++) {
				const roadLine = road[i];
				roadLine.shift();
				let gameObjValue = 0;
				let randomValue = Math.random();

				switch (true) {
					case (randomValue < 0.05):
						gameObjValue = liveCode;
						break;
					case (randomValue >= 0.05 && randomValue < 0.2):
						gameObjValue = coinCode;
						break;
					case (randomValue >= 0.2 && randomValue < 0.3):
						gameObjValue = bugCode;
						break;
				}
				roadLine.push(gameObjValue);
				buffer.push(gameObjValue);
			}

			if (buffer.every((value) => value === 1)) {
				buffer.splice(-1, 1, 0);
			} else if (buffer.every((value) => value === 2)) {
				buffer.splice(0, 3, 0, 0, 0);
			} else if (buffer.every((value) => value === 3)) {
				buffer.splice(0, 2, 0, 0);
			}

			let currentCell = road[spaceShip][0];
			switch (currentCell) {
				case coinCode:
					if (score === 50) {
						gameSpeed -= 50;
					} else if (score === 100) {
						gameSpeed -= 100;
					} else {
						score = score + 5;
					}

					break;
				case bugCode:
					lives = lives - 1;
					if (lives === 0) {
						timer = 0;
					}
					break;
				case liveCode:
					if (lives >= 3) {
						score = score + 10;
					} else {
						lives = lives + 1;
					}
					break;
			}

			scoreCounter.innerHTML = score;
			livesCounter.innerHTML = lives;

			drawCanvas();
		}
		step();

		function movingRoad() { // moving road with help of recursive setTimeout
			let timerId2 = setTimeout(function tick2() {
				timerId2 = setTimeout(tick2, gameSpeed);

				if (timer > 0) {
					step();
				} else {
					clearTimeout(timerId2);
				}
			}, gameSpeed);
		}

		addEventListener("keydown", moveShip);
	}

	/*------------------- result -------------------------------*/
	let userName = registration.querySelector('#registration-name');

	function results() {
		let resultYourScore = gameResult.querySelector('#result-score');
		let resultUserName = gameResult.querySelector('#result-username');

		resultYourScore.innerHTML = resultYourScore.innerHTML + ' ' + scoreCounter.innerHTML;
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
