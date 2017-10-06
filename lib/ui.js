import Arrow from "./Entities/arrow";
import { playerList } from "./game_entities";

class UI {
  constructor(environment) {
    this.environment = environment;
    this.mouseX = 0;
    this.mouseY = 0;
    this.dragging = false;
    this.actionPuck = false;
    this.arrow = null;
    this.currentPlayer = playerList[0];
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
    this.environment.pucks.forEach(puck => {
      if (
        !this.movingPucks() &&
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
    if (this.dragging) {
      this.environment.removeEntity(this.arrow.id);
      this.dragging = false;
      const velX = (this.arrow.startPosX - this.arrow.endPosX) * -5;
      const velY = (this.arrow.startPosY - this.arrow.endPosY) * -5;
      this.actionPuck.setVelocity([velX, velY]);
      this.arrow = null;
      this.actionPuck = null;
    }
  }

  movingPucks() {
    moving = false;
    this.enviroment.pucks.forEach(puck => {
      if (puck.velX !== 0 && puck.velY !== 0) {
        moving = true;
      }
    });
    return moving;
  }

  switchPlayers() {}
}

export default UI;
