class ShawarmaTable extends Station {
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#0a3e9a', 0, 0);
    }

    update(sprites, keys) {
        super.update(sprites, keys);
        if (this.IsBurning) {
            this.color = "#330d04";
        }
        if (this.IsCollectable) {
            this.color = "#b54400"
        }
    }
}