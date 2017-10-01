import { interval, gravity } from "../environment_params";

class Entity {
  constructor(initialParams) {
    const defaultParams = {
      position: [0, 0],
      velocity: [0, 0],
      acceleration: [0, 0],
      frictionCoefficient: 0.4,
      maxVelocity: 500,
      mass: 1,
      fill: "#000000"
    };
    const newParams = Object.assign({}, defaultParams, initialParams);
    this.position = newParams.position;
    this.velocity = newParams.velocity;
    this.acceleration = newParams.acceleration;
    this.maxVelocity = newParams.maxVelocity;
    this.frictionCoefficient = newParams.frictionCoefficient;
    this.mass = newParams.mass;
    this.time = interval * 0.001;
    this.fill = newParams.fill;
  }

  get nextFrame() {
    this.velocity = this.nextVelocity();
    this.position = this.nextPosition();
    return this;
  }

  nextPosition() {
    let posX = this.position[0];
    let posY = this.position[1];
    const velX = this.velocity[0];
    const velY = this.velocity[1];

    posX += velX * this.time;
    posY += velY * this.time;
    return [posX, posY];
  }

  nextVelocity() {
    let velX = this.velocity[0];
    let velY = this.velocity[1];
    const accX = this.acceleration[0];
    const accY = this.acceleration[1];

    velX += accX * this.time;
    velY += accY * this.time;
    return [velX, velY];
  }

  accelerate(accVector) {
    let accX = this.acceleration[0];
    let accY = this.acceleration[1];
    const deltaAccX = accVector[0];
    const deltaAccY = accVector[1];

    accX += deltaAccX;
    accY += deltaAccY;
    this.acceleration = [accX, accY];
  }

  applyKineticFriction() {
    const force = this.frictionCoefficient * gravity * this.mass;
  }

  applyForce(forceVector) {
    forceX = forceVector[0];
    forceY = forceVector[1];
    accX = this.acceleration[0];
    accY = this.acceleration[1];

    accX = forceX / this.mass;
    accY = forceY / this.mass;
    this.acceleration = [accX, accY];
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

  setMass(newMass) {
    this.mass = newMass;
  }

  setFill(newFill) {
    this.fill = newFill;
  }
}

export default Entity;
