(() => {
  const ge = new GameEngine({ ratio: 2 / 3 }),
        input = new Input(handleKey),
        res = new Resources('assets', piecesImages);

  let playfield = new Playfield(ge.canvas.width, ge.canvas.height, ge, res);
  ge.addUpdateComponent(playfield.update, 'playfieldUpdate');

  let loaded = false;
  res.onload = () => {
    ge.start();
    loaded = true;
  }

  function handleKey(evt) {
    switch(evt.keyCode) {
      case Keys.LEFT.keyCode:
        break;

      case Keys.RIGHT.keyCode:
        break;

      case Keys.UP.keyCode:
        break;
    }
  }
})();