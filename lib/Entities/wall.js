import Entity from "./entity.js";

class Wall extends Entity {
  constructor(startPos, endPos, dir) {
    const params = { posX: startPos[0], posY: startPos[1] };
    super(params);
    this.endPosX = endPos[0];
    this.endPosY = endPos[1];
    this.dir = dir;
  }
}

export default Wall;
