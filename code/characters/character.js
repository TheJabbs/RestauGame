import Sprite from "../../engine/game";

class Character extends Sprite {
    constructor(x, y, width, height, speed) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = new Image();
    }

    update(sprites, keys) {
        sprites.get("obstacle").forEach(obstacle => {
            if (this.checkCollision(obstacle)) {
                this.x = obstacle.x + obstacle.width;
                this.y = obstacle.y + obstacle.height;
            }
        })

        sprites.get("station").forEach(station => {
            if (this.checkCollision(station)) {
                this.x = station.x + station.width;
                this.y = station.y + station.height;
            }
        })
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    checkCollision(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }
}