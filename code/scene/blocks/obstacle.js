class Obstacle extends Sprite{
    constructor(x, y, width, height, image) {
        super();
        this.x = x;

        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image
    }

    draw(ctx) {
        super.draw(ctx);
    }

}