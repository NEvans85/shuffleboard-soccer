import Circle from "./circle";
import Wall from "./wall";

class Ball extends Circle {
  constructor(pos) {
    const params = {
      posX: pos[0],
      posY: pos[1],
      radius: 15,
      fill: "white",
      mass: 100,
      frictionCoefficient: 0.99
    };
    super(params);
  }
}

export default Ball;
