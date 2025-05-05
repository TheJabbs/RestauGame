class Extinguisher extends Station {
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#ff2020', 0, 0);
    }

    update(sprites, keys) {
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    interact(hero) {
        if (hero.heldItem === "")
            hero.toolHeld = Var.Tools.FIRE_EXTINGUISHER;
        else{
            alert("You need both hands!!! drop whatever food you are holding")
        }
    }

    reset() {
        super.reset()
        this.color = '#8f8f8f';
        this.IsActive = true;
    }
}