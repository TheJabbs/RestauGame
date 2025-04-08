class Hero extends Character {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);

        this.isPerformingAction = false;
        this.isHoldingKnife = false;
        this.isHoldingPizzaPlate = false

        this.inHand = "";

    }

    update(sprites, keys) {
        this.handleMovement(keys);
        this.handleAction(sprites, keys);

        super.update(sprites, keys);

    }

    handleMovement(keys) {
        if (!this.isPerformingAction) {
            if (keys['w']) {
                this.y -= this.speed;
            }
            if (keys['s']) {
                this.y += this.speed;
            }
            if (keys['a']) {
                this.x -= this.speed;
            }
            if (keys['d']) {
                this.x += this.speed;
            }
        }
    }

    handleAction(sprites, keys) {
        let stations = sprites.get("station");

        if (keys['e']) {
            this.isPerformingAction = true;
        } else if (keys['1']) {
            this.isHoldingKnife = !this.isHoldingKnife;
        } else if (keys['2']) {
            this.isHoldingPizzaPlate = !this.isHoldingPizzaPlate;
        } else {
            this.isPerformingAction = false;
        }
    }
}