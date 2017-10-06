import Circle from "./circle";

class Puck extends Circle {
  constructor(pos, owner) {
    const params = {
      radius: 25,
      mass: 100,
      posX: pos[0],
      posY: pos[1],
      frictionCoefficient: 0.985,
      owner: owner,
      fill: owner.color
    };
    super(params);
  }
}

export default Puck;
