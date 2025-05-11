class ShawarmaTable extends Station {
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#b8a229', usageTime || 0, usageExtraTime || 0);
        this.tableContent = [];
        this.missing = "bread";
    }

    static shawarmaFormula = {
        "Shawarma no pickles": ["bread", "chicken", "garlic sauce"],
        "Shawarma no garlic": ["bread", "chicken", "pickles"],
        "Sharwarma only chicken": ["bread", "chicken"],
        "Shawarma": ["bread", "chicken", "pickles", "garlic sauce"]
    };

    update(sprites, keys) {


        return false;
    }

    draw(ctx) {
        // Draw the table base
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // If there are ingredients on the table, draw them
        if (this.tableContent.length > 0) {
            const centerX = this.x + this.width / 2;
            const centerY = this.y + this.height / 2;

            // Draw bread base if present
            if (this.tableContent.includes("bread")) {
                ctx.fillStyle = '#e6d2a8'; // bread color
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, this.width / 3, this.height / 4, 0, 0, 2 * Math.PI);
                ctx.fill();
                ctx.strokeStyle = '#c7b28a';
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Draw chicken if present
            if (this.tableContent.includes("chicken")) {
                ctx.fillStyle = '#e3bc7a'; // chicken color
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, this.width / 4, this.height / 5, 0, 0, 2 * Math.PI);
                ctx.fill();

                // Add strips to chicken
                ctx.strokeStyle = '#bd9457';
                ctx.lineWidth = 2;
                for (let i = -2; i <= 2; i++) {
                    ctx.beginPath();
                    ctx.moveTo(centerX - this.width / 5, centerY + i * 5);
                    ctx.lineTo(centerX + this.width / 5, centerY + i * 5);
                    ctx.stroke();
                }
            }

            // Draw pickles if present
            if (this.tableContent.includes("pickles")) {
                ctx.fillStyle = '#7da654'; // pickle color
                const pickleWidth = this.width / 15;
                const pickleHeight = this.height / 6;

                // Draw several pickle slices
                for (let i = -2; i <= 2; i++) {
                    ctx.beginPath();
                    ctx.ellipse(
                        centerX + i * 10,
                        centerY - 10,
                        pickleWidth,
                        pickleHeight,
                        Math.PI / 4,
                        0,
                        2 * Math.PI
                    );
                    ctx.fill();
                }
            }

            // Draw garlic sauce if present
            if (this.tableContent.includes("garlic sauce")) {
                ctx.fillStyle = '#f0f0f0'; // white garlic sauce
                ctx.globalAlpha = 0.8;

                // Draw sauce as drizzled lines
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#f0f0f0';
                ctx.beginPath();

                for (let i = -2; i <= 2; i++) {
                    const startX = centerX + i * 10 - 5;
                    const startY = centerY - this.height / 6;

                    ctx.moveTo(startX, startY);
                    ctx.bezierCurveTo(
                        startX + 5, startY + 10,
                        startX - 5, startY + 20,
                        startX, startY + 30
                    );
                }

                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
        }
    }

    interact(hero) {
        // If no ingredients on table yet, add bread
        if (this.tableContent.length === 0) {
            this.tableContent.push("bread");
            this.missing = "chicken";
            this.playSound(this.tableContent.length);
        }
        // If bread is there, add chicken
        else if (this.tableContent.length === 1 && hero.heldItem === "chicken") {
            this.tableContent.push("chicken");
            hero.heldItem = "";
            this.missing = ""; // After bread and chicken, other ingredients are optional
            this.playSound(this.tableContent.length);

        }
        // Add garlic sauce if appropriate
        else if (this.tableContent.includes("bread") &&
            this.tableContent.includes("chicken") &&
            hero.heldItem === "garlic sauce" &&
            !this.tableContent.includes("garlic sauce")) {
            this.tableContent.push("garlic sauce");
            this.playSound(this.tableContent.length);
            hero.heldItem = "";
        }
        // Add pickles if appropriate
        else if (this.tableContent.includes("bread") &&
            this.tableContent.includes("chicken") &&
            hero.heldItem === "pickles" &&
            !this.tableContent.includes("pickles")) {
            this.tableContent.push("pickles");
            this.playSound(this.tableContent.length);
            hero.heldItem = "";
        }
        // Collect completed shawarma
        else if (this.tableContent.includes("bread") &&
            this.tableContent.includes("chicken") &&
            hero.heldItem === "") {
            hero.heldItem = this.getShawarmaType();
            this.reset();
        }
        // Hands full message
        else if (this.tableContent.includes("bread") &&
            this.tableContent.includes("chicken") &&
            hero.heldItem !== "") {
            alert("Your hands are full! You need empty hands to pick up the shawarma.");
        }
        // Missing ingredient message
        else {
            alert(`This shawarma is missing ${this.missing}`);
        }
    }

    getShawarmaType() {
        for (const [name, ingredients] of Object.entries(ShawarmaTable.shawarmaFormula)) {
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
        return "Mystery Shawarma"; // If no match found
    }

    reset() {
        super.reset();
        this.tableContent = [];
        this.color = '#b8a229';
        this.missing = "bread";
    }

    playSound(number){
        const sound = new Audio(Var.Sounds.TOPPING[number%2])
        sound.play().catch(error => console.error('Error playing sound:', error));
    }
}