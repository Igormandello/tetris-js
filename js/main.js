var level = Math.floor(Math.random() * 10) + 1;

(() => {
  const ge = new GameEngine({ ratio: 2 / 3 }),
        input = new Input(),
        res = new Resources('assets', piecesImages);

  let playfield = new Playfield(ge.canvas.width, ge.canvas.height, res);
  ge.addUpdateComponent(playfield.update, 'playfieldUpdate');

  let rotation = 0;
  ge.addAnimationComponent(() => {
    playfield.showdownPieces(++rotation);
  }, 60, 'showdownRotation');

  res.onload = () => {
    ge.start();
    playfield.showdownPieces(0);
  }
})();