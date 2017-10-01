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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_circle_js__ = __webpack_require__(2);



const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
document.bode.appendChild(canvas);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Environment {
  constructor() {
    this.entities = {};
    this.newEntitiesId = 0;
  }

  addEntity(entity) {
    id = newEntitiesId;
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

/* unused harmony default export */ var _unused_webpack_default_export = (Environment);


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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment_params__ = __webpack_require__(4);


class Entity {
  constructor(initialParams) {
    const defaultParams = {
      position: [0, 0],
      velocity: [0, 0],
      acceleration: [0, 0],
      frictionCoefficient: 0.4,
      maxVelocity: 500,
      mass: 1,
      fill: "#000000"
    };
    const newParams = Object.assign({}, defaultParams, initialParams);
    this.position = newParams.position;
    this.velocity = newParams.velocity;
    this.acceleration = newParams.acceleration;
    this.maxVelocity = newParams.maxVelocity;
    this.frictionCoefficient = newParams.frictionCoefficient;
    this.mass = newParams.mass;
    this.time = __WEBPACK_IMPORTED_MODULE_0__environment_params__["b" /* interval */] * 0.001;
    this.fill = newParams.fill;
  }

  get nextFrame() {
    this.velocity = this.nextVelocity();
    this.position = this.nextPosition();
    return this;
  }

  nextPosition() {
    let posX = this.position[0];
    let posY = this.position[1];
    const velX = this.velocity[0];
    const velY = this.velocity[1];

    posX += velX * this.time;
    posY += velY * this.time;
    return [posX, posY];
  }

  nextVelocity() {
    let velX = this.velocity[0];
    let velY = this.velocity[1];
    const accX = this.acceleration[0];
    const accY = this.acceleration[1];

    velX += accX * this.time;
    velY += accY * this.time;
    return [velX, velY];
  }

  accelerate(accVector) {
    let accX = this.acceleration[0];
    let accY = this.acceleration[1];
    const deltaAccX = accVector[0];
    const deltaAccY = accVector[1];

    accX += deltaAccX;
    accY += deltaAccY;
    this.acceleration = [accX, accY];
  }

  applyKineticFriction() {
    const force = this.frictionCoefficient * __WEBPACK_IMPORTED_MODULE_0__environment_params__["a" /* gravity */] * this.mass;
  }

  applyForce(forceVector) {
    forceX = forceVector[0];
    forceY = forceVector[1];
    accX = this.acceleration[0];
    accY = this.acceleration[1];

    accX = forceX / this.mass;
    accY = forceY / this.mass;
    this.acceleration = [accX, accY];
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

  setMass(newMass) {
    this.mass = newMass;
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



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map