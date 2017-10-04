/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_entities__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collision_detector__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__collision_resolver__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__render__ = __webpack_require__(5);







// Build and place the game area
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 700;
canvas.setAttribute("style", "border: 1px solid black;");

// Initial environment population
const environment = new __WEBPACK_IMPORTED_MODULE_0__environment_js__["a" /* default */]();
__WEBPACK_IMPORTED_MODULE_1__game_entities__["a" /* gameEntities */].forEach(entity => {
  environment.addEntity(entity);
});
console.log(environment.allEntities);
environment.allEntities.forEach(entity => {
  Object(__WEBPACK_IMPORTED_MODULE_4__render__["b" /* render */])(context, entity);
});

// Shoot all pucks randomly
environment.pucks.forEach(puck => {
  puck.setVelocity([Math.random() * 2000 - 1000, Math.random() * 2000 - 1000]);
});
// console.log(environment.ball);
// environment.ball[0].setVelocity([0, 500]);

// environment.pucks[3].setVelocity([-600, 0]);

window.requestAnimationFrame(() => {
  nextFrame();
});
const nextFrame = () => {
  Object(__WEBPACK_IMPORTED_MODULE_4__render__["a" /* clear */])(canvas, context);
  environment.allEntities.forEach(entity => {
    entity.nextFrame;
    Object(__WEBPACK_IMPORTED_MODULE_4__render__["b" /* render */])(context, entity);
  });
  const collisions = Object(__WEBPACK_IMPORTED_MODULE_2__collision_detector__["a" /* detectCollisions */])(environment);
  requestAnimationFrame(nextFrame);
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_puck__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_ball__ = __webpack_require__(8);



class Environment {
  constructor() {
    this.entities = {};
    this.newEntitiesId = 0;
  }

  addEntity(entity) {
    const id = this.newEntitiesId;
    entity.id = id;
    this.entities[id] = entity;
    this.newEntitiesId += 1;
    return id;
  }

  removeEntity(entityId) {
    deleted = this.entities[entityId];
    delete this.entities[entityId];
    return deleted;
  }

  get allEntities() {
    return Object.values(this.entities);
  }

  get pucks() {
    return this.allEntities.filter(entity => {
      return entity instanceof __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */];
    });
  }

  get ball() {
    return this.allEntities.filter(entity => {
      return entity instanceof __WEBPACK_IMPORTED_MODULE_1__Entities_ball__["a" /* default */];
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Environment);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wall__ = __webpack_require__(9);



class Circle extends __WEBPACK_IMPORTED_MODULE_0__entity__["a" /* default */] {
  constructor(initialParams) {
    super(initialParams);
    const defaultParams = { radius: 20 };
    const newParams = Object.assign({}, defaultParams, initialParams);
    this.radius = newParams.radius;
  }

  inCollisionWith(entity) {
    if (entity instanceof Circle) {
      const a = entity.posX - this.posX;
      const b = entity.posY - this.posY;
      const c = this.radius + entity.radius;
      return c * c >= a * a + b * b;
    } else if (entity instanceof __WEBPACK_IMPORTED_MODULE_1__wall__["a" /* default */]) {
      let result;
      if (entity.posX === entity.endPosX) {
        result =
          entity.posX <= this.posX + this.radius &&
          entity.posX >= this.posX - this.radius &&
          entity.posY <= this.posY + this.radius &&
          entity.endPosY >= this.posY - this.radius;
      } else {
        result =
          entity.posY <= this.posY + this.radius &&
          entity.posY >= this.posY - this.radius &&
          entity.posX <= this.posX + this.radius &&
          entity.endPosX >= this.posX - this.radius;
      }
      return result;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Circle);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Entity {
  constructor(initialParams) {
    const defaultParams = {
      posX: 0,
      posY: 0,
      velX: 0,
      velY: 0,
      mass: 100,
      fill: "#000000",
      owner: null
    };

    const newParams = Object.assign({}, defaultParams, initialParams);
    this.posX = newParams.posX;
    this.posY = newParams.posY;
    this.velX = newParams.velX;
    this.velY = newParams.velY;
    this.frictionCoefficient = newParams.frictionCoefficient;
    this.mass = newParams.mass;
    this.fill = newParams.fill;
    this.time = 16 / 1000;
  }

  get nextFrame() {
    if (this.velX !== 0 || this.velY !== 0) {
      this.applyKineticFriction();
    }
    [this.posX, this.posY] = this.nextPosition();
    return this;
  }

  nextPosition() {
    let posX = this.posX;
    let posY = this.posY;
    const velX = this.velX;
    const velY = this.velY;

    posX += velX * this.time;
    posY += velY * this.time;
    return [posX, posY];
  }

  // nextVelocity() {
  //   let velX = this.velX;
  //   let velY = this.velY;
  //   const accX = this.accX;
  //   const accY = this.accY;
  //
  //   velX += accX * this.time;
  //   velY += accY * this.time;
  //   return [velX, velY];
  // }

  // accelerate(accVector) {
  //   let accX = this.accX;
  //   let accY = this.accY;
  //   const deltaAccX = accVector[0];
  //   const deltaAccY = accVector[1];
  //
  //   accX += deltaAccX;
  //   accY += deltaAccY;
  //   [this.accX, this.accY] = [accX, accY];
  // }

  applyKineticFriction() {
    this.velX *= this.frictionCoefficient;
    this.velY *= this.frictionCoefficient;

    if (Math.abs(this.velX) < 1) {
      this.velX = 0;
    }
    if (Math.abs(this.velY) < 1) {
      this.velY = 0;
    }
  }

  setPosition(newPos) {
    this.posX = newPos[0];
    this.posY = newPos[1];
  }

  setVelocity(newVel) {
    this.velX = newVel[0];
    this.velY = newVel[1];
  }

  // setAcceleration(newAcc) {
  //   this.acceleration = newAcc;
  // }

  setFill(newFill) {
    this.fill = newFill;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Entity);


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_circle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_wall__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entities_zone__ = __webpack_require__(11);




const render = (context, entity) => {
  if (entity instanceof __WEBPACK_IMPORTED_MODULE_0__Entities_circle__["a" /* default */]) {
    context.beginPath();
    context.arc(entity.posX, entity.posY, entity.radius, 0, 2 * Math.PI, false);
    context.fillStyle = entity.fill;
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "black";
    context.stroke();
  }
  if (entity instanceof __WEBPACK_IMPORTED_MODULE_1__Entities_wall__["a" /* default */]) {
    context.beginPath();
    context.moveTo(entity.posX, entity.posY);
    context.lineTo(entity.endPosX, entity.endPosY);
    context.stroke();
  }
  if (entity instanceof __WEBPACK_IMPORTED_MODULE_2__Entities_zone__["a" /* default */]) {
    context.beginPath();
    context.rect(entity.posX, entity.posY, entity.width, entity.height);
    context.fillStyle = entity.fill;
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
  }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = render;


const clear = (canvas, context) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = clear;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_puck__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_ball__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entities_wall__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entities_goal__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__player__ = __webpack_require__(12);






const p1 = new __WEBPACK_IMPORTED_MODULE_4__player__["a" /* default */]("player1", "red");
const p2 = new __WEBPACK_IMPORTED_MODULE_4__player__["a" /* default */]("player2", "blue");
const playerList = [p1, p2];
/* unused harmony export playerList */

const pucks = [
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([220, 260], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([220, 390], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([360, 200], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([360, 450], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([400, 325], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([600, 325], p2),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([640, 200], p2),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([640, 450], p2),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([780, 260], p2),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([780, 390], p2)
];
const walls = [
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 100], [850, 100]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([75, 240], [150, 240]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([75, 410], [150, 410]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 550], [850, 550]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 410], [925, 410]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 240], [925, 240]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 100], [150, 240]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([75, 240], [75, 410]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 410], [150, 550]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 410], [850, 550]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([925, 240], [925, 410]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 100], [850, 240])
];
const zones = [
  new __WEBPACK_IMPORTED_MODULE_3__Entities_goal__["a" /* default */]({ posX: 75, posY: 240, height: 170, width: 75, fill: "grey" }),
  new __WEBPACK_IMPORTED_MODULE_3__Entities_goal__["a" /* default */]({ posX: 850, posY: 240, height: 170, width: 75, fill: "grey" })
];
const ball = [new __WEBPACK_IMPORTED_MODULE_1__Entities_ball__["a" /* default */]([500, 325])];
const gameEntities = pucks.concat(walls, zones, ball);
/* harmony export (immutable) */ __webpack_exports__["a"] = gameEntities;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circle__ = __webpack_require__(2);


class Puck extends __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* default */] {
  constructor(pos, owner) {
    const params = {
      radius: 25,
      mass: 100,
      posX: pos[0],
      posY: pos[1],
      frictionCoefficient: 0.99,
      owner: owner,
      fill: owner.color
    };
    super(params);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Puck);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wall__ = __webpack_require__(9);



class Ball extends __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* default */] {
  constructor(pos) {
    const params = {
      posX: pos[0],
      posY: pos[1],
      radius: 15,
      fill: "white",
      mass: 100,
      frictionCoefficient: 0.99
    };
    super(params);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(3);


class Wall extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */] {
  constructor(startPos, endPos) {
    const params = { posX: startPos[0], posY: startPos[1] };
    super(params);
    this.endPosX = endPos[0];
    this.endPosY = endPos[1];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Wall);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__zone__ = __webpack_require__(11);


class Goal extends __WEBPACK_IMPORTED_MODULE_0__zone__["a" /* default */] {
  constructor(initialParams) {
    super(initialParams);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Goal);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Zone {
  constructor(initialParams) {
    const defaultParams = {
      posX: 0,
      posY: 0,
      height: 600,
      width: 400
    };
    const newParams = Object.assign({}, defaultParams, initialParams);
    this.height = newParams.height;
    this.width = newParams.width;
    this.posX = newParams.posX;
    this.posY = newParams.posY;
    this.fill = newParams.fill;
  }

  contains(object) {
    if (object instanceof Circle) {
      return (
        this.posX <= object.posX - object.radius &&
        this.posX + this.width >= object.posX + object.radius &&
        this.posY <= object.posY - object.radius &&
        this.posY + this.height >= object.posY + object.radius
      );
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Zone);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_circle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collision_resolver__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entities_ball__ = __webpack_require__(8);




const detectCollisions = environment => {
  const entities = environment.allEntities;
  // console.log(entities);
  const count = entities.length;
  for (var i = 0; i < count; i++) {
    for (var j = i + 1; j <= count; j++) {
      if (
        entities[i] instanceof __WEBPACK_IMPORTED_MODULE_0__Entities_circle__["a" /* default */] &&
        entities[i].inCollisionWith(entities[j])
      ) {
        // console.log([entities[i], entities[j]]);
        Object(__WEBPACK_IMPORTED_MODULE_1__collision_resolver__["a" /* resolveCollision */])(entities[i], entities[j]);
      }
    }
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = detectCollisions;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_circle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_wall__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(15);




const resolveCollision = (circle, other) => {
  // const [pocX, pocY] = findPointOfContact(circle, other);
  seperate(circle, other);
  if (other instanceof __WEBPACK_IMPORTED_MODULE_0__Entities_circle__["a" /* default */]) {
    resolveCirCirCollision(circle, other);
  } else if (other instanceof __WEBPACK_IMPORTED_MODULE_1__Entities_wall__["a" /* default */]) {
    resolveCirWallCollision(circle, other);
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = resolveCollision;


const seperate = (entity1, entity2) => {};

const resolveCirWallCollision = (circle, wall) => {
  if (wall.posX === wall.endPosX) {
    circle.velX *= -1;
  } else {
    circle.velY *= -1;
  }
};
// trig version

const resolveCirCirCollision = (circle1, circle2) => {
  const c1VelMag = Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* pythagoreanResult */])(circle1.velX, circle1.velY);
  const c2VelMag = Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* pythagoreanResult */])(circle2.velX, circle2.velY);
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


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const calcDistance = (pos1, pos2) => {
  return pythagoreanResult(pos2[0] - pos1[0], pos2[1] - pos1[1]);
};
/* unused harmony export calcDistance */


const pythagoreanResult = (a, b) => {
  return Math.sqrt(a * a + b * b);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = pythagoreanResult;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map