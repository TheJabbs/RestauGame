
var game = new Game();
game.addSprite("ui", new Grid(16, 25, 50, game.sprites));

let time = new TimeManager()
game.addSprite("ui", time);
game.addSprite("ui", new NpcSpawner(game.sprites));

game.addSprite("character",new Hero(50, 50, 50, 50, 5));
game.addSprite("obstacle",new Obstacle(100, 100, 50, 50));
// game.addSprite("npc", new Npc(1100, 650, 50, 50, 5, 900, 600));


game.animate()
