import Entity from "./entity.js";

class Wall extends Entity {
  constructor(startPos, endPos) {
    const params = { posX: startPos[0], posY: startPos[1] };
    super(params);
    this.endPosX = endPos[0];
    this.endPosY = endPos[1];
  }
}

export default Wall;
