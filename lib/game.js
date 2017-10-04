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

// Shoot all pucks randomly
environment.pucks.forEach(puck => {
  puck.setVelocity([Math.random() * 2000 - 1000, Math.random() * 2000 - 1000]);
});
// console.log(environment.ball);
// environment.ball[0].setVelocity([0, 500]);

// environment.pucks[3].setVelocity([-600, 0]);

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
  requestAnimationFrame(nextFrame);
};
