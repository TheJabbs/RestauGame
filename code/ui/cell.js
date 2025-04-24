class Cell extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }

    draw(ctx) {
        ctx.strokeStyle = '#000';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}