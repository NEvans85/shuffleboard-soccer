class Entity {
  constructor(initialParams) {
    const defaultParams = {
      posX: 0,
      posY: 0,
      velX: 0,
      velY: 0,
      mass: 0,
      fill: "#000000",
      owner: null
    };

    const newParams = Object.assign({}, defaultParams, initialParams);
    this.posX = newParams.posX;
    this.posY = newParams.posY;
    this.initPosX = newParams.posX;
    this.initPosY = newParams.posY;
    this.velX = newParams.velX;
    this.velY = newParams.velY;
    this.frictionCoefficient = newParams.frictionCoefficient;
    this.mass = newParams.mass;
    this.fill = newParams.fill;
    this.time = 16 / 1000;
    this.owner = newParams.owner;
  }

  get nextFrame() {
    if (this.velX !== 0 || this.velY !== 0) {
      this.applyKineticFriction();
    }
    [this.posX, this.posY] = this.nextPosition();
    return this;
  }

  nextPosition() {
    let posX = this.posX;
    let posY = this.posY;
    const velX = this.velX;
    const velY = this.velY;

    posX += velX * this.time;
    posY += velY * this.time;
    return [posX, posY];
  }

  applyKineticFriction() {
    this.velX *= this.frictionCoefficient;
    this.velY *= this.frictionCoefficient;

    if (Math.abs(this.velX) < 5) {
      this.velX = 0;
    }
    if (Math.abs(this.velY) < 5) {
      this.velY = 0;
    }
  }

  setPosition(newPos) {
    this.posX = newPos[0];
    this.posY = newPos[1];
  }

  setVelocity(newVel) {
    this.velX = newVel[0];
    this.velY = newVel[1];
  }

  reset() {
    this.posX = this.initPosX;
    this.posY = this.initPosY;
    this.velX = 0;
    this.velY = 0;
  }
}

export default Entity;
