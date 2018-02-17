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
    context.strokeStyle = "grey";
    for (var i = 1; i <= 6; i++) {
      let posX = entity.posX + entity.width / 7 * i;
      context.beginPath();
      context.moveTo(posX, entity.posY);
      context.lineTo(posX, entity.posY + entity.height);
      context.stroke();
    }
    for (var i = 0; i < 15; i++) {
      let posY = entity.posY + entity.height / 15 * i;
      context.beginPath();
      context.moveTo(entity.posX, posY);
      context.lineTo(entity.posX + entity.width, posY);
      context.stroke();
    }
  } else if (entity instanceof Arrow) {
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.moveTo(entity.startPosX, entity.startPosY);
    context.lineTo(entity.endPosX, entity.endPosY);
    context.stroke();
  }
};

export const renderBackground = (context, images) => {
  images.forEach(image => {
    context.drawImage(image.image, image.posX, image.posY);
  });
};

export const renderImage = (context, image) => {
  context.drawImage(iname.image, image.posX, image.posY);
};

export const renderScore = (context, score, currentPlayer) => {
  context.beginPath();
  context.arc(290, 63, 25, 0, 2 * Math.PI, false);
  context.fillStyle = "red";
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = "black";
  context.stroke();

  context.beginPath();
  context.arc(710, 63, 25, 0, 2 * Math.PI, false);
  context.fillStyle = "blue";
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = "black";
  context.stroke();

  context.font = "36px sans-serif";
  context.fillStyle = "white";
  context.fillText(`${score["Red Player"]}`, 280, 75);
  context.fillText(`${score["Blue Player"]}`, 700, 75);
  context.fillText(`${currentPlayer}'s Turn`, 350, 75);
};

export const clear = (canvas, context) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};
