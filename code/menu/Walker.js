class Walker extends Sprite {
    constructor(imagePath, x, y, width, height, timePerFrame, numberOfFrames){
        super();

        var heroSpritesheet = new Image();
        heroSpritesheet.src = imagePath;
        this.spritesheet = heroSpritesheet;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.timePerFrame = timePerFrame;
        this.numberOfFrames = numberOfFrames || 1;
        this.frameIndex = 0;
        this.lastUpdate = Date.now();

    }

    update() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet,
            this.frameIndex*this.width/this.numberOfFrames,
            0,
            this.width/this.numberOfFrames,
            this.height,
            this.x,
            this.y,
            this.width/this.numberOfFrames,
            this.height);
    }
}

