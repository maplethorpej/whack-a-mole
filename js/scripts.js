// TODO
// - add game timer
// - output time remaining
// - add onclick feedback style
// - add more moles
// - stylize buttons/moles
// - check IE 11 functionality
// - accessibility checklist
// - mobile

const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('time-elapsed');
const moleEls = document.getElementsByClassName('mole');

class WhackAMole {
    constructor() {
        this.msElapsed = 0;
        this.playing = false;
        this.score = 0;
        this.moles = this.initMoles();
    }

    initMoles = () => {
        let moles = [];
        [].forEach.call(moleEls, (moleEl) => {
            moles.push(new Mole(moleEl, this));
        });
        return moles;
    };

    startTimer = () => {
        this.timer = setInterval(this.incrementTime, 100)
    };

    stopTimer = () => {
        clearInterval(this.timer);
    };

    resetTimer = () => {
        this.stopTimer();
        this.msElapsed = 0;
        this.setTimeElapsed();
    };

    incrementTime = () => {
        this.msElapsed += 100;
        this.setTimeElapsed();
    };

    setTimeElapsed = () => {
        timerEl.innerText = this.msElapsed;
    };

    setScore = () => {
        scoreEl.innerText = this.score;
    };

    start = () => {
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
        this.toggleActive();
        this.game.addPoint();
    };

    toggleActive = () => {
        if (this.active) {
            this.el.classList.remove('shown');
        } else {
            this.el.classList.add('shown');
        }
        this.active = !this.active;
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