import Circle from "./Entities/circle";
import Wall from "./Entities/wall";

export const render = (context, entity) => {
  if (entity instanceof Circle) {
    console.log(`${entity.velX}, ${entity.velY}`);
    context.beginPath();
    context.arc(entity.posX, entity.posY, entity.radius, 0, 2 * Math.PI, false);
    context.fillStyle = entity.fill;
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "black";
    context.stroke();
  }
  if (entity instanceof Wall) {
    context.beginPath();
    context.moveTo(entity.posX, entity.posY);
    context.lineTo(entity.endPosX, entity.endPosY);
    context.stroke();
  }
};

export const clear = (canvas, context) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};
