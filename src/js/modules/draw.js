let bug = document.getElementById('bug');
let coin = document.getElementById('coin');
let heart = document.getElementById('heart');
let ship = document.getElementById('spaceship');

function drawCanvas(spaceShip, road) {
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
export { drawCanvas };