/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! focus-visible */ "../node_modules/focus-visible/dist/focus-visible.js");
/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(focus_visible__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/main.scss */ "./scss/main.scss");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index.html */ "./index.html");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_html__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_game_drive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/game-drive */ "./js/modules/game-drive.js");




document.addEventListener('DOMContentLoaded', function () {
  /* functions helpers */
  function restartGame() {
    window.location.reload(true);
  }
  /* ------------------- */


  var container = document.querySelector('.site-container');
  var registration = container.querySelector('#game-registration');
  var game = container.querySelector('#game');
  var gameResult = container.querySelector('#game-result');
  registration.style.display = 'block';
  game.style.display = 'none';
  gameResult.style.display = 'none';
  /* counters */

  var counters = document.querySelector('.counters');
  var scoreCounter = counters.querySelector('.counters__score-counter');
  var livesCounter = document.querySelector('.counters__live-counter');
  /* -------- */

  function startGame() {
    registration.style.display = 'none';
    game.style.display = 'block';
    (0,_modules_game_drive__WEBPACK_IMPORTED_MODULE_3__.step)(function (_ref) {
      var score = _ref.score,
          lives = _ref.lives,
          timer = _ref.timer;
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


  var userName = registration.querySelector('#registration-name');

  function results(score) {
    var resultYourScore = gameResult.querySelector('#result-score');
    var resultUserName = gameResult.querySelector('#result-username');
    resultYourScore.innerHTML = resultYourScore.innerHTML + ' ' + score;
    resultUserName.innerHTML = resultUserName.innerHTML + ' ' + userName.value;
    game.style.display = 'none';
    gameResult.style.display = 'block';
  }
  /* global object */


  window.game = {
    startGame: startGame,
    restartGame: restartGame
  };
});

/***/ }),

/***/ "./js/modules/draw.js":
/*!****************************!*\
  !*** ./js/modules/draw.js ***!
  \****************************/
/*! namespace exports */
/*! export drawCanvas [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawCanvas": () => /* binding */ drawCanvas
/* harmony export */ });
var bug = document.getElementById('bug');
var coin = document.getElementById('coin');
var heart = document.getElementById('heart');
var ship = document.getElementById('spaceship');

function drawCanvas(spaceShip, road) {
  var canvas = document.getElementById('playground');
  var ctx = canvas.getContext('2d'); // canvas letiebles

  var maxWidthVal = canvas.getBoundingClientRect().width;
  var maxHeightVal = canvas.getBoundingClientRect().height;
  var cellsCounter = 10;
  var roadLines = 3;
  var startSecondLineYPos = maxHeightVal / roadLines;
  var startThirdLineYPos = maxHeightVal / roadLines + startSecondLineYPos;
  var cellWidth = maxWidthVal / cellsCounter;
  var cellHeight = maxHeightVal / roadLines;
  ctx.clearRect(0, 0, maxWidthVal, maxHeightVal); // up playground border

  ctx.restore();
  ctx.beginPath();
  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = '10';
  ctx.moveTo(0, 0);
  ctx.lineTo(maxWidthVal, 0);
  ctx.stroke();
  ctx.save(); // down playground border

  ctx.beginPath();
  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = '10';
  ctx.moveTo(0, maxHeightVal);
  ctx.lineTo(maxWidthVal, maxHeightVal);
  ctx.stroke(); // first road's line

  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = '2';
  ctx.setLineDash([20, 15]);
  ctx.moveTo(0, startSecondLineYPos);
  ctx.lineTo(maxWidthVal, startSecondLineYPos);
  ctx.stroke(); // second road's line

  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = '2';
  ctx.setLineDash([20, 15]);
  ctx.moveTo(0, startThirdLineYPos);
  ctx.lineTo(maxWidthVal, startThirdLineYPos);
  ctx.stroke(); // ! game objects

  for (var i = 0; i < roadLines; i++) {
    var roadLine = i;

    for (var j = 0; j < cellsCounter; j++) {
      var cellVal = road[i][j];

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
  } // ! space ship


  ctx.drawImage(ship, 0, spaceShip * cellHeight, 100, 100);
}



/***/ }),

/***/ "./js/modules/game-drive.js":
/*!**********************************!*\
  !*** ./js/modules/game-drive.js ***!
  \**********************************/
