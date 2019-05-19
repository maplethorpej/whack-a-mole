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
        timerEl.innerText = secondsRemaining.toFixed(2).replace('.', ':');

        if (!secondsRemaining) {
            playBtn.innerText = 'Game Over';
            this.resetMoles();
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

    resetMoles = () => {
        this.moles.forEach(mole => mole.reset());
    };

    reset = () => {
        this.playing = false;
        this.resetMoles();
        this.resetTimer();
        this.score = 0;
        this.setScore();
        playBtn.innerText = 'PLAY';
    };

    addPoint = () => {
        this.score++;
        this.setScore();
    };
}