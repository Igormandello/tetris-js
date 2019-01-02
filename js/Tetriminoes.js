const piecesImages = [
  'piece1.png',
  'piece2.png'
];

class Tetriminoes {
  constructor(resources) {
    this._r = resources;

    this._pieces = {
      I: {
        piece: [
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
          ], [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
          ]
        ],
        pieceScheme: 0,
        colorScheme: 0
      },
      O: {
        piece: [
          [
            [1, 1],
            [1, 1]
          ]
        ],
        pieceScheme: 0,
        colorScheme: 0
      },
      J: {
        piece: [
          [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
          ], [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
          ], [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
          ], [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
          ]
        ],
        pieceScheme: 1,
        colorScheme: 0
      }
    };

    let blue = '#0058f8',
        lightBlue = '#3cbcfc'
        green = '#00a800',
        lightGreen = '#58d854',
        lime = '#b8f818',
        teal = '#58f898',
        pink = '#d800cc',
        lightPink = '#f878f8',
        red = '#e40058',
        indigo = '#6888fc',
        orange = '#f83800',
        purple = '#6844fc',
        maroon = '#a80020',
        grey = '#7c7c7c',
        yellow = '#fca044';

    this._levelColors = [
      [
        blue, lightBlue
      ], [
        green, lime
      ], [
        pink, lightPink
      ], [
        blue, lightGreen
      ], [
        red, teal
      ], [
        teal, indigo
      ], [
        orange, grey
      ], [
        purple, maroon
      ], [
        blue, orange
      ], [
        orange, yellow
      ]
    ];
  }

  drawCell(ctx, x, y, size, pieceScheme, colorScheme, level) {
    let color = this._levelColors[(level % 10) - 1][colorScheme];

    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);

    ctx.drawImage(this._r.images[piecesImages[pieceScheme]], x, y, size, size);
  }
}