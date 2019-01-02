const ge = new GameEngine({ ratio: 2 / 3 }),
      input = new Input(),
      res = new Resources('assets', piecesImages);

let playfield = new Playfield(ge.canvas.width, ge.canvas.height);
ge.addUpdateComponent(playfield.update, 'playfieldUpdate');

res.onload = () => {
  ge.start();
}