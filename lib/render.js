import Circle from "./Entities/circle";
import Wall from "./Entities/wall";
import Zone from "./Entities/zone";
import Arrow from "./Entities/arrow";

export const render = (context, entity) => {
  if (entity instanceof Circle) {
    context.beginPath();
    context.arc(entity.posX, entity.posY, entity.radius, 0, 2 * Math.PI, false);
    context.fillStyle = entity.fill;
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "black";
    context.stroke();
  } else if (entity instanceof Wall) {
    context.beginPath();
    context.moveTo(entity.posX, entity.posY);
    context.lineTo(entity.endPosX, entity.endPosY);
    context.stroke();
  } else if (entity instanceof Zone) {
    context.beginPath();
    context.rect(entity.posX, entity.posY, entity.width, entity.height);
    context.fillStyle = entity.fill;
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
  } else if (entity instanceof Arrow) {
    context.beginPath();
    context.moveTo(entity.startPosX, entity.startPosY);
    context.lineTo(entity.endPosX, entity.endPosY);
    context.stroke();
  }
};

export const clear = (canvas, context) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};
