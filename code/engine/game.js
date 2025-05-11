class Sprite {
    constructor() { }

    update(sprites, keys, mouse) {
        return false; // Return false to keep the sprite alive
    }

    draw(ctx) { }
}

class Level {
    constructor(game) {
        this.game = game;
    }

    initialize() { }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Keep the sprites map for type-based organization
        this.sprites = new Map();

        // Track mouse state
        this.mouse = { x: 0, y: 0, clicked: false, down: false };

        // Track keyboard state
        this.keys = {};

        // Level management
        this.levels = [];
        this.currentLevelIndex = 0;
        this.pendingLevelIndex = null;

        // Bind event handlers
        this.bindKeyboardEvents();
        this.bindMouseEvents();
    }

    // Sprite type management
    addSpriteType(type) {
        if (!this.sprites.has(type)) {
            this.sprites.set(type, []);
        }
    }

    addSprite(type, sprite) {
        if (!this.sprites.has(type)) {
            this.addSpriteType(type);
        }
        this.sprites.get(type).push(sprite);
    }

    // Level management
    addLevel(level) {
        this.levels.push(level);

        if (this.levels.length === 1) {
            this.setLevel(0);
        }
    }

    setLevel(index) {
        if (index >= 0 && index < this.levels.length) {
            // Clear all sprites
            this.sprites = new Map();
            this.currentLevelIndex = index;
            this.levels[index].initialize();
        }
    }

    changeLevel(index) {
        this.pendingLevelIndex = index;
    }

    nextLevel() {
        this.changeLevel(this.currentLevelIndex + 1);
    }

    previousLevel() {
        this.changeLevel(this.currentLevelIndex - 1);
    }

    // Game loop methods
    update() {
        // Update all sprites by type
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

        // Reset one-frame mouse events
        this.mouse.clicked = false;

        // Handle pending level change
        if (this.pendingLevelIndex !== null) {
            this.setLevel(this.pendingLevelIndex);
            this.pendingLevelIndex = null;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw all sprites
        for (let spriteArray of this.sprites.values()) {
            spriteArray.forEach(sprite => sprite.draw(this.ctx));
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    // Event handling
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