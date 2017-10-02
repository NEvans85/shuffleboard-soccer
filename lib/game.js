import Environment from "./environment.js";
import { render, clear } from "./render";
import { playerList } from "./game_entities";
import { interval } from "./environment_params";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 700;
canvas.setAttribute("style", "border: 1px solid black;");
const environment = new Environment();

// Initial environment population
environment.allEntities.forEach(entity => {
  render(context, entity);
});

const nextFrame = () => {
  clear(canvas, context);
  environment.allEntities.forEach(entity => {
    entity.nextFrame;
    render(context, entity);
  });
};

setInterval(nextFrame, interval);
