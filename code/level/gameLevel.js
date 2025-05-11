class GameLevel extends Level {
    constructor(game) {
        super(game);
    }

    initialize() {
        this.game.addSpriteType("obstacle");

        this.game.addSpriteType("ui");
        this.game.addSpriteType("character");
        this.game.addSpriteType("npc");
        this.game.addSpriteType("station");


        // Add UI elements
        this.game.addSprite("ui", new Grid(16, 25, 50, this.game.sprites));

        let time = new TimeManager();
        this.game.addSprite("ui", time);
        this.game.addSprite("ui", new NpcSpawner(this.game.sprites));
        this.game.addSprite("ui", new StarRating(1050, 32, 5, 30));
        this.game.addSprite("ui", new StickyNote());
        this.game.addSprite("ui", new IngrediantMenu(1300, 450, 200, 400));
        this.game.addSprite("ui", new PizzaFormulaMenu(1500, 450, 200, 400));

        // Add player character
        this.game.addSprite("character", new Hero(550, 250, 50, 50, 10));

        // Add stations - Fries
        this.game.addSprite("station", new FriesStation(150, 200, 100, 50, null, 5, 3));
        this.game.addSprite("station", new FriesStation(350, 200, 100, 50, null, 5, 3));

        // Add trash bin
        this.game.addSprite("station", new TrashBin(500, 50, 100, 50, null, 5, 4));

        // Add soda stations
        this.game.addSprite("station", new SodaStation(150, 50, 50, 50, null, 5, 0));
        this.game.addSprite("station", new SodaStation(250, 50, 50, 50, null, 5, 0));
        this.game.addSprite("station", new SodaStation(350, 50, 50, 50, null, 5, 0));

        // Add shawarma stations
        this.game.addSprite("station", new ShawarmaStation(100, 350, 50, 100, null, 5, 10));
        this.game.addSprite("station", new ShawarmaTable(150, 350, 100, 50, null, 5, 0));
        this.game.addSprite("station", new ShawarmaStation(400, 350, 50, 100, null, 5, 10));
        this.game.addSprite("station", new ShawarmaTable(450, 350, 100, 50, null, 5, 0));

        // Add pizza stations
        this.game.addSprite("station", new PizzaOven(700, 50, 100, 100, null, 5, 10));
        this.game.addSprite("station", new PizzaTable(800, 50, 100, 50, null, 5, 0));
        this.game.addSprite("station", new PizzaOven(1000, 50, 100, 100, null, 5, 10));
        this.game.addSprite("station", new PizzaTable(1100, 50, 100, 50, null, 5, 0));
        this.game.addSprite("station", new PizzaOven(700, 250, 100, 100, null, 5, 10));
        this.game.addSprite("station", new PizzaTable(800, 250, 100, 50, null, 5, 0));
        this.game.addSprite("station", new PizzaOven(1000, 250, 100, 100, null, 5, 10));
        this.game.addSprite("station", new PizzaTable(1100, 250, 100, 50, null, 5, 0));

        // Add fire extinguisher
        this.game.addSprite("station", new Extinguisher(1150, 500, 50, 100, null, 5, 7));
    }
}
