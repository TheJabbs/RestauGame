class MenuLevel extends Level {
    constructor(game) {
        super(game);
    }

    initialize() {
        // Initialize sprite types for UI
        this.game.addSpriteType("ui");

        // Add the start menu with canvas dimensions
        const canvas = this.game.canvas;
        this.game.addSprite("ui", new StartMenu(0, 0, canvas.width, canvas.height));

        // Add a listener to detect when the start button is clicked
        this.game.addSprite("ui", new Walker("resources/assets/firefighter.png", 0, 0, 2050, 340, 180, 5));
    }
}