import { interval, gravity } from "../environment_params";

class Entity {
  constructor(initialParams) {
    const defaultParams = {
      posX: 0,
      posY: 0,
      velX: 0,
      velY: 0,
      accX: 0,
      accY: 0,
      mass: 10,
      fill: "#000000",
      owner: null
    };

    const newParams = Object.assign({}, defaultParams, initialParams);
    this.posX = newParams.posX;
    this.posY = newParams.posY;
    this.velX = newParams.velX;
    this.velY = newParams.velY;
    this.accX = newParams.accX;
    this.accY = newParams.accY;
    this.frictionCoefficient = newParams.frictionCoefficient;
    this.mass = newParams.mass;
    this.time = interval * 0.001;
    this.fill = newParams.owner.color;
  }

  get nextFrame() {
    // this.applyKineticFriction()
    [this.velX, this.velY] = this.nextVelocity();
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

  nextVelocity() {
    let velX = this.velX;
    let velY = this.velY;
    const accX = this.accX;
    const accY = this.accY;

    velX += accX * this.time;
    velY += accY * this.time;
    return [velX, velY];
  }

  accelerate(accVector) {
    let accX = this.accX;
    let accY = this.accY;
    const deltaAccX = accVector[0];
    const deltaAccY = accVector[1];

    accX += deltaAccX;
    accY += deltaAccY;
    [this.accx, this.accY] = [accX, accY];
  }

  applyKineticFriction() {
    const force = this.frictionCoefficient * gravity * this.mass;
    const dirRatio = this.velY / this.velX;
  }

  applyForce(forceVector) {
    forceX = forceVector[0];
    forceY = forceVector[1];
    accX = this.accX;
    accY = this.accY;

    accX = forceX / this.mass;
    accY = forceY / this.mass;
    this.accelerate([accX, accY]);
  }

  setPosition(newPos) {
    this.position = newPos;
  }

  setVelocity(newVel) {
    this.velocity = newVel;
  }

  setAcceleration(newAcc) {
    this.acceleration = newAcc;
  }

  setFill(newFill) {
    this.fill = newFill;
  }
}

export default Entity;
