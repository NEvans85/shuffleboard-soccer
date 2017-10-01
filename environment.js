class Environment {
  constructor() {
    this.entities = {};
    this.newEntitiesId = 0;
  }

  addEntity(entity) {
    id = newEntitiesId;
    this.entities[id] = entity;
    this.newEntitiesId += 1;
    return id;
  }

  removeEntity(entityId) {
    deleted = this.entities[entityId];
    delete this.entities[entityId];
    return deleted;
  }

  allEntities() {
    Object.values(this.entities);
  }

  displayEntities() {}
}
