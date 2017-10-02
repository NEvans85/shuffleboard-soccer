import Circle from "./circle";

class Ball extends Circle {
  constructor(pos) {
    const params = { posX: pos[0], posY: pos[1], radius: 15, fill: "white" };
    super(params);
  }
}

export default Ball;
