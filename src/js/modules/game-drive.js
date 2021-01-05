import { drawCanvas } from './draw';

let frameId;
let coinCode = 1;
let bugCode = 2;
let liveCode = 3;

let lives = 3;
let score = 0;
let gameSpeed = 600; // ! this parameter is changing in depends of increasing total score

let road = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let spaceShip = 1;

let timeCounter = document.querySelector('#timer');

let timer = 99;

let timerId = setTimeout(function tick() {
	timeCounter.innerHTML = timer;
	timerId = setTimeout(tick, 1000);
	if (timer > 0) {
		timer--;
	} else {
		clearTimeout(timerId);
	}
}, 1000);

function step(callback) {

	setTimeout(() => { // moving road with help of requestAnimationFrame
		if (timer > 0) {
			frameId = requestAnimationFrame(() => step(callback));
		} else {
			console.log('game over');
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

	// console.log(road, spaceShip)
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
	console.log(score)

	drawCanvas(spaceShip, road);
	callback({ score, lives, timer });
}

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
addEventListener("keydown", moveShip);

export { step, moveShip };
