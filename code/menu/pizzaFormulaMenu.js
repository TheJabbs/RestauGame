class PizzaFormulaMenu extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.selectedIndex = -1;
        this.isOpen = false;
        this.menuButton = {
            x: this.x,
            y: this.y - 40,
            width: 120,
            height: 30
        };

        // Convert to array for easier iteration
        this.pizzaNames = Object.keys(Var.pizzaFormula);

        // Height settings
        this.headerHeight = 25;
        this.pizzaEntryHeight = 30;
        this.ingredientHeight = 20;

        // Colors
        this.colors = {
            button: "#957",
            buttonText: "#fff",
            menuBg: "rgba(240, 240, 240, 0.95)",
            menuBorder: "#333",
            pizzaHeader: "#e0e0ff",
            pizzaHeaderText: "#333",
            ingredientText: "#555",
            ingredientBullet: "#777",
            divider: "#ddd"
        };
    }

    update(sprites, keys, mouse) {
        // Handle toggling the menu with the button
        if (mouse.clicked) {
            // Check if menu button was clicked
            if (this.pointInRect(mouse.x, mouse.y, this.menuButton)) {
                this.isOpen = !this.isOpen;
                return false;
            }
        }

        return false; // Returning false means it stays in the game
    }

    draw(ctx) {
        // Draw menu toggle button
        ctx.fillStyle = this.colors.button;
        ctx.fillRect(this.menuButton.x, this.menuButton.y, this.menuButton.width, this.menuButton.height);
        ctx.fillStyle = this.colors.buttonText;
        ctx.font = "16px Arial";
        ctx.fillText("Pizza Recipes", this.menuButton.x + 10, this.menuButton.y + 20);

        // Only draw formulas menu if it's open
        if (this.isOpen) {
            // Calculate total height needed for all pizzas and their ingredients
            let totalHeight = 0;
            for (let i = 0; i < this.pizzaNames.length; i++) {
                const ingredients = Var.pizzaFormula[this.pizzaNames[i]];
                totalHeight += this.headerHeight + (ingredients.length * this.ingredientHeight);
            }

            // Background for menu
            ctx.fillStyle = this.colors.menuBg;
            ctx.fillRect(this.x, this.y, this.width, totalHeight);

            // Draw border
            ctx.strokeStyle = this.colors.menuBorder;
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, totalHeight);

            let currentY = this.y;

            // Draw each pizza recipe
            for (let i = 0; i < this.pizzaNames.length; i++) {
                const pizzaName = this.pizzaNames[i];
                const ingredients = Var.pizzaFormula[pizzaName];

                // Pizza name header
                ctx.fillStyle = this.colors.pizzaHeader;
                ctx.fillRect(this.x, currentY, this.width, this.headerHeight);

                ctx.fillStyle = this.colors.pizzaHeaderText;
                ctx.font = "bold 14px Arial";
                ctx.fillText(pizzaName, this.x + 10, currentY + this.headerHeight - 7);

                currentY += this.headerHeight;

                // Draw ingredient list
                ctx.font = "12px Arial";
                for (let j = 0; j < ingredients.length; j++) {
                    ctx.fillStyle = this.colors.ingredientText;

                    // Draw bullet point
                    ctx.fillStyle = this.colors.ingredientBullet;
                    ctx.beginPath();
                    ctx.arc(this.x + 15, currentY + 10, 3, 0, Math.PI * 2);
                    ctx.fill();

                    // Draw ingredient name
                    ctx.fillStyle = this.colors.ingredientText;
                    ctx.fillText(ingredients[j], this.x + 25, currentY + 14);

                    currentY += this.ingredientHeight;
                }

                // Draw divider line between pizzas (except after the last one)
                if (i < this.pizzaNames.length - 1) {
                    ctx.strokeStyle = this.colors.divider;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(this.x, currentY);
                    ctx.lineTo(this.x + this.width, currentY);
                    ctx.stroke();
                }
            }
        }
    }

    // Helper function to check if a point is inside a rectangle
    pointInRect(x, y, rect) {
        return x >= rect.x && x <= rect.x + rect.width &&
            y >= rect.y && y <= rect.y + rect.height;
    }
}