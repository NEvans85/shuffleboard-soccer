import Entity from "./entity.js";

class Rect extends Entity {
  constructor(initial_params) {
    super(initial_params);
    this.maxVelocity = initial_params[maxVelocity];
    this.height = initial_params["height"];
    this.width = initial_params["width"];
    this.fill = ititial_params["fill"];
  }

  inCollision(pos) {
    return (
      pos[0] >= this.pos[0] &&
      pos[0] <= this.pos[0] + width &&
      pos[1] >= this.pos[1] &&
      pos[1] <= this.pos[1] + height
    );
  }
}
