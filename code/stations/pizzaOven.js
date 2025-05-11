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
        if(this.IsBurning){
            this.color = "#ff0000"
        }
    }

    draw(ctx) {
        // Draw base oven
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw oven door
        const doorWidth = this.width * 0.7;
        const doorHeight = this.height * 0.6;
        const doorX = this.x + (this.width - doorWidth) / 2;
        const doorY = this.y + (this.height - doorHeight) / 2;

        // Door frame
        ctx.fillStyle = this.IsBurning ? '#800000' : '#333333';
        ctx.fillRect(doorX, doorY, doorWidth, doorHeight);

        // Door glass
        ctx.fillStyle = this.IsActive ? '#ff9c30' : '#222222';
        ctx.fillRect(doorX + 5, doorY + 5, doorWidth - 10, doorHeight - 10);

        // Draw pizza if visible
        if (this.IsActive || this.IsCollectable) {
            // Pizza base
            ctx.fillStyle = '#e2ba7b';
            ctx.beginPath();
            ctx.arc(
                this.x + this.width / 2,
                this.y + this.height / 2,
                doorWidth / 3,
                0,
                2 * Math.PI
            );
            ctx.fill();

            // Pizza sauce
            ctx.fillStyle = '#b52b2b';
            ctx.beginPath();
            ctx.arc(
                this.x + this.width / 2,
                this.y + this.height / 2,
                doorWidth / 3 - 5,
                0,
                2 * Math.PI
            );
            ctx.fill();

            // Pizza cheese (lighter when fully cooked)
            ctx.fillStyle = this.IsCollectable ? '#ffd966' : '#ffc266';
            ctx.beginPath();
            ctx.arc(
                this.x + this.width / 2,
                this.y + this.height / 2,
                doorWidth / 3 - 8,
                0,
                2 * Math.PI
            );
            ctx.fill();
        }

        // Door handle
        ctx.fillStyle = '#999999';
        ctx.fillRect(
            doorX + doorWidth - 5,
            doorY + doorHeight / 2 - 10,
            10,
            20
        );

        // Draw station state indicator
        if (this.IsActive && !this.IsCollectable) {
            const progress = Math.min(this.TimeActive / this.UsageTime, 1);
            ctx.fillStyle = progress > 0.8 ? '#ff0000' : '#00ff00';
            ctx.fillRect(this.x, this.y - 10, this.width * progress, 5);
        }
    }

    interact(hero) {
        super.interact(hero);
        if (!this.IsActive && this.checkHand(hero.heldItem)) {
            this.IsActive = true
            this.pizza = hero.heldItem
            hero.heldItem = ""
            hero.toolHeld = ""


            const sound = new Audio(Var.Sounds.IN)
            sound.play().catch(error => console.error('Error playing sound:', error));
        } else if (!this.IsActive && !this.checkHand(hero.heldItem)) {
            alert("I don't think this pizza even falls within the FDA regulations... we don' t need a second quarantine...");
        } else if (this.IsCollectable && !this.IsBurning && hero.heldItem === "" && hero.toolHeld === Var.Tools.WOODEN_PLATE) {
            this.cookPizza()
            hero.heldItem = this.pizza;
            const sound = new Audio(Var.Sounds.OUT)
            sound.play().catch(error => console.error('Error playing sound:', error));
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




