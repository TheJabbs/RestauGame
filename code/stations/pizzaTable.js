class PizzaTable extends Station {
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#b8a229', usageTime || 0, usageExtraTime || 0);
        this.tableContent = []
    }

    update(sprites, keys) {
        console.log(this.tableContent.toString())
        console.log(this.getPizzaType())
    }

draw(ctx) {
    // Draw the table
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.tableContent.includes("doe")) {
        // Draw dough
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2, // Center X
            this.y + this.height / 2, // Center Y
            Math.min(this.width, this.height) / 4, // Radius
            0, // Start angle
            2 * Math.PI // End angle
        );
        ctx.fillStyle = '#f5deb3'; // Dough color
        ctx.fill();
        ctx.closePath();
    }

    if (this.tableContent.includes("sauce")) {
        // Draw sauce
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2, // Center X
            this.y + this.height / 2, // Center Y
            Math.min(this.width, this.height) / 5, // Smaller radius for sauce
            0, // Start angle
            2 * Math.PI // End angle
        );
        ctx.fillStyle = '#ff6347'; // Sauce color (tomato red)
        ctx.fill();
        ctx.closePath();
    }

    if (this.tableContent.includes("cheese")) {
        // Draw cheese
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2, // Center X
            this.y + this.height / 2, // Center Y
            Math.min(this.width, this.height) / 6, // Smaller radius for cheese
            0, // Start angle
            2 * Math.PI // End angle
        );
        ctx.fillStyle = '#ffffe0'; // Cheese color (light yellow)
        ctx.fill();
        ctx.closePath();
    }

    // Draw additional toppings
    const toppings = this.tableContent.filter(item => !["doe", "sauce", "cheese"].includes(item));
    toppings.forEach((topping, index) => {
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2 + (index * 10 - 20), // Offset X for each topping
            this.y + this.height / 2, // Center Y
            Math.min(this.width, this.height) / 10, // Radius for toppings
            0, // Start angle
            2 * Math.PI // End angle
        );
        ctx.fillStyle = this.getToppingColor(topping); // Get color based on topping
        ctx.fill();
        ctx.closePath();
    });
}
    interact(hero) {
        let missing = ""
        if (hero.toolHeld === Var.Tools.WOODEN_PLATE) {
            if (this.tableContent.length > 0) {
                hero.heldItem = this.getPizzaType()
                this.tableContent = []
            } else {
                alert("Buddy... what are you trying to do? You need to add some ingredients first!")
            }
        } else if (this.tableContent.length === 0) {
            this.tableContent.push("doe")
            this.missing = "sauce"
        } else if (this.tableContent.length === 1 && hero.heldItem === "sauce") {
            this.tableContent.push("sauce")
            alert("Pizza dough and sauce combined")
            hero.heldItem = ""
            this.missing = "cheese"
        } else if (this.tableContent.length === 2 && hero.heldItem === "cheese") {
            this.tableContent.push("cheese")
            alert("Pizza dough, sauce and cheese combined")
            hero.heldItem = ""
            this.missing = ""
        } else if (this.tableContent.length > 2 && !this.checkForDuplicateTopping(hero.heldItem) && this.isAllowedTopping(hero.heldItem)) {
            this.tableContent.push(hero.heldItem)
            hero.heldItem = ""
            alert('Added ' + hero.heldItem + ' to the pizza')
        } else {
            alert(`I think this pizza is missing ${this.missing}`)
        }
    }

    checkForDuplicateTopping(topping) {
        for (let i = 0; i < this.tableContent.length; i++) {
            if (this.tableContent[i] === topping) {
                return true
            }
        }
        return false
    }

    isAllowedTopping(topping) {
        for (let i = 0; i < Var.allowedToppings.length; i++) {
            if (Var.allowedToppings[i] === topping) {
                return true
            }
        }
        return false
    }

    getPizzaType() {
        for (const [name, ingredients] of Object.entries(Var.pizzaFormula)) {
            if (ingredients.length === this.tableContent.length) {
                let match = true;
                for (let j = 0; j < ingredients.length; j++) {
                    if (!this.tableContent.includes(ingredients[j])) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    return name;
                }
            }
        }
        return "abnormal pizza";
    }


    getToppingColor(topping) {
        const colors = {
            pepperoni: '#ff4500',
            mushrooms: '#d2b48c',
            olives: '#556b2f',
            onions: '#f5f5dc',
            peppers: '#ffcc00'
        };
        return colors[topping] || '#000000'; // Default to black if topping is unknown
    }
}