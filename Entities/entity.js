import { interval } from "../environment_params";

class Entity {
  constructor(initial_params) {
    this.position = initial_params.position;
    this.velocity = initial_params.velocity;
    this.acceleration = initial_params.acceleration;
    this.mass = initial_params.mass;
    this.time = interval * 1000.0;
  }

  nextPosition() {
    let posX = this.position[0];
    let posY = this.position[1];
    const velX = this.velocity[0];
    const velY = this.velocity[1];

    posX = velX * this.time;
    posY = velY * this.time;
    return [posX, posY];
  }

  nextVelocity() {
    let velX = this.velocity[0];
    let velY = this.velocity[1];
    const accX = this.acceleration[0];
    const accy = this.acceleration[1];

    velX = accX * this.time;
    velY = accY * this.time;
    return [velX, velY];
  }

  accelerate(accVector) {
    let accX = this.acceleration[0];
    let accY = this.acceleration[1];
    const deltaAccX = accVector[0];
    const deltaAccy = accVector[1];
    accX += deltaAccX;
    accY += deltaAccY;
    return [accX, accY];
  }

  nextFrame(accVector = 0) {
    this.acceleration = this.accelerate(accVector);
    this.velocity = nextVelocity();
    this.position = nextPosition();
    return this;
  }
}

export default Entity;
