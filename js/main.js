const ge = new GameEngine({ ratio: 9 / 16 }),
      input = new Input(keyUpdate),
      res = new Resources('assets', []);

function keyUpdate(event) {

}

res.onload = () => {
  console.log('loaded');
}