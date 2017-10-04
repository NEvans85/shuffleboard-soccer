import Circle from "./Entities/circle";
import { resolveCollision } from "./collision_resolver";
import Ball from "./Entities/ball";

export const detectCollisions = environment => {
  const entities = environment.allEntities;
  // console.log(entities);
  const count = entities.length;
  for (var i = 0; i < count; i++) {
    for (var j = i + 1; j <= count; j++) {
      if (
        entities[i] instanceof Circle &&
        entities[i].inCollisionWith(entities[j])
      ) {
        // console.log([entities[i], entities[j]]);
        resolveCollision(entities[i], entities[j]);
      }
    }
  }
};
