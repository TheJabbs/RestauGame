class Hero extends Character {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);

        this.isPerformingAction = false;
        this.actionCooldown = 0;
        this.heldItem = null;

        this.interactionRange = 20;

        this.hasKnife = false;
        this.hasFireExtinguisher = false;

        this.keyDebounce = {
            'e': 0,
            ' ': 0,
            '1': 0,
            '2': 0,
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
        }

        this.isMoving = moved;
    }

    handleAction(sprites, keys) {

        if ((keys['e'] || keys[' ']) && this.keyDebounce['e'] === 0 && this.keyDebounce[' '] === 0) {
            this.interactWithNearbyStation(sprites);
            this.keyDebounce['e'] = this.keyDebounceTime;
        }

        if (keys['1'] && this.keyDebounce['1'] === 0 && !this.heldItem) {
            this.hasKnife = !this.hasKnife;
            console.log("picked up knife", this.hasKnife)

            if (this.hasKnife) {
                this.hasFireExtinguisher = false;
            } else {
                this.heldItem = null;
            }
            this.keyDebounce['1'] = this.keyDebounceTime;
        }

        if (keys['2'] && this.keyDebounce['2'] === 0 && !this.heldItem) {
            this.hasFireExtinguisher = !this.hasFireExtinguisher;
            if (this.hasFireExtinguisher) {
                this.heldItem = "fireExtinguisher";
                this.hasKnife = false;
            } else {
                this.heldItem = null;
            }
            this.keyDebounce['2'] = this.keyDebounceTime;
        }

        if (keys['q'] && this.keyDebounce['q'] === 0 && this.heldItem && !this.hasKnife && !this.hasFireExtinguisher) {
            this.heldItem = null;
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
                if(item instanceof Table) {
                    item.serve()
                    break;
                }
            }
        }
    }

    pickupItem(item) {
        if (!this.heldItem && !this.hasKnife && !this.hasFireExtinguisher) {
            this.heldItem = item;
            return true;
        }
        return false;
    }

    dropItem() {
        const droppedItem = this.heldItem;
        this.heldItem = null;
        return droppedItem;
    }


    draw(ctx) {
        super.draw(ctx);

        if (this.heldItem && this.heldItem !== "knife" && this.heldItem !== "fireExtinguisher") {
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
            case "knife":
                return "silver";
            case "fireExtinguisher":
                return "red";
            case "pizza":
                return "orange";
            case "shawarma":
                return "tan";
            case "fries":
                return "yellow";
            case "soda":
                return "brown";
            case "dough":
                return "beige";
            default:
                return "green";
        }
    }
}