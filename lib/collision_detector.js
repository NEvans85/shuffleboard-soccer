import Circle from "./Entities/circle";
import { resolveCollision } from "./collision_resolver";
import Ball from "./Entities/ball";

export const handleCollisions = environment => {
  const entities = environment.allEntities;
  const count = entities.length;
  for (var i = 0; i < count; i++) {
    for (var j = i; j < count; j++) {
      // if (entities[i] instanceof Ball) {
      //   console.log(entities[i]);
      //   console.log(entities[i] instanceof Circle);
      //   console.log(entities[j]);
      // }
      if (
        i !== j &&
        entities[i] instanceof Circle &&
        entities[i].inCollisionWith(entities[j])
      ) {
        resolveCollision(entities[i], entities[j]);
      }
    }
  }
};
