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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_entities__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environment_params__ = __webpack_require__(4);





const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 700;
canvas.setAttribute("style", "border: 1px solid black;");
const environment = new __WEBPACK_IMPORTED_MODULE_0__environment_js__["a" /* default */]();

// Initial environment population
environment.allEntities.forEach(entity => {
  Object(__WEBPACK_IMPORTED_MODULE_1__render__["b" /* render */])(context, entity);
});

const nextFrame = () => {
  Object(__WEBPACK_IMPORTED_MODULE_1__render__["a" /* clear */])(canvas, context);
  environment.allEntities.forEach(entity => {
    entity.nextFrame;
    Object(__WEBPACK_IMPORTED_MODULE_1__render__["b" /* render */])(context, entity);
  });
};

setInterval(nextFrame, __WEBPACK_IMPORTED_MODULE_3__environment_params__["b" /* interval */]);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_entities__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_puck__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entities_ball__ = __webpack_require__(8);




class Environment {
  constructor() {
    this.entities = {};
    this.newEntitiesId = 0;
    __WEBPACK_IMPORTED_MODULE_0__game_entities__["a" /* allEntities */].forEach(entity => this.addEntity(entity));
    this.movingEntities[0].applyForce([500, 500]);
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

  get movingEntities() {
    console.log(this.allEntities);
    return this.allEntities.filter(entity => {
      return entity instanceof __WEBPACK_IMPORTED_MODULE_1__Entities_puck__["a" /* default */] || entity instanceof __WEBPACK_IMPORTED_MODULE_2__Entities_ball__["a" /* default */];
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Environment);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(3);


class Circle extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */] {
  constructor(initialParams) {
    super(initialParams);
    const defaultParams = { radius: 20 };
    const newParams = Object.assign({}, defaultParams, initialParams);
    this.radius = newParams.radius;
  }

  inCollision(pos) {
    const a = pos[0] - this.pos[0];
    const b = pos[1] - this.pos[1];
    const c = this.radius;
    return c * c <= a * a + b * b;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Circle);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment_params__ = __webpack_require__(4);


class Entity {
  constructor(initialParams) {
    const defaultParams = {
      posX: 0,
      posY: 0,
      velX: 0,
      velY: 0,
      accX: 0,
      accY: 0,
      mass: 10,
      fill: "#000000",
      owner: null
    };

    const newParams = Object.assign({}, defaultParams, initialParams);
    this.posX = newParams.posX;
    this.posY = newParams.posY;
    this.velX = newParams.velX;
    this.velY = newParams.velY;
    this.accX = newParams.accX;
    this.accY = newParams.accY;
    this.frictionCoefficient = newParams.frictionCoefficient;
    this.mass = newParams.mass;
    this.time = __WEBPACK_IMPORTED_MODULE_0__environment_params__["b" /* interval */] * 0.001;
    this.fill = newParams.fill;
  }

  get nextFrame() {
    // if (this.velX !== 0 && this.velY !== 0) {
    //   this.applyKineticFriction();
    // }
    [this.velX, this.velY] = this.nextVelocity();
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

  nextVelocity() {
    let velX = this.velX;
    let velY = this.velY;
    const accX = this.accX;
    const accY = this.accY;

    velX += accX * this.time;
    velY += accY * this.time;
    return [velX, velY];
  }

  accelerate(accVector) {
    let accX = this.accX;
    let accY = this.accY;
    const deltaAccX = accVector[0];
    const deltaAccY = accVector[1];

    accX += deltaAccX;
    accY += deltaAccY;
    [this.accX, this.accY] = [accX, accY];
  }

  applyKineticFriction() {
    let forceX = 0;
    let forceY = 0;
    const force = this.frictionCoefficient * __WEBPACK_IMPORTED_MODULE_0__environment_params__["a" /* gravity */] * this.mass;
    if (this.velX !== 0 && this.velY !== 0) {
      const dirRatio = this.velX / this.velY;
      forceX = Math.sqrt(
        dirRatio * dirRatio * force * force / (1 + dirRatio * dirRatio)
      );
      forceY = forceX / dirRatio;
    } else if (this.velX === 0 && this.velY !== 0) {
      forceY = force;
    } else if (this.velY === 0 && this.velX !== 0) {
      forceX = force;
    }
    forceX *= -1;
    forceY *= -1;
    this.applyForce([forceX, forceY]);
  }

  applyForce(forceVector) {
    const forceX = forceVector[0];
    const forceY = forceVector[1];
    let accX = this.accX;
    let accY = this.accY;

    accX = forceX / this.mass;
    accY = forceY / this.mass;
    this.accelerate([accX, accY]);
  }

  setPosition(newPos) {
    this.position = newPos;
  }

  setVelocity(newVel) {
    this.velocity = newVel;
  }

  setAcceleration(newAcc) {
    this.acceleration = newAcc;
  }

  setFill(newFill) {
    this.fill = newFill;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Entity);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const interval = 33;
/* harmony export (immutable) */ __webpack_exports__["b"] = interval;
 // 30 FPS
// export const interval = 16; // 60 FPS
// export const interval = 500; // 2 FPS

const gravity = 9.8;
/* harmony export (immutable) */ __webpack_exports__["a"] = gravity;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_circle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_wall__ = __webpack_require__(9);



const render = (context, entity) => {
  if (entity instanceof __WEBPACK_IMPORTED_MODULE_0__Entities_circle__["a" /* default */]) {
    console.log(`${entity.velX}, ${entity.velY}`);
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
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([240, 260], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([240, 390], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([800, 300], p2)
];
const walls = [
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 100], [850, 100]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 100], [150, 250]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 250], [75, 250]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([75, 250], [75, 400]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([75, 400], [150, 400]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 400], [150, 550]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 550], [850, 550]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 550], [850, 400]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 400], [925, 400]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([925, 400], [925, 250]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([925, 250], [850, 250]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 250], [850, 100])
];
const zones = [];
const ball = [new __WEBPACK_IMPORTED_MODULE_1__Entities_ball__["a" /* default */]([500, 325])];
const allEntities = pucks.concat(walls, zones, ball);
/* harmony export (immutable) */ __webpack_exports__["a"] = allEntities;

const movingEntities = pucks.concat(ball);
/* unused harmony export movingEntities */



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circle__ = __webpack_require__(2);


class Puck extends __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* default */] {
  constructor(pos, owner) {
    const params = {
      radius: 25,
      mass: 200,
      posX: pos[0],
      posY: pos[1],
      frictionCoefficient: 0.2,
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


class Ball extends __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* default */] {
  constructor(pos) {
    const params = { posX: pos[0], posY: pos[1], radius: 15, fill: "white" };
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
  constructor() {}
}


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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map