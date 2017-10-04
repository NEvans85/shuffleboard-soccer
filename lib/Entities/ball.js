import Circle from "./circle";

class Ball extends Circle {
  constructor(pos) {
    const params = {
      posX: pos[0],
      posY: pos[1],
      radius: 15,
      fill: "white",
      mass: 5,
      frictionCoefficient: 0.993
    };
    super(params);
  }
}

export default Ball;
