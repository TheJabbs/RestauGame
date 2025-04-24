class Npc extends Character {
    constructor(x, y, width, height, speed, goToX, goToY) {
        super(x, y, width, height, speed);
        this.order = []
        this.patience = 0

// we are it to x and adding the y size for goToy to make it stand behind the table
        this.goToX = goToX + 50
        this.goToY = goToY + 50

        this.isArrived = false
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

        if(this.isArrived) {
            this.patience++
        }

        return false;
    }

    setWhereToGo(x, y) {
        this.goToX = x + 50
        this.goToY = y + 50
        this.isArrived = false
    }


}