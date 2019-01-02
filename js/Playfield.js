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

    this._tetrominoes = new Tetriminoes(r);
    this._field = [];
    for (let y = 0; y < this._rows; y++) {
      let row = [];
      for (let x = 0; x < this._cols; x++)
        if (Math.random() * y > 5)
          row.push(this._tetrominoes.generateTetrimino());
        else
          row.push(-1);

      this._field.push(row);
    }
  }

  get update() {
    return this._update.bind(this);
  }

  _update(ctx) {
    ctx.fillStyle = '#56A';
    ctx.fillRect(0, 0, this._w + 20, this._h + 20);

    ctx.fillStyle = '#000';
    ctx.fillRect(10, 10, this._w, this._h);

    for (let y = 0; y < this._rows; y++)
      for (let x = 0; x < this._cols; x++)
        if (this._field[y][x] !== -1) {
          this._tetrominoes.drawCell(ctx, 11 + x * (2 * this._padding + this._cellSize), 11 + y * (2 * this._padding + this._cellSize), this._cellSize, this._field[y][x].pieceScheme, this._field[y][x].colorScheme, level);
        }
  }
}