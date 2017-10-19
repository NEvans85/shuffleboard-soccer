import Circle from "./Entities/circle";
import Wall from "./Entities/wall";
import { pythagoreanResult, calcDistance } from "./util";

export const resolveCollision = (circle, other) => {
  if (other instanceof Circle) {
    seperateCirCir(circle, other);
    resolveCirCirCollision(circle, other);
  } else if (other instanceof Wall) {
    seperateCirWall(circle, Wall);
    resolveCirWallCollision(circle, other);
  }
};

const seperateCirCir = (circle1, circle2) => {
  const x1 = circle1.posX;
  const x2 = circle2.posX;
  const y1 = circle1.posY;
  const y2 = circle2.posY;
  const overlap =
    circle1.radius + circle2.radius - calcDistance([x1, y1], [x2, y2]);
  console.log(overlap);
  // if (circle1.posX > circle2.posX) {
  //   newC1PosX = circle1.posX + 0.5 * overlapX;
  //   newC2PosX = circle2.posX - 0.5 * overlapX;
  // } else {
  //   newC1PosX = circle1.posX - 0.5 * overlapX;
  //   newC2PosX = circle2.posX + 0.5 * overlapX;
  // }
  // if (circle1.posY > circle2.posY) {
  //   newC1PosY = circle1.posY + 0.5 * overlapY;
  //   newC2PosY = circle2.posY - 0.5 * overlapY;
  // } else {
  //   newC1PosY = circle1.posY - 0.5 * overlapY;
  //   newC2PosY = circle2.posY + 0.5 * overlapY;
  // }
  // circle1.setPosition([newC1PosX, newC1PosY]);
  // circle2.setPosition([newC2PosX, newC2PosY]);
};

const seperateCirWall = (circle, wall) => {};

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
  const poc = findPointOfContact(circle1, circle2);
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

const findPointOfContact = (circle1, circle2) => {
  const intersectX =
    (circle1.posX * circle2.radius + circle2.posX * circle1.radius) /
    (circle1.radius + circle2.radius);
  const intersectY =
    (circle1.posY * circle2.radius + circle2.posY * circle1.radius) /
    (circle1.radius + circle2.radius);
  return [intersectX, intersectY];
};

const findAngleOfCollision = (circle1, circle2) => {
  return Math.atan2(circle1.posY - circle2.posY, circle1.posX - circle2.posX);
};

const calcDirection = (xComp, yComp) => {
  return Math.atan2(yComp, xComp);
};

const calcNewXVel = (velMag, direction, aoc) => {
  return velMag * Math.cos(direction - aoc);
};

const calcNewYVel = (velMag, direction, aoc) => {
  return velMag * Math.sin(direction - aoc);
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