/*! namespace exports */
/*! export moveShip [provided] [no usage info] [missing usage info prevents renaming] */
/*! export step [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "step": () => /* binding */ step,
/* harmony export */   "moveShip": () => /* binding */ moveShip
/* harmony export */ });
/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draw */ "./js/modules/draw.js");

var frameId;
var coinCode = 1;
var bugCode = 2;
var liveCode = 3;
var lives = 3;
var score = 0;
var gameSpeed = 600; // ! this parameter is changing in depends of increasing total score

var road = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var spaceShip = 1;
var timeCounter = document.querySelector('#timer');
var timer = 99;
var timerId = setTimeout(function tick() {
  timeCounter.innerHTML = timer;
  timerId = setTimeout(tick, 1000);

  if (timer > 0) {
    timer--;
  } else {
    clearTimeout(timerId);
  }
}, 1000);

function step(callback) {
  setTimeout(function () {
    // moving road with help of requestAnimationFrame
    if (timer > 0) {
      frameId = requestAnimationFrame(function () {
        return step(callback);
      });
    } else {
      console.log('game over');
      cancelAnimationFrame(frameId);
    }
  }, gameSpeed);
  var buffer = [];

  for (var i = 0; i < road.length; i++) {
    var roadLine = road[i];
    roadLine.shift();
    var gameObjValue = 0;
    var randomValue = Math.random();

    switch (true) {
      case randomValue < 0.05:
        gameObjValue = liveCode;
        break;

      case randomValue >= 0.05 && randomValue < 0.2:
        gameObjValue = coinCode;
        break;

      case randomValue >= 0.2 && randomValue < 0.3:
        gameObjValue = bugCode;
        break;
    }

    roadLine.push(gameObjValue);
    buffer.push(gameObjValue);
  }

  if (buffer.every(function (value) {
    return value === 1;
  })) {
    buffer.splice(-1, 1, 0);
  } else if (buffer.every(function (value) {
    return value === 2;
  })) {
    buffer.splice(0, 3, 0, 0, 0);
  } else if (buffer.every(function (value) {
    return value === 3;
  })) {
    buffer.splice(0, 2, 0, 0);
  } // console.log(road, spaceShip)


  var currentCell = road[spaceShip][0];

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

  console.log(score);
  (0,_draw__WEBPACK_IMPORTED_MODULE_0__.drawCanvas)(spaceShip, road);
  callback({
    score: score,
    lives: lives,
    timer: timer
  });
}

function moveShip(e) {
  switch (e.keyCode) {
    case 38:
      // if press up
      if (spaceShip !== 0) spaceShip -= 1;
      break;

    case 40:
      // if press down
      if (spaceShip !== road.length - 1) spaceShip += 1;
      break;
  }
}

addEventListener("keydown", moveShip);


/***/ }),

/***/ "./images/icons/bug.png":
/*!******************************!*\
  !*** ./images/icons/bug.png ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.p, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "./img/bug.png");

/***/ }),

/***/ "./images/icons/coin.svg":
/*!*******************************!*\
  !*** ./images/icons/coin.svg ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.p, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "./img/coin.svg");

/***/ }),

/***/ "./images/icons/heart.svg":
/*!********************************!*\
  !*** ./images/icons/heart.svg ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.p, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "./img/heart.svg");

/***/ }),

/***/ "./images/icons/spaceship.png":
/*!************************************!*\
  !*** ./images/icons/spaceship.png ***!
  \************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.p, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "./img/spaceship.png");

/***/ }),

/***/ "./images/registration-bg.jpg":
/*!************************************!*\
  !*** ./images/registration-bg.jpg ***!
  \************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.p, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "./img/registration-bg.jpg");

/***/ }),

/***/ "./images/result-bg.jpg":
/*!******************************!*\
  !*** ./images/result-bg.jpg ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.p, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "./img/result-bg.jpg");

/***/ }),

