class Station extends Sprite {
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color

        this.IsBurning = false
        this.IsCollectable = false
        this.IsActive = false

        this.usageTime = usageTime * 100;
        this.usageExtraTime = usageExtraTime * 100;
        this.counter = 0


        this.soundPlayed  = false

    }

    update(sprites, keys) {
        if(this.usageExtraTime !== 0 && !this.soundPlayed && (this.usageTime + this.usageExtraTime) /2 < this.counter){
            const sound = new Audio(Var.Sounds.BURNING)
            sound.play().catch(error => console.error('Error playing sound:', error));
            this.soundPlayed = true
        }

        if (this.usageExtraTime !== 0 && this.usageTime + this.usageExtraTime < this.counter) {
            this.IsBurning = true
            this.IsCollectable = false
        }

        if (this.counter > this.usageTime && !this.IsBurning) {
            this.IsCollectable = true
        }

        if (this.IsActive)
            this.counter++

        return false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        const progressBarHeight = 10;
        const progressRatio = Math.min(this.counter / this.usageTime, 1);
        const progressBarWidth = this.width * progressRatio;
        const progressBarX = this.x; // Same x position as the square
        const progressBarY = this.y + this.height - progressBarHeight;
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.x, progressBarY, this.width, progressBarHeight);

        ctx.fillStyle = '#00ff00';
        ctx.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);
    }

    interact(hero) {
        if (this.IsBurning && hero.toolHeld === Var.Tools.FIRE_EXTINGUISHER) {
            hero.toolHeld = ""
            const sound = new Audio(Var.Sounds.FIRE_EXTINGUISHER)
            sound.play().catch(error => console.error('Error playing sound:', error));
            this.reset()
            return true
        } else if (this.IsBurning && hero.toolHeld !== Var.Tools.FIRE_EXTINGUISHER) {
            {
                alert("You need a fire extinguisher to put out the fire!")
            }
        }
        return false
    }

    reset() {
        this.IsBurning = false
        this.IsCollectable = false
        this.IsActive = false
        this.counter = 0
    }
}