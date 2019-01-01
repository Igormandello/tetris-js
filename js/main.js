const ge = new GameEngine({ ratio: 2 / 3 }),
      input = new Input(),
      res = new Resources('assets', []);

let playfield = new Playfield(ge.canvas.width, ge.canvas.height, generatePiece);
ge.addUpdateComponent(playfield.update, 'playfieldUpdate');

function generatePiece() {

}

res.onload = () => {
  ge.start();
}