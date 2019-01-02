class Playfield {
  constructor(availableWidth, availableHeight, r) {
    this._rows = 20;
    this._cols = 10;

    this._padding = 2;
    availableWidth -= this._cols * 2 * this._padding + 20;
    availableHeight -= this._rows * 2 * this._padding + 20;
    
    this._cellSize = Math.floor(availableHeight / this._rows);
    if (this._cellSize * this._cols > availableWidth)
      this._cellSize = Math.floor(availableWidth / this._cols);

    this._w = this._cols * (this._cellSize + 2 * this._padding);
    this._h = this._rows * (this._cellSize + 2 * this._padding);

    this._tetriminoes = new Tetriminoes(r);
    this._field = [];
    for (let y = 0; y < this._rows; y ++)
      this._field.push(Array(this._cols).fill(-1));

    this._levelController = new LevelController();
  }

  get update() {
    return this._update.bind(this);
  }

  showdownPieces(rotation) {
    this._resetField();

    let currentTetrimino = 0;
    for (let y = 0; y < this._rows; y += 5) {
      for (let x = 0; x < this._cols; x += 5) {
        let t = this._tetriminoes._pieces[currentTetrimino];
        if (t) {
          let piece = t.piece[rotation % t.piece.length];

          for (let ty = 0; ty < 5; ty++) {
            if (piece[ty])
              for (let tx = 0; tx < 5; tx++)
                if (piece[ty][tx])
                  this._field[y + ty][x + tx] = {
                    pieceScheme: t.pieceScheme,
                    colorScheme: t.colorScheme
                  };
          }
        }

        currentTetrimino++;
      }
    }
  }

  _update(ctx) {
    ctx.fillStyle = '#56A';
    ctx.fillRect(0, 0, this._w + 20, this._h + 20);

    ctx.fillStyle = '#000';
    ctx.fillRect(10, 10, this._w, this._h);

    for (let y = 0; y < this._rows; y++)
      for (let x = 0; x < this._cols; x++)
        if (this._field[y][x] !== -1) {
          this._tetriminoes.drawCell(
            ctx,
            11 + x * (2 * this._padding + this._cellSize),
            11 + y * (2 * this._padding + this._cellSize),
            this._cellSize,
            this._field[y][x].pieceScheme,
            this._field[y][x].colorScheme,
            this._levelController.level
          );
        }
  }

  _resetField() {
    for (let y = 0; y < this._rows; y ++)
      this._field[y].fill(-1);
  }
}