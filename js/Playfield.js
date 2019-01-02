class Playfield {
  constructor(availableWidth, availableHeight) {
    this._rows = 20;
    this._cols = 10;

    availableWidth -= this._cols * 2 + 20;
    availableHeight -= this._rows * 2 + 20;
    
    this._cellSize = Math.floor(availableHeight / this._rows);
    if (this._cellSize * this._cols > availableWidth)
      this._cellSize = Math.floor(availableWidth / this._cols);

    this._w = this._cols * (this._cellSize + 2);
    this._h = this._rows * (this._cellSize + 2);

    this._field = [];
    for (let y = 0; y < this._rows; y++) {
      let row = [];
      for (let x = 0; x < this._cols; x++)
        if (Math.random() * y > 5)
          row.push(Math.floor(Math.random() * 3));
        else
          row.push(-1);

      this._field.push(row);
    }

    console.log(this._field);
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
        if (this._field[y][x] > -1) {
          switch (this._field[y][x]) {
            case 0:
              ctx.fillStyle = '#BBB';
              break;

            case 1:
              ctx.fillStyle = '#DDD';
              break;
              
            case 2:
              ctx.fillStyle = '#FFF';
              break;

            default:
              ctx.fillStyle = '#000';
              break;
          }
 
          ctx.fillRect(11 + x * (2 + this._cellSize), 11 + y * (2 + this._cellSize), this._cellSize, this._cellSize);
        }
  }
}