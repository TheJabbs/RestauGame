class ShawarmaStation extends Station{
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#0a3e9a', usageTime || 8, usageExtraTime || 4);
    }

    update(sprites, keys) {
        super.update(sprites, keys);
        if(this.IsBurning){
            this.color = "#330d04";
        }
        if (this.IsCollectable) {
            this.color = "#b54400"
        }
    }

    draw(ctx) {
        super.draw(ctx);
    }

    interact(hero) {
        console.log("entry1");
        if(super.interact(hero)){
            console.log("entry2");
            return
        }

        if (this.IsCollectable  && hero.heldItem === "" && hero.toolHeld === Var.Tools.KNIFE) {
            hero.heldItem = "shawarma";
            alert("Shawarma collected");
            this.reset();
            console.log("Shawarma collected");
        }else if(this.IsCollectable  && hero.heldItem !== "" ){
            alert("Your hands are full!")
        }else if(this.IsCollectable && hero.toolHeld !== Var.Tools.KNIFE){
            alert("You need a knife to collect the shawarma!")
        } else if (this.IsCollectable && !this.IsBurning) {
            alert("Your hands are full!")
        }
        else {
            this.IsActive = true
            console.log("Shawarma station activated");
        }
    }

    reset() {
        super.reset()
        this.color = '#f6b691';
    }
}