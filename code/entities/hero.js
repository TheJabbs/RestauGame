class Hero extends Character {
    constructor(x, y, width, height, speed, spriteSheet) {
        super(x, y, width, height, speed, spriteSheet);

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


        this.actionFrames = {
            "knife_down": [16, 17, 18, 19],
            "knife_left": [20, 21, 22, 23],
            "knife_right": [24, 25, 26, 27],
            "knife_up": [28, 29, 30, 31],
            "extinguisher_down": [32, 33, 34, 35],
            "extinguisher_left": [36, 37, 38, 39],
            "extinguisher_right": [40, 41, 42, 43],
            "extinguisher_up": [44, 45, 46, 47]
        };
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
            this.isPerformingAction = true;
            this.actionCooldown = 15;
            this.keyDebounce['e'] = this.keyDebounceTime;
            this.keyDebounce[' '] = this.keyDebounceTime;
        } else if (this.actionCooldown <= 0) {
            this.isPerformingAction = false;
        }

        if (keys['1'] && this.keyDebounce['1'] === 0 && !this.heldItem) {
            this.hasKnife = !this.hasKnife;
            if (this.hasKnife) {
                this.heldItem = "knife";
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

            if (distance <= this.width/2 + station.width/2 + this.interactionRange) {
                station.interact(this);
                break;
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

    getCurrentFrame() {
        // Override the parent method to include action frames
        if (this.isPerformingAction) {
            if (this.hasKnife) {
                const actionKey = `knife_${this.direction}`;
                return this.actionFrames[actionKey][this.animationFrame];
            } else if (this.hasFireExtinguisher) {
                const actionKey = `extinguisher_${this.direction}`;
                return this.actionFrames[actionKey][this.animationFrame];
            }
        }

        // Fall back to regular character animation
        return super.getCurrentFrame();
    }

    draw(ctx) {
        // Draw character with sprite sheet
        super.draw(ctx);

        // Draw held item if any (and not tool)
        if (this.heldItem && this.heldItem !== "knife" && this.heldItem !== "fireExtinguisher") {
            ctx.fillStyle = this.getItemColor();

            // Draw the item slightly in front of the character based on direction
            let itemX, itemY;
            switch(this.direction) {
                case "down":
                    itemX = this.x + this.width/2 - 5;
                    itemY = this.y + this.height;
                    break;
                case "up":
                    itemX = this.x + this.width/2 - 5;
                    itemY = this.y - 10;
                    break;
                case "left":
                    itemX = this.x - 10;
                    itemY = this.y + this.height/2 - 5;
                    break;
                case "right":
                    itemX = this.x + this.width;
                    itemY = this.y + this.height/2 - 5;
                    break;
            }

            ctx.fillRect(itemX, itemY, 10, 10);
        }
    }

    getItemColor() {
        switch(this.heldItem) {
            case "knife": return "silver";
            case "fireExtinguisher": return "red";
            case "pizza": return "orange";
            case "shawarma": return "tan";
            case "fries": return "yellow";
            case "soda": return "brown";
            case "dough": return "beige";
            default: return "green";
        }
    }
}