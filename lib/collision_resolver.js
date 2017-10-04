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
  const aoc = findAngleOfCollision(circle1, poc);
  const c1Angle = calcAngle(circle1.velX, circle1.velY, c1VelMag);
  const c2Angle = calcAngle(circle2.velX, circle2.velY, c2VelMag);
  circle1.setVelocity(
    calcNewVel(
      circle1.mass,
      circle2.mass,
      c1Angle,
      c2Angle,
      c1VelMag,
      c2VelMag,
      aoc
    )
  );
  corcle2.setVelocity(
    calcNewVel(
      circle2.mass,
      circle1.mass,
      c2Angle,
      c1Angle,
      c2VelMag,
      c1VelMag,
      aoc
    )
  );
};

const pythagoreanResult = (xComp, yComp) => {
  Math.sqrt(xComp * xComp + yComp * yComp);
};

const findPointOfContact = (circle1, circle2) => {
  if (circle2 instanceof Circle) {
    const intersectX =
      (circle1.posX * circle2.radius + circle2.posX * circle1.radius) /
      (circle1.radius + circle2.radius);
    const intersectY =
      (circle1.posY * circle2.radius + circle2.posY * circle1.radius) /
      (circle.radius + circle2.radius);
    return [intersectX, intersectY];
  }
};

const findAngleOfCollision = (circle1, poc) => {
  let aoc = Math.atan((poc[0] - circle1.posX) / (poc[1] - circle1.posY));
  if (aoc < 0) {
    aoc += 2 * Math.PI;
  }
  return aoc;
};

const calcAngle = (velX, velY, velMag) => {};

const calcNewVel = (
  mass1,
  mass2,
  angle1,
  angle2,
  vel1,
  vel2,
  angleOfContact
) => {};

// non-trig version - not working well. glancing blows seem to have
// good angles but straight on collisons do nothing. also all collisions
// are sticky

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
