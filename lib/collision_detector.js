import Circle from "./Entities/circle";

export const detectCollisions = environment => {
  const entities = environment.allEntities;
  const count = entities.length;
  const collisions = [];
  for (var i = 0; i < count; i++) {
    for (var j = i + 1; j < count - 1; j++) {
      if (
        entities[i] instanceof Circle &&
        entities[i].inCollisionWith(entities[j])
      ) {
        collisions.push([entities[i], entities[j]]);
        // console.log(collisions);
      }
    }
  }
  return collisions;
};
