class Character extends Sprite {
    constructor(x, y, width, height, speed, spriteSheet) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;

        // Sprite sheet properties
        this.spriteSheet = spriteSheet;
        this.frameWidth = 32; // Width of one frame in the sprite sheet
        this.frameHeight = 32; // Height of one frame in the sprite sheet

        this.direction = "down"; // down, up, left, right
        this.animationFrame = 0;
        this.animationCounter = 0;
        this.animationSpeed = 6; // Frames before animation update
        this.isMoving = false;

        // Animation frames mapping
        this.animationFrames = {
            "down": [0, 1, 2, 3],
            "left": [4, 5, 6, 7],
            "right": [8, 9, 10, 11],
            "up": [12, 13, 14, 15]
        };

        // For collision detection
        this.prevX = x;
        this.prevY = y;
    }

    update(sprites, keys) {
        // Store previous position for collision resolution
        this.prevX = this.x;
        this.prevY = this.y;

        // Animation logic using counter
        if (this.isMoving) {
            this.animationCounter++;
            if (this.animationCounter >= this.animationSpeed) {
                this.animationCounter = 0;
                this.animationFrame = (this.animationFrame + 1) % 4;
            }
        } else {
            this.animationFrame = 0;
            this.animationCounter = 0;
        }

        // Check for collisions with obstacles
        this.handleCollisions(sprites);

        return false; // Character is still active
    }

    handleCollisions(sprites) {
        if (!sprites.has("obstacle")) return;

        const obstacles = sprites.get("obstacle");
        for (let obstacle of obstacles) {
            if (this.collidesWith(obstacle)) {
                // Collision detected, revert to previous position
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

    getCurrentFrame() {
        // Get the frame index from the animation frames array
        const directionFrames = this.animationFrames[this.direction];
        return directionFrames[this.animationFrame];
    }

    draw(ctx) {
        if (this.spriteSheet) {
            // Draw the correct frame from the sprite sheet
            const frameIndex = this.getCurrentFrame();
            const row = Math.floor(frameIndex / 4);
            const col = frameIndex % 4;

            ctx.drawImage(
                this.spriteSheet,
                col * this.frameWidth,
                row * this.frameHeight,
                this.frameWidth,
                this.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
        } else {
            // Fallback if no sprite sheet is available
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // Draw character direction indicator
            ctx.fillStyle = 'white';
            switch(this.direction) {
                case "down":
                    ctx.fillRect(this.x + this.width/2 - 2, this.y + this.height - 5, 4, 5);
                    break;
                case "up":
                    ctx.fillRect(this.x + this.width/2 - 2, this.y, 4, 5);
                    break;
                case "left":
                    ctx.fillRect(this.x, this.y + this.height/2 - 2, 5, 4);
                    break;
                case "right":
                    ctx.fillRect(this.x + this.width - 5, this.y + this.height/2 - 2, 5, 4);
                    break;
            }
        }
    }
}