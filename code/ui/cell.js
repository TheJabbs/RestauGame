class Cell extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }

    draw(ctx) {
        // Draw subtle tile pattern
        ctx.fillStyle = '#f8f8f8';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw grout lines
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Add subtle texture to tiles
        ctx.fillStyle = '#f0f0f0';

        // Random texture pattern - different for each tile but consistent between renders
        const seed = Math.sin(this.x * 0.1 + this.y * 0.3) * 10000;
        const random = (offset = 0) => Math.abs(Math.sin(seed + offset)) * 0.5;

        // Draw small specks
        for (let i = 0; i < 3; i++) {
            const rx = this.x + this.width * random(i * 0.1);
            const ry = this.y + this.height * random(i * 0.2 + 0.5);
            const rs = 2 + random(i * 0.3) * 3;

            ctx.beginPath();
            ctx.arc(rx, ry, rs, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}