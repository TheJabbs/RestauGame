class Hero extends Character {

    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);

        this.isPerformingAction = false;
        this.actionCooldown = 0;
        this.heldItem = "";
        this.toolHeld = "";

        this.interactionRange = 20;

        this.keyDebounce = {
            'e': 0,
            ' ': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            'q': 0
        };
        this.keyDebounceTime = 10;
    }

    update(sprites, keys) {
        if (this.actionCooldown > 0) {
            this.actionCooldown--;
        }

        for (let key in this.keyDebounce) {
            if (this.keyDebounce[key] > 0) {
                this.keyDebounce[key]--;
            }
        }

        this.handleMovement(keys);
        this.handleAction(sprites, keys);

        super.update(sprites, keys);
        return false;
    }

    handleMovement(keys) {
        let moved = false;

        if (!this.isPerformingAction) {
            if (keys['w'] || keys['ArrowUp']) {
                this.y -= this.speed;
                this.direction = "up";
                moved = true;
            }
            if (keys['s'] || keys['ArrowDown']) {
                this.y += this.speed;
                this.direction = "down";
                moved = true;
            }
            if (keys['a'] || keys['ArrowLeft']) {
                this.x -= this.speed;
                this.direction = "left";
                moved = true;
            }
            if (keys['d'] || keys['ArrowRight']) {
                this.x += this.speed;
                this.direction = "right";
                moved = true;
            }

            if(keys['z']) {
                this.heldItem = "sauce";
            }
            if (keys['x']) {
                this.heldItem = "cheese";
            }
            if (keys['c']) {
                this.heldItem = "pepperoni";
            }

        }

        this.isMoving = moved;
    }

    handleAction(sprites, keys) {
        if ((keys['e'] || keys[' ']) && this.keyDebounce['e'] === 0) {
            this.interactWithNearbyStation(sprites);
            this.keyDebounce['e'] = this.keyDebounceTime;
        }

        if (keys['1'] && this.keyDebounce['1'] === 0) {
            this.toolHeld = Var.Tools.KNIFE;
            this.keyDebounce['1'] = this.keyDebounceTime;
        }

        if (keys['2'] && this.keyDebounce['2'] === 0) {
            this.toolHeld = Var.Tools.WOODEN_PLATE;
            this.keyDebounce['2'] = this.keyDebounceTime;
        }

        if (keys['q'] && this.keyDebounce['q'] === 0) {
            this.toolHeld =""
            this.keyDebounce['q'] = this.keyDebounceTime;
        }
    }

    interactWithNearbyStation(sprites) {
        if (!sprites.has("station")) return;

        const stations = sprites.get("station");
        for (let station of stations) {
            const dx = station.x - this.x;
            const dy = station.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= this.width / 2 + station.width / 2 + this.interactionRange) {
                station.interact(this);
                break;
            }
        }

        const ui = sprites.get('obstacle')
        for (let item of ui) {
            const dx = item.x - this.x;
            const dy = item.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= this.width / 2 + item.width / 2 + this.interactionRange) {
                if (item instanceof Table) {
                    item.serve()
                    break;
                }
            }
        }
    }


    draw(ctx) {
        super.draw(ctx);

        if (this.heldItem) {
            ctx.fillStyle = this.getItemColor();

            let itemX, itemY;
            switch (this.direction) {
                case "down":
                    itemX = this.x + this.width / 2 - 5;
                    itemY = this.y + this.height;
                    break;
                case "up":
                    itemX = this.x + this.width / 2 - 5;
                    itemY = this.y - 10;
                    break;
                case "left":
                    itemX = this.x - 10;
                    itemY = this.y + this.height / 2 - 5;
                    break;
                case "right":
                    itemX = this.x + this.width;
                    itemY = this.y + this.height / 2 - 5;
                    break;
            }

            ctx.fillRect(itemX, itemY, 10, 10);
        }
    }

    getItemColor() {
        switch (this.heldItem) {
            case "pizza":
                return "orange";
            case "shawarma":
                return "tan";
            case "fries":
                return "yellow";
            case "soda":
                return "cyan";
            case "dough":
                return "beige";
            default:
                return "green";
        }
    }
}