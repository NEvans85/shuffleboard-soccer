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



const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;
canvas.setAttribute("style", "border: 1px solid black;");
const environment = new __WEBPACK_IMPORTED_MODULE_0__environment_js__["a" /* default */]();

environment.allEntities.forEach(entity => {
  Object(__WEBPACK_IMPORTED_MODULE_1__render__["a" /* render */])(context, entity);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_entities__ = __webpack_require__(6);


class Environment {
  constructor() {
    this.entities = {};
    this.newEntitiesId = 0;
    __WEBPACK_IMPORTED_MODULE_0__game_entities__["a" /* entityList */].forEach(entity => this.addEntity(entity));
    console.log(this.entities);
  }

  addEntity(entity) {
    const id = this.newEntitiesId;
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
    this.fill = newParams.owner.color;
  }

  get nextFrame() {
    // this.applyKineticFriction()
    [this.velX, this.velY] = this.nextVelocity();
    [this.posX, this.posY] = this.nextPosition();
    return this;
  }

  nextPosition() {
    let posX = this.posX;
    let posY = this.posY;
    const velX = this.velX;
    const velY = this.velX;

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
    [this.accx, this.accY] = [accX, accY];
  }

  applyKineticFriction() {
    const force = this.frictionCoefficient * __WEBPACK_IMPORTED_MODULE_0__environment_params__["a" /* gravity */] * this.mass;
    const dirRatio = this.velY / this.velX;
  }

  applyForce(forceVector) {
    forceX = forceVector[0];
    forceY = forceVector[1];
    accX = this.accX;
    accY = this.accY;

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
    context.beginPath();
    context.arc(entity.posX, entity.posY, entity.radius, 0, 2 * Math.PI, false);
    context.fillStyle = entity.fill;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "#003300";
    context.stroke();
  }
  // if (entity instanceof Wall) {
  // }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = render;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_puck__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_ball__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_ball___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Entities_ball__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entities_wall__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entities_goal__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__player__ = __webpack_require__(12);






const p1 = new __WEBPACK_IMPORTED_MODULE_4__player__["a" /* default */]("player1");
const p2 = new __WEBPACK_IMPORTED_MODULE_4__player__["a" /* default */]("player2");
const playerList = [p1, p2];
/* unused harmony export playerList */


const entityList = [new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([100, 100], p1)];
/* harmony export (immutable) */ __webpack_exports__["a"] = entityList;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circle__ = __webpack_require__(2);


class Puck extends __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* default */] {
  constructor(pos, owner) {
    const params = {
      radius: 40,
      mass: 20,
      posX: pos[0],
      posY: pos[1],
      frictionCoefficient: 0.4
    };
    super(params);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Puck);


/***/ }),
/* 8 */
/***/ (function(module, exports) {



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(3);


class Wall extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */] {
  constructor(initialParams) {
    super(initialParams);
    const defaultParams = {
      endPosX: 0,
      endPosY: 0,
      immobile: true
    };
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Wall);


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