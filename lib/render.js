import Circle from "./Entities/circle";
import Wall from "./Entities/wall";

export const render = (context, entity) => {
  if (entity instanceof Circle) {
    context.beginPath();
    context.arc(entity.posX, entity.posY, entity.radius, 0, 2 * Math.PI, false);
    context.fillStyle = entity.fill;
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "black";
    context.stroke();
  }
  if (entity instanceof Wall) {
  }
};
