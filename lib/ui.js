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
    this.turnInProgress = false;
    this.switchInterval = null;
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
    if (!this.movingEntities()) {
      this.environment.pucks.forEach(puck => {
        if (
          puck.owner === this.currentPlayer &&
          puck.contains([e.offsetX, e.offsetY])
        ) {
          this.dragging = true;
          this.actionPuck = puck;
          this.arrow = new Arrow([puck.posX, puck.posY]);
          this.environment.addEntity(this.arrow);
        }
      });
    }
  }

  handleMouseUp(e) {
    if (this.dragging) {
      this.environment.removeEntity(this.arrow.id);
      const velX = (this.arrow.startPosX - this.arrow.endPosX) * -5;
      const velY = (this.arrow.startPosY - this.arrow.endPosY) * -5;
      this.actionPuck.setVelocity([velX, velY]);
      this.dragging = false;
      this.arrow = null;
      this.actionPuck = null;
      const self = this;
      this.playerSwitchWatch();
    }
  }

  playerSwitchWatch() {
    const self = this;
    this.switchInterval = setInterval(() => {
      if (!self.movingEntities()) {
        self.switchPlayers();
        clearInterval(self.switchInterval);
      }
    }, 1000);
  }

  switchPlayers() {
    this.currentPlayer =
      this.currentPlayer === playerList[0] ? playerList[1] : playerList[0];
  }

  movingEntities() {
    let moving = false;
    this.environment.movingEntities.forEach(entity => {
      if (entity.velX !== 0 && entity.velY !== 0) {
        moving = true;
      }
    });
    return moving;
  }

  getCurrentPlayer() {
    return this.currentPlayer.name;
  }
}
export default UI;
