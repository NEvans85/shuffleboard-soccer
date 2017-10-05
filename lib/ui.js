import Arrow from "./Entities/arrow";

class UI {
  constructor(canvas, context, players, environment) {
    this.canvas = canvas;
    this.context = context;
    this.environment = environment;
    this.mouseX = 0;
    this.mouseY = 0;
    this.dragging = false;
    this.actionPuck = false;
    this.arrow = null;
    this.currentPlayer = players[0];
  }

  updateMousePos(e) {
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
    if (this.dragging) {
      const endPosX =
        this.actionPuck.posX + (this.actionPuck.posX - this.mouseX);
      const endPosY =
        this.actionPuck.posY + (this.actionPuck.posY - this.mouseY);
      this.arrow.setEndPos([endPosX, endPosY]);
    }
  }

  handleMouseDown(e, currentPlayer) {
    console.log(this.environment);
    this.environment.pucks.forEach(puck => {
      if (
        puck.owner === currentPlayer &&
        puck.contains([e.offsetX, e.offsetY])
      ) {
        this.dragging = true;
        this.actionPuck = puck;
        this.arrow = new Arrow([puck.posX, puck.posY]);
        this.environment.addEntity(this.arrow);
      }
    });
  }

  handleMouseUp(e) {
    this.environment.removeEntity(this.arrow.id);
    const velX = (this.arrow.startPosX - this.arrow.endPosX) * -5;
    const velY = (this.arrow.startPosY - this.arrow.endPosY) * -5;
    this.actionPuck.setVelocity([velX, velY]);
  }
}

export default UI;
