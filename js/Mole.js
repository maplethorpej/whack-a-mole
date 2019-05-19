"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Mole = function Mole(el, game) {
  var _this = this;

  _classCallCheck(this, Mole);

  _defineProperty(this, "startCycle", function () {
    _this.cycle = setInterval(_this.toggleActive, _this.randomInterval());
  });

  _defineProperty(this, "stopCycle", function () {
    clearInterval(_this.cycle);
  });

  _defineProperty(this, "onClick", function () {
    if (!_this.game.playing || !_this.active) {
      return;
    }

    _this.hitAction();

    _this.toggleActive();

    _this.game.addPoint();
  });

  _defineProperty(this, "hitAction", function () {
    _this.el.classList.add('hit');

    setTimeout(function () {
      _this.el.classList.remove('hit');
    }, 250);
    bodyEl.classList.add('hit');
    setTimeout(function () {
      bodyEl.classList.remove('hit');
    }, 125);
  });

  _defineProperty(this, "toggleActive", function () {
    if (_this.active) {
      _this.el.classList.remove('shown');
    } else {
      _this.el.classList.add('shown');
    }

    _this.active = !_this.active;

    _this.stopCycle();

    _this.startCycle();
  });

  _defineProperty(this, "randomInterval", function () {
    var max = _this.active ? 1 : 3;
    var min = _this.active ? .5 : 1;
    return Math.round((Math.random() * (max - min + 1) + min) * 1000);
  });

  _defineProperty(this, "reset", function () {
    _this.active = false;

    _this.stopCycle();

    _this.el.classList.remove('shown');
  });

  this.el = el;
  this.active = false;
  this.game = game;
  el.onclick = this.onClick;
};