class Playfield {
  constructor(availableWidth, availableHeight, gameEngine, r) {
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

    this._ge = gameEngine;
    this._ge.addAnimationComponent(this._dropPiece.bind(this), 48, 'dropPiece');

    let tetrimino = this._tetriminoes.generateTetrimino();
    this._dropping = {
      x: Math.floor((this._cols - tetrimino.piece[0][0].length) / 2),
      y: 0,
      piece: tetrimino,
      size: tetrimino.piece[0][0].length,
      rotation: 0
    }
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

  moveLeft() {
    for (let x = 0; x < this._dropping.size; x++)
      for (let y = 0; y < this._dropping.size; y++)
        if (this._dropping.piece.piece[this._dropping.rotation][y][x])
          if (this._dropping.x + x == 0 || this._field[y + this._dropping.y][x + this._dropping.x - 1] !== -1)
            return;

    this._dropping.x--;
  }

  releaseLeft() {

  }

  moveRight() {
    for (let x = this._dropping.size - 1; x >= 0; x--)
      for (let y = 0; y < this._dropping.size; y++)
        if (this._dropping.piece.piece[this._dropping.rotation][y][x])
          if (this._dropping.x + x == this._cols - 1 || this._field[y + this._dropping.y][x + this._dropping.x + 1] !== -1)
            return;

    this._dropping.x++;
  }

  releaseRight() {

  }

  speedDrop() {
    this._dropPiece();
  }

  _dropPiece() {
    for (let y = this._dropping.size - 1; y >= 0; y--)
      for (let x = 0; x < this._dropping.size; x++) {
        if (this._dropping.piece.piece[this._dropping.rotation][y][x]) {
          if (this._dropping.y + y == this._rows - 1 || this._field[y + this._dropping.y + 1][x + this._dropping.x] !== -1)
            this._lockPiece(this._dropping);
        }
      }

    this._dropping.y++;
  }

  _lockPiece() {
    for (let y = 0; y < this._dropping.size; y++)
      for (let x = 0; x < this._dropping.size; x++)
        if (this._dropping.piece.piece[this._dropping.rotation][y][x])
          this._field[y + this._dropping.y][x + this._dropping.x] = {
            colorScheme: this._dropping.piece.colorScheme,
            pieceScheme: this._dropping.piece.pieceScheme
          };

    let tetrimino = this._tetriminoes.generateTetrimino();
    this._dropping = {
      x: Math.floor((this._cols - tetrimino.piece[0][0].length) / 2),
      y: 0,
      piece: tetrimino,
      size: tetrimino.piece[0][0].length,
      rotation: 0
    };
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

    for (let y = 0; y < this._dropping.size; y++)
        for (let x = 0; x < this._dropping.size; x++)
          if (this._dropping.piece.piece[this._dropping.rotation][y][x])
            this._tetriminoes.drawCell(
              ctx,
              11 + (x + this._dropping.x) * (2 * this._padding + this._cellSize),
              11 + (y + this._dropping.y) * (2 * this._padding + this._cellSize),
              this._cellSize,
              this._dropping.piece.pieceScheme,
              this._dropping.piece.colorScheme,
              this._levelController.level
            );
  }

  _resetField() {
    for (let y = 0; y < this._rows; y ++)
      this._field[y].fill(-1);
  }
}