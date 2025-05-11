
var game = new Game();
//
game.addLevel(new MenuLevel(game));
game.addLevel(new GameLevel(game));

game.animate()
