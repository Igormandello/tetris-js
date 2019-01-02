const lineScore = 2500
class LevelController {
  constructor() {
    this._score = 0;
    this._lines = 0;
  }

  get level() {
    return Math.floor(this._lines / 10) + 1;
  }

  single() {
    this._lines++;
    this._score += lineScore;
  }

  double() {
    this._lines += 2;
    this._score += 3 * lineScore;
  }

  triple() {
    this._lines += 3;
    this._score += 5 * lineScore;
  }

  tetris() {
    this._lines += 4;
    this._score += 8 * lineScore;
  }
}