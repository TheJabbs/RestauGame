class SodaStation extends Station{
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#0a3e9a', usageTime || 10, usageExtraTime || 0);
        this.IsActive = true
    }

    update(sprites, keys) {
        super.update(sprites, keys);

        if (this.IsCollectable) {
            this.color = "#609bff"
        }
    }

    draw(ctx) {
        super.draw(ctx);
    }

    interact(hero) {
        super.interact(hero);
        if (this.IsCollectable  && hero.heldItem === "") {
            hero.heldItem = "soda";
            alert("Soda collected");
            this.reset();
            console.log("Soda collected");
        } else if (this.IsCollectable && !this.IsBurning) {
            alert("Your hands are full!")
        }
    }

    reset() {
        super.reset()
        this.color = '#8f8f8f';
        this.IsActive = true;
    }
}