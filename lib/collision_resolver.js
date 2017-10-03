import Circle from "./Entities/circle";
import Wall from "./Entities/wall";

export const resolveCollision = (circle, other) => {
  // const [pocX, pocY] = findPointOfContact(circle, other);
  if (other instanceof Circle) {
    resolveCirCirCollision(circle, other);
  } else if (other instanceof Wall) {
    resolveCirWallCollision(circle, other);
  }
};

const resolveCirCirCollision = (circle1, circle2) => {
  const norm = findNorm(circle, other);
  const p = findMassVelRelation(circle1, circle2, norm);
  calcNewVel(circle1, circle2, p, norm);
};

const calcNewVel = (circle1, circle2, p, norm) => {
  circle1.velX = circle1.velX - p * circle1.mass * norm[0];
  circle1.velY = circle1.velY - p * circle1.mass * norm[0];
  circle2.velX = circle2.velX - p * circle2.mass * norm[0];
  circle2.velY = circle2.velY - p * circle2.mass * norm[0];
};

const findMassVelRelation = (circle1, circle2, norm) => {
  return (
    2 *
    (circle1.velX * norm[0] +
      circle1.velY * norm[1] -
      circle2.velX * norm[0] -
      circle2.velY * norm[1]) /
    (circle1.mass + circle2.mass)
  );
};

const findNorm = (circle, other) => {
  const distBetween = findDistBetween(circle, other);
  const normX = (other.posX - circle.posX) / distBetween;
  const normY = (other.posY - circle.posY) / distBetween;
  return [normX, normY];
};

const findDistBetween = (circle, other) => {
  return Math.sqrt(
    (circle.posX - other.posX) * (circle.posX - other.posX) +
      (circle.posY - other.posY) * (circle.posY - other.posY)
  );
};

const resolveCirWallCollision = (circle, wall) => {
  if (wall.posX === wall.endPosX) {
    circle.velX *= -1;
  } else {
    circle.velY *= -1;
  }
};

// const findPointOfContact = (circle, other) => {
//   if (other instanceof Circle) {
//     const intersectX =
//       (circle.posX * other.radius + other.posX * circle.radius) /
//       (circle.radius + other.radius);
//     const intersectY =
//       (circle.posY * other.radius + other.posY * circle.radius) /
//       (circle.radius + other.radius);
//     return [intersectX, intersectY];
//   } else if (other instanceof Wall) {
//     if (other.posX === other.endPosX) {
//       return [other.posX, circle.posY];
//     } else {
//       return [circle.posX, other.posY];
//     }
//   }
// };

// http://ericleong.me/research/circle-circle/#dynamic-circle-circle-collision
