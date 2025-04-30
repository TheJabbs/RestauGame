class TrashBin extends Station{
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color, usageTime, usageExtraTime);
        this.color = color || '#741c00';
        this.isOccupied = false;
    }

    update(sprites, keys) {
        return false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    interact(hero){
        hero.heldItem = "";
        alert("Item discarded");
    }
}