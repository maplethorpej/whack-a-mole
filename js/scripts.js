// TODO
// - add more moles
// - stylize buttons/moles
// - check IE 11 functionality
// - accessibility checklist
// - mobile

const bodyEl = document.getElementsByTagName('body')[0];
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('time-elapsed');
const moleEls = document.getElementsByClassName('mole');
const playBtn = document.getElementById('play-pause');
const resetBtn = document.getElementById('reset');

class WhackAMole {
    constructor() {
        this.msElapsed = 0;
        this.msTimeLimit = 15000;
        this.playing = false;
        this.score = 0;
        this.moles = this.initMoles();
        this.setTimeRemaining();
    }

    initMoles = () => {
        let moles = [];
        [].forEach.call(moleEls, (moleEl) => {
            moles.push(new Mole(moleEl, this));
        });
        return moles;
    };

    startTimer = () => {
        this.timer = setInterval(this.incrementTime, 100);
    };

    stopTimer = () => {
        clearInterval(this.timer);
    };

    resetTimer = () => {
        this.stopTimer();
        this.msElapsed = 0;
        this.setTimeRemaining();
    };

    incrementTime = () => {
        this.msElapsed += 100;
        this.setTimeRemaining();
    };

    setTimeRemaining = () => {
        const secondsRemaining = (this.msTimeLimit - this.msElapsed) / 1000;
        timerEl.innerText = secondsRemaining.toFixed(2) + ' seconds remaining';

        if (!secondsRemaining) {
            playBtn.innerText = 'Game Over';
            this.stop();
        }
    };

    setScore = () => {
        scoreEl.innerText = this.score;
    };

    start = () => {
        if (this.msElapsed === this.msTimeLimit) {
            return;
        }
        this.playing = true;
        this.moles.forEach(mole => mole.startCycle());
        this.startTimer();
    };

    stop = () => {
        this.playing = false;
        this.moles.forEach(mole => mole.stopCycle());
        this.stopTimer();
    };

    reset = () => {
        this.playing = false;
        this.moles.forEach(mole => mole.reset());
        this.resetTimer();
        this.score = 0;
        this.setScore();
        playBtn.innerText = 'Play';
    };

    addPoint = () => {
        this.score++;
        this.setScore();
    };
}

class Mole {
    constructor(el, game) {
        this.el = el;
        this.active = false;
        this.game = game;
        el.onclick = this.onClick;
    }

    startCycle = () => {
        this.cycle = setInterval(this.toggleActive, this.randomInterval());
    };

    stopCycle = () => {
        clearInterval(this.cycle)
    };

    onClick = (e) => {
        if (!this.game.playing) {
            return;
        }
        this.hitAction();
        this.toggleActive(this.active);
        this.game.addPoint();
    };

    hitAction = () => {
        this.el.classList.add('hit');
        setTimeout(() => {
            this.el.classList.remove('hit');
        }, 250);

        bodyEl.classList.add('hit');
        setTimeout(() => {
            bodyEl.classList.remove('hit');
        }, 125);
    };

    toggleActive = (active) => {
        if (active) {
            this.el.classList.remove('shown');
        } else {
            this.el.classList.add('shown');
        }
        this.active = !active;
        this.stopCycle();
        this.startCycle();
    };

    randomInterval = () => {
        const max = this.active ? 1 : 3;
        const min = this.active ? .5 : 1;
        return Math.round((Math.random() * (max - min + 1) + min) * 1000);
    };

    reset = () => {
        this.active = false;
        this.stopCycle();
        this.el.classList.remove('shown');
    }
}