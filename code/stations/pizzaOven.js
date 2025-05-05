class PizzaOven extends Station {
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#0a3e9a', usageTime || 10, usageExtraTime || 0);
        this.pizza = ""
    }

    pizzas = [
        "Peperoni Pizza (uncooked)",
        "Pizza Vegetarian (uncooked)",
        "Pizza Margarita (uncooked)",
        "Nini's Pizza (uncooked)"
    ]


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
        if (!this.IsActive && this.checkHand(hero.heldItem)) {
            this.IsActive = true
            this.pizza = hero.heldItem
            hero.heldItem = ""
            console.log("Pizza oven activated");
        } else if (!this.IsActive && !this.checkHand(hero.heldItem)) {
            alert("I don't think this pizza even falls within the FDA regulations... we don' t need a second quarantine...");
        } else if (this.IsCollectable && !this.IsBurning && hero.heldItem === "" && hero.toolHeld === Var.Tools.WOODEN_PLATE) {
            this.cookPizza()
            hero.heldItem = this.pizza;
            this.reset()
        }else if(this.IsCollectable && !this.IsBurning && hero.toolHeld !== Var.Tools.WOODEN_PLATE ){
            alert("Your you don't wanna burn your hands! Use a wooden plate")
        } else if (this.IsCollectable && !this.IsBurning) {
            alert("Your hands are full!")
        }

    }

    reset() {
        super.reset()
        this.color = '#8f8f8f';
        this.pizza = ""
    }

    checkHand(heldItem) {
        return this.pizzas.includes(heldItem);
    }

    cookPizza() {
        this.pizza = this.pizza.replace(" (uncooked)", "");
    }
}