/***/ "./index.html":
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 18:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "../node_modules/html-loader/dist/runtime/getUrl.js");
var ___HTML_LOADER_IMPORT_0___ = __webpack_require__(/*! ./images/registration-bg.jpg */ "./images/registration-bg.jpg");
var ___HTML_LOADER_IMPORT_1___ = __webpack_require__(/*! ./images/icons/bug.png */ "./images/icons/bug.png");
var ___HTML_LOADER_IMPORT_2___ = __webpack_require__(/*! ./images/icons/coin.svg */ "./images/icons/coin.svg");
var ___HTML_LOADER_IMPORT_3___ = __webpack_require__(/*! ./images/icons/heart.svg */ "./images/icons/heart.svg");
var ___HTML_LOADER_IMPORT_4___ = __webpack_require__(/*! ./images/icons/spaceship.png */ "./images/icons/spaceship.png");
var ___HTML_LOADER_IMPORT_5___ = __webpack_require__(/*! ./images/result-bg.jpg */ "./images/result-bg.jpg");
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_4___);
var ___HTML_LOADER_REPLACEMENT_5___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_5___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"UTF-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t<title>Webpack training</title>\n</head>\n\n<body>\n\t<div class=\"site-container\">\n\n\t\t<div id=\"game-registration\">\n\t\t\t<img class=\"background\" src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"background\">\n\t\t\t<div class=\"rules\">\n\t\t\t\t<p class=\"rules__title\">Space race <br> The Game.</p>\n\t\t\t\t<p class=\"rules__rules-info\">You'll get 99 seconds for game.\n\t\t\t\t\tIn game you have star ship, collect coins and hearts, and fly away from space bugs. One coin gives you 5\n\t\t\t\t\tpoints, extra hearts gives you 10 points. If you get collision with bug, it takes 1 life.\n\t\t\t\t\tGood luck and have fun! </p>\n\t\t\t\t<form class=\"registration\" onsubmit=\"game.startGame(); return false\">\n\t\t\t\t\t<label for=\"name\"> Your name:</label>\n\t\t\t\t\t<input type=\"text\" value=\"\" name=\"name\" id=\"registration-name\" required>\n\t\t\t\t\t<button type=\"submit\" id=\"registration-button\">Start the game!</button>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div id=\"game\">\n\t\t\t<header class=\"header\">\n\t\t\t\t<div class=\"counters\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<span>Time: </span>\n\t\t\t\t\t\t<span class=\"counters__time-counter\" id=\"timer\"></span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<span>Lives: </span>\n\t\t\t\t\t\t<span class=\"counters__live-counter\"></span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<span>Score: </span>\n\t\t\t\t\t\t<span class=\"counters__score-counter\"></span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</header>\n\n\t\t\t<div class=\"content\">\n\t\t\t\t<canvas id=\"playground\" width=\"1920\" height=\"300\"></canvas>\n\t\t\t\t<div style=\"display:none;\">\n\t\t\t\t\t<img id=\"bug\" src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\">\n\t\t\t\t\t<img id=\"coin\" src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\">\n\t\t\t\t\t<img id=\"heart\" src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\">\n\t\t\t\t\t<img id=\"spaceship\" src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div id=\"game-result\">\n\t\t\t<img class=\"background\" src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\" alt=\"background\">\n\t\t\t<div class=\"result\">\n\t\t\t\t<p class=\"result__title\" id=\"result-username\">Your name:</p>\n\t\t\t\t<p class=\"result__item\" id=\"result-score\">Your score:</p>\n\n\t\t\t\t<button class=\"result__button\" type=\"button\" id=\"restar-button\" onclick=\"game.restartGame()\">Restart it\n\t\t\t\t\tnow!</button>\n\t\t\t\t<button class=\"result__button\" type=\"submit\" id=\"end-game\">End game</button>\n\t\t\t</div>\n\t\t</div>\n\n</body>\n\n</html>";
// Exports
module.exports = code;

/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./js/index.js","vendors-node_modules_focus-visible_dist_focus-visible_js-node_modules_html-loader_dist_runtim-b0975e"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = () => {
/******/ 		
/******/ 		};
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = () => {
/******/ 		
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = () => {
/******/ 		
/******/ 			}
/******/ 			chunkLoadingGlobal = chunkLoadingGlobal.slice();
/******/ 			for(var i = 0; i < chunkLoadingGlobal.length; i++) webpackJsonpCallback(chunkLoadingGlobal[i]);
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=main.js.map