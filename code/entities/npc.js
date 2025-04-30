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
    }

    update(sprites, keys) {

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
                return true
            }
        }

        return this.IsServed;
    }

    setWhereToGo(x, y) {
        this.goToX = x + 50
        this.goToY = y + 50
        this.isArrived = false
    }

    serve() {
        console.log(this.y, this.x)
        this.IsServed = true
    }

    MENU_OPTIONS = [
        {name: "Peperoni Pizza", patience: 20},
        {name: "Vegetarian Pizza", patience: 25},
        {name: "Pizza Margarita", patience: 18},
        {name: "Nini's Pizza", patience: 35},
        {name: "Fries", patience: 15},
        {name: "Fries", patience: 15},
        {name: "Fries", patience: 15},
        {name: "Fries", patience: 15},
        {name: "Fries", patience: 15},
        {name: "Shawarma no pickles", patience: 20},
        {name: "Shawarma no garlic", patience: 20},
        {name: "Sharwarma only chicken", patience: 20},
        {name: "Shawarma", patience: 20},
        {name: "Soda", patience: 10},
        {name: "Soda", patience: 10},
        {name: "Soda", patience: 10},
        {name: "Soda", patience: 10},
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


}