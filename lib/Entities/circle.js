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
      if (entity.posX === entity.endPosX) {
        return (
          this.posX + this.radius >= entity.posX ||
          this.posX - this.radius <= entity.posX
        );
      } else {
        return (
          this.posY + this.radius >= entity.posY ||
          this.posY - this.radius <= entity.posY
        );
      }
    }
  }
}

export default Circle;
