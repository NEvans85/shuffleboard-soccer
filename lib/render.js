export const render = (context, object) => {
  if (object instanceof Circle) {
    context.beginPath();
    context.arc(object.posX, object.posY, object.radius, 0, 2 * Math.PI, false);
    context.fillStyle = object.fill;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();
  }
};
