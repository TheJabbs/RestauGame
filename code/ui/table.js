class Table extends Obstacle {
    constructor(x, y, width, height, color, npc) {
        super(x, y, width, height);
        this.color = color || '#741c00';
        this.isOccupied = false;
        this.updateColor = false;
        this.npc = npc
    }

    update(sprites, keys, ctx) {
        if (this.updateColor) {
            this.updateColor = false; // Reset the flag
        }
        return false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    serve() {
        this.color = '#00ff00';
        this.updateColor = true; // Set the flag to trigger an update
    }

    setNpc(npc) {
        this.npc = npc;
    }
}