import Entity from "./entity";
import Wall from "./wall";

class Circle extends Entity {
  constructor(initialParams) {
    super(initialParams);
    const defaultParams = { radius: 20 };
    const newParams = Object.assign({}, defaultParams, initialParams);
    this.radius = newParams.radius;
  }

  inCollisionWith(entity) {
    if (entity instanceof Circle) {
      const a = entity.posX - this.posX;
      const b = entity.posY - this.posY;
      const c = this.radius + entity.radius;
      return c * c <= a * a + b * b;
    } else if (entity instanceof Wall) {
    }
  }
}

export default Circle;
