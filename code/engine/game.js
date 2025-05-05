class Sprite {
    constructor() { }

    update(sprite, key) { }

    draw(ctx) { }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.sprites = new Map();
        this.mouse = { x: 0, y: 0, clicked: false };



        // for set up 7eton bara
        this.sprites.set("obstacle", []);
        this.sprites.set("character", []);
        this.sprites.set("npc", []);
        this.sprites.set("station", []);
        this.sprites.set("ui", []);

        this.keys = {};
        this.bindKeyboardEvents();
        this.bindMouseEvents();

    }

    addSprite(type, sprite) {
        if (this.sprites.has(type)) {
            this.sprites.get(type).push(sprite);
        }
    }

    update() {
        for (let [type, spriteArray] of this.sprites.entries()) {
            let updatedSprites = [];
            for (let i = 0; i < spriteArray.length; i++) {
                let sprite = spriteArray[i];

                if (!sprite.update(this.sprites, this.keys, this.mouse)) {
                    updatedSprites.push(sprite);
                }
            }
            this.sprites.set(type, updatedSprites);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let spriteArray of this.sprites.values()) {
            spriteArray.forEach(sprite => sprite.draw(this.ctx));
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    bindKeyboardEvents() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        window.addEventListener('blur', () => {
            this.keys = {};
        });
    }
    bindMouseEvents() {
        this.canvas.addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            //console.log(" mousemove:" + this.mouse.x + ", " + this.mouse.y);
        });

        this.canvas.addEventListener("mousedown", () => {
            this.mouse.down = true;
            this.mouse.clicked = true; // Tracks single clicks
        });

        this.canvas.addEventListener("mouseup", () => {
            this.mouse.down = false;
        });

        this.canvas.addEventListener("mouseleave", () => {
            this.mouse.down = false;
        });
    }
}
