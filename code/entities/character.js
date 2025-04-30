class Character extends Sprite {
    constructor(x, y, width, height, speed) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;

        this.direction = "down"; // down, up, left, right
        this.isMoving = false;

        this.prevX = x;
        this.prevY = y;
    }

    update(sprites, keys) {
        this.handleCollisions(sprites);
        this.prevX = this.x;
        this.prevY = this.y;

        return false;
    }

    handleCollisions(sprites) {
        if (!sprites.has("obstacle")) return;

        const obstacles = sprites.get("obstacle");
        for (let obstacle of obstacles) {
            if (this.collidesWith(obstacle)) {
                console.log(obstacle instanceof Obstacle);
                this.x = this.prevX;
                this.y = this.prevY;
                break;
            }
        }

        const stations = sprites.get("station");
        for (let station of stations) {
            if (this.collidesWith(station)) {
                console.log(station instanceof Station);
                this.x = this.prevX;
                this.y = this.prevY;
                break;
            }
        }
    }

    collidesWith(sprite) {
        return (
            this.x < sprite.x + sprite.width &&
            this.x + this.width > sprite.x &&
            this.y < sprite.y + sprite.height &&
            this.y + this.height > sprite.y
        );
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'white';
        switch (this.direction) {
            case "down":
                ctx.fillRect(this.x + this.width / 2 - 2, this.y + this.height - 5, 4, 5);
                break;
            case "up":
                ctx.fillRect(this.x + this.width / 2 - 2, this.y, 4, 5);
                break;
            case "left":
                ctx.fillRect(this.x, this.y + this.height / 2 - 2, 5, 4);
                break;
            case "right":
                ctx.fillRect(this.x + this.width - 5, this.y + this.height / 2 - 2, 5, 4);
                break;
        }
    }

}