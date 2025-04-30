class FriesStation extends Station {
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#b8a229', usageTime || 10, usageExtraTime || 10);
    }

    update(sprites, keys) {
        super.update(sprites, keys);

        //make it chnage color depending on where it is to finish
        if (this.IsBurning) {
            this.color = '#741c00';
        }
        if (this.IsCollectable) {
            this.color = "yellow"
        }


        return false;
    }

    draw(ctx) {
        super.draw(ctx);
    }

    interact(hero) {
        super.interact(hero);
        if (this.IsCollectable && !this.IsBurning && hero.heldItem === "") {
            hero.heldItem = "fries";
            alert("Fries collected");
            this.reset();
            console.log("Fries collected");
        } else if (this.IsCollectable && !this.IsBurning) {
            alert("Your hands are full!")
        } else {
            this.IsActive = true
            console.log("Fries station activated");
        }
    }

    reset() {
        super.reset()
        this.color = '#8f8f8f';
    }
}