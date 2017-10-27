import Circle from "./Entities/circle";
import Ball from "./Entities/ball";
import Puck from "./Entities/puck";
import Wall from "./Entities/wall";
import { pythagoreanResult, calcDistance } from "./util";

export const resolveCollision = (circle, other) => {
  if (other instanceof Circle) {
    seperateCirCir(circle, other);
    resolveCirCirCollision(circle, other);
  } else if (other instanceof Wall) {
    seperateCirWall(circle, other);
    resolveCirWallCollision(circle, other);
  }
};

const seperateCirCir = (circle1, circle2) => {
  let x1 = circle1.posX;
  let x2 = circle2.posX;
  let y1 = circle1.posY;
  let y2 = circle2.posY;
  const overlap =
    circle1.radius + circle2.radius - calcDistance([x1, y1], [x2, y2]);
  const aoc = findAngleOfCollision(circle1, circle2);
  const overlapX = Math.abs(Math.cos(aoc) * overlap);
  const overlapY = Math.abs(Math.sin(aoc) * overlap);
  if (x1 > x2) {
    x1 += overlapX / 4;
    x2 -= overlapX / 4;
  } else {
    x1 -= overlapX / 4;
    x2 += overlapX / 4;
  }
  if (y1 > y2) {
    y1 += overlapY / 4;
    y2 -= overlapY / 4;
  } else {
    y1 -= overlapY / 4;
    y2 += overlapY / 4;
  }
  circle1.setPosition([x1, y1]);
  circle2.setPosition([x2, y2]);
};

const seperateCirWall = (circle, wall) => {
  let posX = circle.posX;
  let posY = circle.posY;
  if (wall.dir == "h") {
    posY =
      circle.posY < wall.posY
        ? wall.posY - circle.radius
        : wall.posY + circle.radius;
  } else {
    posX =
      circle.posX < wall.posX
        ? wall.posX - circle.radius
        : wall.posX + circle.radius;
  }
  circle.setPosition([posX, posY]);
};

const resolveCirWallCollision = (circle, wall) => {
  if (wall.posX === wall.endPosX) {
    circle.velX *= -1;
  } else {
    circle.velY *= -1;
  }
};
// trig version

const resolveCirCirCollision = (circle1, circle2) => {
  const c1VelMag = pythagoreanResult(circle1.velX, circle1.velY);
  const c2VelMag = pythagoreanResult(circle2.velX, circle2.velY);
  const aoc = findAngleOfCollision(circle1, circle2);
  const c1Direction = calcDirection(circle1.velX, circle1.velY);
  const c2Direction = calcDirection(circle2.velX, circle2.velY);
  circle1.setVelocity(
    calcNewVel(
      circle1.mass,
      circle2.mass,
      c1Direction,
      c2Direction,
      c1VelMag,
      c2VelMag,
      aoc
    )
  );
  circle2.setVelocity(
    calcNewVel(
      circle2.mass,
      circle1.mass,
      c2Direction,
      c1Direction,
      c2VelMag,
      c1VelMag,
      aoc
    )
  );
};

const findAngleOfCollision = (circle1, circle2) => {
  return Math.atan2(circle1.posY - circle2.posY, circle1.posX - circle2.posX);
};

const calcDirection = (xComp, yComp) => {
  return Math.atan2(yComp, xComp);
};

const calcNewVel = (mass1, mass2, dir1, dir2, velMag1, velMag2, aoc) => {
  const velX =
    (velMag1 * (mass1 - mass2) * Math.cos(dir1 - aoc) +
      2 * mass2 * velMag2 * Math.cos(dir2 - aoc) / (mass1 + mass2)) *
      Math.cos(aoc) +
    velMag1 * Math.sin(dir1 - aoc) * Math.cos(aoc + Math.PI / 2);
  const velY =
    (velMag1 * (mass1 - mass2) * Math.cos(dir1 - aoc) +
      2 * mass2 * velMag2 * Math.cos(dir2 - aoc) / (mass1 + mass2)) *
      Math.sin(aoc) +
    velMag1 * Math.sin(dir1 - aoc) * Math.sin(aoc + Math.PI / 2);
  return [velX, velY];
};

// non-trig version - not working well. glancing blows seem to have
// good angles but straight on collisons do nothing. also all collisions
// are rather sticky even if they work.
// reference for the approach is at the bottom.

// const resolveCirCirCollision = (circle1, circle2) => {
//   const norm = findNorm(circle1, circle2);
//   const p = findMassVelRelation(circle1, circle2, norm);
//   calcNewVel(circle1, circle2, p, norm);
// };
//
// const calcNewVel = (circle1, circle2, p, norm) => {
//   circle1.velX = circle1.velX - p * circle1.mass * norm[0];
//   circle1.velY = circle1.velY - p * circle1.mass * norm[0];
//   circle2.velX = circle2.velX - p * circle2.mass * norm[0];
//   circle2.velY = circle2.velY - p * circle2.mass * norm[0];
// };
//
// const findMassVelRelation = (circle1, circle2, norm) => {
//   return (
//     2 *
//     (circle1.velX * norm[0] +
//       circle1.velY * norm[1] -
//       circle2.velX * norm[0] -
//       circle2.velY * norm[1]) /
//     (circle1.mass + circle2.mass)
//   );
// };
//
// const findNorm = (circle1, circle2) => {
//   const distBetween = findDistBetween(circle1, circle2);
//   const normX = (circle2.posX - circle1.posX) / distBetween;
//   const normY = (circle2.posY - circle1.posY) / distBetween;
//   return [normX, normY];
// };
//
// const findDistBetween = (circle1, circle2) => {
//   return Math.sqrt(
//     (circle1.posX - circle2.posX) * (circle1.posX - circle2.posX) +
//       (circle1.posY - circle2.posY) * (circle1.posY - circle2.posY)
//   );
// };
//

// http://ericleong.me/research/circle-circle/#dynamic-circle-circle-collision
