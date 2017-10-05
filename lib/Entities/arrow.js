class Arrow {
  constructor(pos) {
    this.startPosX = pos[0];
    this.startPosY = pos[1];
    this.endPosX = pos[0];
    this.endPosY = pos[1];
  }

  setEndPos(pos) {
    this.endPosX = pos[0];
    this.endPosY = pos[1];
  }
}

export default Arrow;
