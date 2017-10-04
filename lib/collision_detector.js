import Circle from "./Entities/circle";
import { resolveCollision } from "./collision_resolver";

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
        resolveCollision(entities[i], entities[j]);
      }
    }
  }
  return collisions;
};
