import Entity from "./entity.js";

class Wall extends Entity {
  constructor(initialParams) {
    super(initialParams);
    const defaultParams = {
      endPosX: 0,
      endPosY: 0,
      immobile: true
    };
  }
}

export default Wall;
