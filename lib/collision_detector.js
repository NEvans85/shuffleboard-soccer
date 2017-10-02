class CollisionDetector {
  constructor(environment) {
    this.entities = environment.allEntities;
  }

  detect(environment) {
    const count = this.entities.length;
    for (var i = 0; i < count; i++) {
      for (var j = i + 1; j < count; j++) {}
    }
  }
}
