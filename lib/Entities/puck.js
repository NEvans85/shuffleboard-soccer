class Puck extends Circle {
  constructor(pos) {
    const params = {
      radius: 40,
      mass: 20,
      posX: pos[0],
      posY: pos[1]
    };
    super(params);
  }
}
