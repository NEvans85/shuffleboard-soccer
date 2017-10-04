import Environment from "./environment.js";
import { gameEntities } from "./game_entities";
import { detectCollisions } from "./collision_detector";
import { resolveCollision } from "./collision_resolver";
import { render, clear } from "./render";
import { playerList } from "./game_entities";

// Build and place the game area
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 700;
canvas.setAttribute("style", "border: 1px solid black;");

// Initial environment population
const environment = new Environment();
gameEntities.forEach(entity => {
  environment.addEntity(entity);
});
console.log(environment.allEntities);
environment.allEntities.forEach(entity => {
  render(context, entity);
});

// environment.pucks[0].setVelocity([600, 400]);
// environment.pucks[4].setVelocity([-300, 600]);

window.requestAnimationFrame(() => {
  nextFrame();
});
const nextFrame = () => {
  clear(canvas, context);
  environment.allEntities.forEach(entity => {
    entity.nextFrame;
    render(context, entity);
  });
  const collisions = detectCollisions(environment);
  collisions.forEach(collidingEntities => {
    // console.log(collidingEntities);
    resolveCollision(collidingEntities[0], collidingEntities[1]);
  });
  // console.log(environment.pucks[0]);
  requestAnimationFrame(nextFrame);
};
