import Environment from "./environment.js";
import Puck from "./Entities/circle.js";
import { render } from "./render"

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;
canvas.setAttribute("style", "border: 1px solid black;");


Environment.allEntities forEach(entity => {

})
