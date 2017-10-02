import Entity from "./entity.js";

class Circle extends Entity {
  constructor(initialParams) {
    super(initialParams);
    const defaultParams = { radius: 20 };
    const newParams = Object.assign({}, defaultParams, initialParams);
    this.radius = newParams.radius;
  }

  inCollision(pos) {
    const a = pos[0] - this.pos[0];
    const b = pos[1] - this.pos[1];
    const c = this.radius;
    return c * c <= a * a + b * b;
  }
}

export default Circle;
