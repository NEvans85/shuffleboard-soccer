import Environment from "./environment.js";
import { render, clear } from "./render";
import { playerList } from "./game_entities";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 700;
canvas.setAttribute("style", "border: 1px solid black;");

// Initial environment population
const environment = new Environment();
environment.allEntities.forEach(entity => {
  render(context, entity);
});

let startTime;
let nextTime = 0;
window.requestAnimationFrame(timeStamp => {
  startTime = timeStamp || new Date().getTime();
  nextFrame(timeStamp);
});
const nextFrame = timeStamp => {
  startTime = timeStamp;
  const runTime = 33;

  clear(canvas, context);
  environment.allEntities.forEach(entity => {
    entity.nextFrame(runTime);
    render(context, entity);
  });
  console.log(runTime);
  nextTime = new Date().getTime();
  window.requestAnimationFrame(nextFrame);
};
