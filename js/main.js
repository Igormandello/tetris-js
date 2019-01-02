const ge = new GameEngine({ ratio: 2 / 3 }),
      input = new Input(),
      res = new Resources('assets', piecesImages);

var level = Math.floor(Math.random() * 10) + 1;

let playfield = new Playfield(ge.canvas.width, ge.canvas.height, res);
ge.addUpdateComponent(playfield.update, 'playfieldUpdate');

res.onload = () => {
  ge.start();
}