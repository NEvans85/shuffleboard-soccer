import { entityList } from "./game_entities";

class Environment {
  constructor() {
    this.entities = {};
    this.newEntitiesId = 0;
    entityList.forEach(entity => this.addEntity(entity));
    console.log(this.entities);
  }

  addEntity(entity) {
    const id = this.newEntitiesId;
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
}

export default Environment;
