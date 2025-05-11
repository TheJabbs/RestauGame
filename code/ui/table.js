class Table extends Obstacle {
    constructor(x, y, width, height, color, npc, number) {
        super(x, y, width, height);
        this.color = color || '#741c00';
        this.isOccupied = false;
        this.npc = npc
        this.number = number
    }

    update(sprites, keys, ctx) {

        if (this.isOccupied && !this.checkNpc(sprites) ) {
            this.isOccupied = false;
        }

        return false;
    }

    draw(ctx) {
        // Tabletop
        ctx.fillStyle = '#8B4513'; // Wood brown
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 10);
        ctx.fill();

        // Legs (simple rectangles under the corners)
        ctx.fillStyle = '#5C3317'; // Darker brown for legs
        const legWidth = 6;
        const legHeight = 15;

        // Bottom-left leg
        ctx.fillRect(this.x + 5, this.y + this.height, legWidth, legHeight);
        // Bottom-right leg
        ctx.fillRect(this.x + this.width - legWidth - 5, this.y + this.height, legWidth, legHeight);

        // Label
        ctx.fillStyle = 'white';
        ctx.font = "16px Arial";
        ctx.fillText("Table " + this.number, this.x + 10, this.y + 20);
    }


    serve(hero) {
        if (this.npc)
            this.npc.serve(hero)
    }

    setNpc(npc) {
        this.npc = npc;
    }

    checkNpc(sprite){
        return sprite.get('npc').find(o => o.isEquals(this.npc));
    }
}