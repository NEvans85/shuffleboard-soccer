import Environment from "./environment.js";
import { detectCollisions } from "./collision_detector";
import { render, clear } from "./render";
import { playerList } from "./game_entities";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 700;
canvas.setAttribute("style", "border: 1px solid black;");

// Initial environment population
const environment = new Environment();
environment.allEntities.forEach(entity => {
  render(context, entity);
});

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
