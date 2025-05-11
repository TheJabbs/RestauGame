class TimeManager extends Sprite {
    constructor() {
        super();
        this.hours = 23;
        this.minutes = 0;
        this.isTimeUp = false;
        this.timeLimit = 24;
        this.timeElapsed = 0;
    }

    update(sprites, keys) {
        if (!this.isTimeUp) {
            this.timeElapsed += 1;

            if (this.timeElapsed % 100 === 0) {
                this.minutes++;

                if (this.minutes >= 60) {
                    this.minutes = 0;
                    this.hours++;
                }

                if (this.hours >= this.timeLimit) {
                    this.isTimeUp = true;
                }
            }
        }

    }

    reset() {
        this.hours = 8;
        this.minutes = 0;
        this.isTimeUp = false;
        this.timeElapsed = 0;
    }

    getTime() {
        return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}`;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Time: ${this.getTime()}`, 10, 20);
    }
}