import Entity from "./entity.js";

class Rect extends Entity {
  constructor(initialParams) {
    super(initialParams);
    const defaultParams = { height: 40, width: 40 };
    const newParams = Object.assign({}, defaultParams, initialParams);
    this.height = newParams.height;
    this.width = newParams.width;
  }

  // inCollision(pos) {
  //   return (
  //     pos[0] >= this.pos[0] &&
  //     pos[0] <= this.pos[0] + width &&
  //     pos[1] >= this.pos[1] &&
  //     pos[1] <= this.pos[1] + height
  //   );
  // }
}
