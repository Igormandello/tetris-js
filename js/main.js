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
        if (evt.type === 'keydown')
          playfield.moveLeft();
        else
          playfield.releaseLeft();
        break;

      case Keys.RIGHT.keyCode:
        if (evt.type === 'keydown')
          playfield.moveRight();
        else
          playfield.releaseRight();
        break;

      case Keys.UP.keyCode:
        break;

      case Keys.DOWN.keyCode:
        if (evt.type === 'keydown')
          playfield.speedDrop();
        break;
    }
  }
})();