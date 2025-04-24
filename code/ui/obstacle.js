class Obstacle extends Sprite{
    constructor(x, y, width, height, color) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color
    }

    update(sprites, keys) {
        // No specific update logic for obstacles
        return false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color || 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}