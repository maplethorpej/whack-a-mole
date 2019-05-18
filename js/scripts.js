// TODO
// - add game timer
// - output time remaining
// - add onclick feedback style
// - add more moles
// - stylize buttons/moles
// - check IE 11 functionality
// - accessibility checklist
// - mobile

class WhackAMole {
    constructor() {
        this.time = 0;
        this.playing = false;
        this.score = 0;
        this.moles = this.initMoles();
    }

    initMoles = () => {
        const moleEls = document.getElementsByClassName('mole');
        let moles = [];
        [].forEach.call(moleEls, (moleEl) => {
            moles.push(new Mole(moleEl, this));
        });
        return moles;
    };

    start = () => {
        this.playing = true;
        this.moles.forEach(mole => mole.startCycle());
    };

    stop = () => {
        this.playing = false;
        this.moles.forEach(mole => mole.stopCycle());
    };

    reset = () => {
        this.playing = false;
        this.moles.forEach(mole => mole.reset());
    };

    addPoint = () => {
        this.score++;
        document.getElementById('score').innerText = this.score;
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
        this.el.classList.remove('shown');
    }
}