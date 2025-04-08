class Station extends Obstacle {
    constructor(x, y, width, height, image, processingTime) {
        super(x, y, width, height, image);
        this.processingTime = processingTime

        this.isActive = false
        this.isBurning = false
        this.timer = processingTime
        this.isReady = false

    }

    update(sprites, keys) {
    }

    draw(ctx) {
        super.draw(ctx);
    }

    interect(hero) {
        if (this.isActive) {
            alert("This station is not ready to be used")
        } else if (this.isBurning && hero.inHand === "extinguisher") {
            alert("You just put the fire down be careful next time")
            this.isBurning = false
        } else if (this.isBurning && hero.inHand !== "extinguisher") {
            alert("You can't use this station, it's burning!")
        }
    }

    isInteractive(hero) {
        return this.x < hero.x + hero.width + 1 &&
            this.x + this.width + 1 > hero.x &&
            this.y < hero.y + hero.height + 1 &&
            this.y + this.height + 1 > hero.y;
    }
}