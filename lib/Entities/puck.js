import Circle from "./circle";

class Puck extends Circle {
  constructor(pos, owner) {
    const params = {
      radius: 40,
      mass: 20,
      posX: pos[0],
      posY: pos[1],
      frictionCoefficient: 0.4
    };
    super(params);
  }
}

export default Puck;
