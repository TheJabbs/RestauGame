
var game = new Game();
game.addSprite("ui", new Grid(16, 25, 50, game.sprites));

let time = new TimeManager()
game.addSprite("ui", time);
game.addSprite("ui", new NpcSpawner(game.sprites));

game.addSprite("character",new Hero(50, 50, 50, 50, 10));
game.addSprite("obstacle",new Obstacle(100, 100, 50, 50));
game.addSprite('ui', new StickyNote())
game.addSprite("station", new FriesStation(100, 200, 50, 50, null, 5,3));
game.addSprite("station", new TrashBin(200, 200, 50, 50, null, 5,4));
game.addSprite("station", new SodaStation(200, 100, 50, 50, null, 5,0));

game.animate()
