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
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'white';
        ctx.font = "20px Arial";
        ctx.fillText("Table " + this.number, this.x + 10, this.y + 30);
    }

    serve() {
        if (this.npc)
            this.npc.serve()
    }

    setNpc(npc) {
        this.npc = npc;
    }

    checkNpc(sprite){
        return sprite.get('npc').find(o => o.isEquals(this.npc));
    }
}