import Puck from "./Entities/puck";
import Ball from "./Entities/ball";

class Environment {
  constructor() {
    this.entities = {};
    this.newEntitiesId = 0;
  }

  addEntity(entity) {
    const id = this.newEntitiesId;
    entity.id = id;
    this.entities[id] = entity;
    this.newEntitiesId += 1;
    return id;
  }

  removeEntity(entityId) {
    deleted = this.entities[entityId];
    delete this.entities[entityId];
    return deleted;
  }

  get allEntities() {
    return Object.values(this.entities);
  }

  get pucks() {
    return this.allEntities.filter(entity => {
      return entity instanceof Puck;
    });
  }

  get ball() {
    return this.allEntities.filter(entity => {
      return entity instanceof Ball;
    });
  }
}

export default Environment;
