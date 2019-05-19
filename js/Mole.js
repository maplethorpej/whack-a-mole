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
        clearInterval(this.cycle);
    };

    onClick = () => {
        if (!this.game.playing || !this.active) {
            return;
        }
        this.hitAction();
        this.toggleActive();
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