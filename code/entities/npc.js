class Npc extends Character {
    static npcId = 0;

    constructor(x, y, width, height, speed, goToX, goToY) {
        super(x, y, width, height, speed);
        this.npcId = Npc.npcId++;

        this.order = []
        this.color = 'blue'

        this.initialPatience = Math.floor(Math.random() * 16)
        this.patience = this.initialPatience

// we are it to x and adding the y size for goToy to make it stand behind the table
        this.goToX = goToX + 50
        this.goToY = goToY + 50

        this.isArrived = false
        this.IsServed = false

        this.generateOrder()
        this.totalWaiting = this.patience

        this.scorePercentage = 0
        this.totalOrder = this.order.length

        this.score = 0

        this.soundMade = false

    }

    update(sprites, keys) {

        if (!this.soundMade && this.patience < this.totalWaiting / 2) {
            let randomIndex = Math.floor(Math.random() * Var.Sounds.ANGRY.length);
            this.soundMade = true;
            const sound = new Audio(Var.Sounds.ANGRY[randomIndex]);
            sound.play().catch(error => console.error('Error playing sound:', error));
        }

        if (!this.isArrived) {
            if (this.x < this.goToX) {
                this.x += this.speed;
            } else if (this.x > this.goToX) {
                this.x -= this.speed;
            }

            if (this.y < this.goToY) {
                this.y += this.speed;
            } else if (this.y > this.goToY) {
                this.y -= this.speed;
            }

            if (Math.abs(this.x - this.goToX) < this.speed && Math.abs(this.y - this.goToY) < this.speed) {
                this.x = this.goToX;
                this.y = this.goToY;
                this.isArrived = true;
            }

            this.handleCollisions(sprites);
            this.prevX = this.x;
            this.prevY = this.y;
        }

        if (this.isArrived) {
            this.patience--
            if (this.patience < 0) {
                let e = this.getScoreSprite(sprites.get('ui'))
                e.updateScore(this.scorePercentage, this.score)
                this.score = 0
                return true
            }
        }

        if (this.IsServed) {
            let e;
            for (let i = 0; i < sprites.get('ui').length; i++) {
                if (sprites.get('ui')[i] instanceof StarRating) {
                    e = sprites.get('ui')[i]
                    break
                }
            }
            e.updateScore(this.scorePercentage, this.score)
            this.score = 0
        }

        return this.IsServed;
    }

    draw(ctx) {
        // Draw the character
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw the order dialogue box if NPC has arrived
        if (this.isArrived && !this.IsServed) {
            this.drawOrderBox(ctx);
        }
    }

    drawOrderBox(ctx) {
        const boxWidth = 200;
        const boxHeight = 120;
        const boxX = this.x - boxWidth/2 + this.width/2;
        const boxY = this.y - boxHeight - 10;

        // Draw dialogue box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        // Draw rounded rectangle for dialogue box
        this.roundRect(ctx, boxX, boxY, boxWidth, boxHeight, 10, true, true);

        // Draw pointer triangle
        ctx.beginPath();
        ctx.moveTo(boxX + boxWidth/2 - 10, boxY + boxHeight);
        ctx.lineTo(boxX + boxWidth/2 + 10, boxY + boxHeight);
        ctx.lineTo(boxX + boxWidth/2, boxY + boxHeight + 15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw patience progress bar
        const barWidth = boxWidth - 40;
        const barHeight = 15;
        const barX = boxX + 20;
        const barY = boxY + 20;

        // Background bar
        ctx.fillStyle = 'lightgray';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // Progress bar
        const patiencePercentage = Math.max(0, this.patience / this.totalWaiting);

        // Change color based on patience level
        if (patiencePercentage > 0.6) {
            ctx.fillStyle = 'green';
        } else if (patiencePercentage > 0.3) {
            ctx.fillStyle = 'orange';
        } else {
            ctx.fillStyle = 'red';
        }

        ctx.fillRect(barX, barY, barWidth * patiencePercentage, barHeight);
        ctx.strokeRect(barX, barY, barWidth, barHeight);

        // Draw order text
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';

        // Draw "Order:" text
        ctx.fillText("Order:", boxX + 20, barY + barHeight + 20);

        // Draw each order item with a small gap between them
        let yOffset = barY + barHeight + 40;
        for (const item of this.order) {
            ctx.fillText("• " + item, boxX + 30, yOffset);
            yOffset += 20;
        }
    }

    // Helper function to draw rounded rectangles
    roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    }

    setWhereToGo(x, y) {
        this.goToX = x + 50
        this.goToY = y + 50
        this.isArrived = false
    }

    serve(hero) {
        if (this.order.includes(hero.heldItem)) {
            this.order.splice(this.order.indexOf(hero.heldItem), 1);
            if(hero.heldItem === "Soda"){
                const sound = new Audio(Var.Sounds.DRINKING);
                sound.play().catch(error => console.error('Error playing sound:', error));
            }
            this.score += this.getScore(hero.heldItem)
            hero.heldItem = ""
            this.patience += 5
            this.scorePercentage = this.scorePercentage + (1 / this.totalOrder);
        }
        if (this.order.length === 0) {
            let randomIndex = Math.floor(Math.random() * Var.Sounds.THANKS.length);
            const sound = new Audio(Var.Sounds.THANKS[randomIndex]);
            sound.play().catch(error => console.error('Error playing sound:', error));

            this.IsServed = true

        }
    }

    MENU_OPTIONS = [
        {name: "Peperoni Pizza", patience: 40, score: 30},
        {name: "Pizza Vegetarian", patience: 50, score: 40},
        {name: "Pizza Margarita", patience: 32, score: 25},
        {name: "Nini's Pizza", patience: 50, score: 55},
        {name: "Fries", patience: 15, score: 15},
        {name: "Fries", patience: 15, score: 15},
        {name: "Fries", patience: 15, score: 15},
        {name: "Fries", patience: 15, score: 15},
        {name: "Fries", patience: 15, score: 15},
        {name: "Shawarma no pickles", patience: 40, score: 25},
        {name: "Shawarma no garlic", patience: 40, score: 25},
        {name: "Sharwarma only chicken", patience: 40, score: 20},
        {name: "Shawarma", patience: 40, score: 30},
        {name: "Soda", patience: 10, score: 10},
        {name: "Soda", patience: 10, score: 10},
        {name: "Soda", patience: 10, score: 10},
        {name: "Soda", patience: 10, score: 10},
    ];

    generateOrder() {
        //generates a random number between 1 and 4
        let orderCount = Math.floor(Math.random() * 4) + 1;

        let iteration = 0
        if (orderCount === 4) {
            this.order.push(this.MENU_OPTIONS[9].name)
            this.patience += this.MENU_OPTIONS[9].patience;
            iteration++;
        }

        while (iteration < orderCount) {
            let randomIndex = Math.floor(Math.random() * this.MENU_OPTIONS.length);
            this.order.push(this.MENU_OPTIONS[randomIndex].name);
            this.patience += this.MENU_OPTIONS[randomIndex].patience;
            iteration++;
        }

        this.patience *= 100
    }

    isEquals(obj) {
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        return this.npcId === obj.npcId;
    }

    getScoreSprite(sprite) {
       for(let i = 0; i < sprite.length; i++){
            if(sprite[i] instanceof StarRating){
                return sprite[i]
            }
       }

    }

    getScore(foodName){
        for (let i = 0; i < this.MENU_OPTIONS.length; i++) {
            if (this.MENU_OPTIONS[i].name === foodName) {
                return this.MENU_OPTIONS[i].score;
            }
        }
        return 0;
    }


}