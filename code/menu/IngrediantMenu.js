class IngrediantMenu extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.selectedIndex = -1;
        this.itemHeight = 30;
        this.isOpen = false;
        this.menuButton = {
            x: this.x,
            y: this.y - 40,
            width: 120,
            height: 30
        };

    }

    update(sprites, keys, mouse) {
        // Handle toggling the menu with the button
        if (mouse.clicked) {
            // Check if menu button was clicked
            if (this.pointInRect(mouse.x, mouse.y, this.menuButton)) {
                this.isOpen = !this.isOpen;
                this.clickSound();
                return false;
            }

            // If menu is open, check for ingredient selection
            if (this.isOpen) {
                const index = Math.floor((mouse.y - this.y) / this.itemHeight);
                if (this.pointInRect(mouse.x, mouse.y, {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.itemHeight * Var.allowedToppings.length
                }) && index >= 0 && index < Var.allowedToppings.length) {
                    this.clickSound();
                    this.selectedIndex = index;
                    this.selectIngredient(Var.allowedToppings[this.selectedIndex], sprites);
                }
            }
        }

        return false; // Returning false means it stays in the game
    }

    draw(ctx) {
        // Draw menu toggle button
        ctx.fillStyle = "#5a9";
        ctx.fillRect(this.menuButton.x, this.menuButton.y, this.menuButton.width, this.menuButton.height);
        ctx.fillStyle = "#fff";
        ctx.font = "16px Arial";
        ctx.fillText("Ingredients", this.menuButton.x + 10, this.menuButton.y + 20);

        // Only draw ingredients menu if it's open
        if (this.isOpen) {
            // Background for menu
            ctx.fillStyle = "rgba(240, 240, 240, 0.95)";
            ctx.fillRect(this.x, this.y, this.width, this.itemHeight * Var.allowedToppings.length);

            // Draw border
            ctx.strokeStyle = "#333";
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.itemHeight * Var.allowedToppings.length);

            // Draw each ingredient
            for (let i = 0; i < Var.allowedToppings.length; i++) {
                // Highlight selected ingredient
                if (i === this.selectedIndex) {
                    ctx.fillStyle = "#cce";
                    ctx.fillRect(this.x, this.y + i * this.itemHeight, this.width, this.itemHeight);
                }

                // Draw divider lines between ingredients
                ctx.strokeStyle = "#ddd";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + (i + 1) * this.itemHeight);
                ctx.lineTo(this.x + this.width, this.y + (i + 1) * this.itemHeight);
                ctx.stroke();

                // Draw text
                ctx.fillStyle = "#333";
                ctx.font = "16px Arial";
                ctx.fillText(Var.allowedToppings[i], this.x + 15, this.y + i * this.itemHeight + 20);
            }
        }
    }

    // Helper function to check if a point is inside a rectangle
    pointInRect(x, y, rect) {
        return x >= rect.x && x <= rect.x + rect.width &&
            y >= rect.y && y <= rect.y + rect.height;
    }

    // Handle the selection of an ingredient
    selectIngredient(ingredient, sprites) {

        // Find the hero character to give them the ingredient
        if (sprites.has("character")) {
            const characters = sprites.get("character");
            for (let character of characters) {
                if (character instanceof Hero) {
                    // Only set the held item if the hero's hands are empty
                    if (character.heldItem === "") {
                        character.heldItem = ingredient;
                    } else {
                        alert("Your hands are full! Drop your current item first.");
                    }
                    break;
                }
            }
        }
    }

    clickSound() {
        const sound = new Audio(Var.Sounds.CLICK);
        sound.play().catch(error => console.error('Error playing sound:', error));

    }
}