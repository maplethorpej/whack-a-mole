"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WhackAMole = function WhackAMole() {
  var _this = this;

  _classCallCheck(this, WhackAMole);

  _defineProperty(this, "initMoles", function () {
    var moles = [];
    [].forEach.call(moleEls, function (moleEl) {
      moles.push(new Mole(moleEl, _this));
    });
    return moles;
  });

  _defineProperty(this, "startTimer", function () {
    _this.timer = setInterval(_this.incrementTime, 100);
  });

  _defineProperty(this, "stopTimer", function () {
    clearInterval(_this.timer);
  });

  _defineProperty(this, "resetTimer", function () {
    _this.stopTimer();

    _this.msElapsed = 0;

    _this.setTimeRemaining();
  });

  _defineProperty(this, "incrementTime", function () {
    _this.msElapsed += 100;

    _this.setTimeRemaining();
  });

  _defineProperty(this, "setTimeRemaining", function () {
    var secondsRemaining = (_this.msTimeLimit - _this.msElapsed) / 1000;
    timerEl.innerText = secondsRemaining.toFixed(2).replace('.', ':');

    if (!secondsRemaining) {
      playBtn.innerText = 'Game Over';

      _this.resetMoles();

      _this.stop();
    }
  });

  _defineProperty(this, "setScore", function () {
    scoreEl.innerText = _this.score;
  });

  _defineProperty(this, "start", function () {
    if (_this.msElapsed === _this.msTimeLimit) {
      return;
    }

    _this.playing = true;

    _this.moles.forEach(function (mole) {
      return mole.startCycle();
    });

    _this.startTimer();
  });

  _defineProperty(this, "stop", function () {
    _this.playing = false;

    _this.moles.forEach(function (mole) {
      return mole.stopCycle();
    });

    _this.stopTimer();
  });

  _defineProperty(this, "resetMoles", function () {
    _this.moles.forEach(function (mole) {
      return mole.reset();
    });
  });

  _defineProperty(this, "reset", function () {
    _this.playing = false;

    _this.resetMoles();

    _this.resetTimer();

    _this.score = 0;

    _this.setScore();

    playBtn.innerText = 'PLAY';
  });

  _defineProperty(this, "addPoint", function () {
    _this.score++;

    _this.setScore();
  });

  this.msElapsed = 0;
  this.msTimeLimit = 15000;
  this.playing = false;
  this.score = 0;
  this.moles = this.initMoles();
  this.setTimeRemaining();
};