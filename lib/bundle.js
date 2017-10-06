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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wall__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(5);




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
      return (
        entity.posX <= this.posX + this.radius &&
        entity.endPosX >= this.posX - this.radius &&
        entity.posY <= this.posY + this.radius &&
        entity.endPosY >= this.posY - this.radius
      );
    }
  }
  contains(pos) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* calcDistance */])([this.posX, this.posY], pos) <= this.radius;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Circle);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(4);


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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circle__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wall__ = __webpack_require__(1);



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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circle__ = __webpack_require__(0);


class Puck extends __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* default */] {
  constructor(pos, owner) {
    const params = {
      radius: 25,
      mass: 100,
      posX: pos[0],
      posY: pos[1],
      frictionCoefficient: 0.985,
      owner: owner,
      fill: owner.color
    };
    super(params);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Puck);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Entity {
  constructor(initialParams) {
    const defaultParams = {
      posX: 0,
      posY: 0,
      velX: 0,
      velY: 0,
      mass: 0,
      fill: "#000000",
      owner: null
    };

    const newParams = Object.assign({}, defaultParams, initialParams);
    this.posX = newParams.posX;
    this.posY = newParams.posY;
    this.initPosX = newParams.posX;
    this.initPosY = newParams.posY;
    this.velX = newParams.velX;
    this.velY = newParams.velY;
    this.frictionCoefficient = newParams.frictionCoefficient;
    this.mass = newParams.mass;
    this.fill = newParams.fill;
    this.time = 16 / 1000;
    this.owner = newParams.owner;
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

  applyKineticFriction() {
    this.velX *= this.frictionCoefficient;
    this.velY *= this.frictionCoefficient;

    if (Math.abs(this.velX) < 5) {
      this.velX = 0;
    }
    if (Math.abs(this.velY) < 5) {
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

  reset() {
    this.posX = this.initPosX;
    this.posY = this.initPosY;
    this.velX = 0;
    this.velY = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Entity);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const calcDistance = (pos1, pos2) => {
  return pythagoreanResult(pos2[0] - pos1[0], pos2[1] - pos1[1]);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = calcDistance;


const pythagoreanResult = (a, b) => {
  return Math.sqrt(a * a + b * b);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = pythagoreanResult;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_puck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_ball__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entities_wall__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entities_goal__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__player__ = __webpack_require__(12);






const p1 = new __WEBPACK_IMPORTED_MODULE_4__player__["a" /* default */]("Red Player", "red");
const p2 = new __WEBPACK_IMPORTED_MODULE_4__player__["a" /* default */]("Blue Player", "blue");
const playerList = [p1, p2];
/* harmony export (immutable) */ __webpack_exports__["b"] = playerList;

const pucks = [
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([220, 310], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([220, 440], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([360, 250], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([360, 500], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([400, 375], p1),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([600, 375], p2),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([640, 250], p2),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([640, 500], p2),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([780, 310], p2),
  new __WEBPACK_IMPORTED_MODULE_0__Entities_puck__["a" /* default */]([780, 440], p2)
];
const walls = [
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 150], [850, 150]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([75, 290], [150, 290]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([75, 460], [150, 460]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 600], [850, 600]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 460], [925, 460]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 290], [925, 290]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 150], [150, 290]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([75, 290], [75, 460]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([150, 460], [150, 600]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 460], [850, 600]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([925, 290], [925, 460]),
  new __WEBPACK_IMPORTED_MODULE_2__Entities_wall__["a" /* default */]([850, 150], [850, 290])
];
const zones = [
  new __WEBPACK_IMPORTED_MODULE_3__Entities_goal__["a" /* default */]({
    posX: 75,
    posY: 290,
    height: 170,
    width: 75,
    fill: "grey",
    owner: p2
  }),
  new __WEBPACK_IMPORTED_MODULE_3__Entities_goal__["a" /* default */]({
    posX: 850,
    posY: 290,
    height: 170,
    width: 75,
    fill: "grey",
    owner: p1
  })
];
const ball = [new __WEBPACK_IMPORTED_MODULE_1__Entities_ball__["a" /* default */]([500, 375])];
const gameEntities = pucks.concat(ball, zones, walls);
/* harmony export (immutable) */ __webpack_exports__["a"] = gameEntities;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball__ = __webpack_require__(2);


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
    this.owner = newParams.owner;
  }

  contains(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]) {
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bg_image__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_entities__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__collision_detector__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__render__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__player__ = __webpack_require__(12);









class Game {
  constructor() {
    this.score = { [__WEBPACK_IMPORTED_MODULE_3__game_entities__["b" /* playerList */][0].name]: 0, [__WEBPACK_IMPORTED_MODULE_3__game_entities__["b" /* playerList */][1].name]: 0 };
    this.environment = new __WEBPACK_IMPORTED_MODULE_0__environment_js__["a" /* default */]();
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.images = [];
    this.preloadImages();
    this.setupCanvas();
    this.ui = new __WEBPACK_IMPORTED_MODULE_1__ui__["a" /* default */](this.environment);
    this.startEventListeners();

    this.setupCanvas = this.setupCanvas.bind(this);
    this.startEventListeners = this.startEventListeners.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.nextFrame = this.nextFrame.bind(this);
  }

  preloadImages() {
    let field = new Image();
    field.onload = () => {
      this.context.drawImage(field, 150, 150);
    };
    field.src =
      "https://res.cloudinary.com/arcane-lab/image/upload/c_crop,w_700/v1507304625/soccerField_wzwnds.png";
    const bgField = new __WEBPACK_IMPORTED_MODULE_2__bg_image__["a" /* default */](field, [150, 150]);
    this.images.push(bgField);
    let scoreboard = new Image();
    scoreboard.onload = () => {
      this.context.drawImage(scoreboard, 250, 25);
    };
    scoreboard.src =
      "https://res.cloudinary.com/arcane-lab/image/upload/v1507311440/scoreboard-wide_x2gxad.png";
    const bgScoreboard = new __WEBPACK_IMPORTED_MODULE_2__bg_image__["a" /* default */](scoreboard, [250, 25]);
    this.images.push(bgScoreboard);
  }

  setupCanvas() {
    document.body.appendChild(this.canvas);
    this.canvas.width = 1025;
    this.canvas.height = 700;
    this.canvas.setAttribute("style", "border: 4px solid white;");
    __WEBPACK_IMPORTED_MODULE_3__game_entities__["a" /* gameEntities */].forEach(entity => {
      this.environment.addEntity(entity);
    });
    Object(__WEBPACK_IMPORTED_MODULE_5__render__["c" /* renderBackground */])(this.context, this.images);
    this.environment.allEntities.forEach(entity => {
      Object(__WEBPACK_IMPORTED_MODULE_5__render__["b" /* render */])(this.context, entity);
    });
  }
  startEventListeners() {
    this.canvas.onmousemove = e => this.ui.updateMousePos(e);
    this.canvas.onmousedown = e => this.ui.handleMouseDown(e);
    this.canvas.onmouseup = e => {
      this.ui.handleMouseUp(e);
    };
  }

  startAnimation() {
    window.requestAnimationFrame(() => {
      this.nextFrame();
    });
  }
  nextFrame() {
    Object(__WEBPACK_IMPORTED_MODULE_5__render__["a" /* clear */])(this.canvas, this.context);
    Object(__WEBPACK_IMPORTED_MODULE_5__render__["c" /* renderBackground */])(this.context, this.images);
    Object(__WEBPACK_IMPORTED_MODULE_5__render__["d" /* renderScore */])(this.context, this.score, this.ui.getCurrentPlayer());
    let scorer = this.goal();
    if (!scorer) {
      this.environment.allEntities.forEach(entity => {
        entity.nextFrame;
        Object(__WEBPACK_IMPORTED_MODULE_5__render__["b" /* render */])(this.context, entity);
      });
      Object(__WEBPACK_IMPORTED_MODULE_4__collision_detector__["a" /* handleCollisions */])(this.environment);
    } else {
      this.environment.movingEntities.forEach(entity => {
        entity.reset();
        Object(__WEBPACK_IMPORTED_MODULE_5__render__["b" /* render */])(this.context, entity);
      });
      this.score[scorer] += 1;
    }
    window.requestAnimationFrame(this.nextFrame);
  }

  goal() {
    let scorer = false;
    this.environment.goals.forEach(goal => {
      if (goal.contains(this.environment.ball)) {
        scorer = goal.owner.name;
      }
    });
    return scorer;
  }

  get over() {
    return Object.values(this.score).includes(3);
  }
}

const game = new Game();
game.startAnimation();


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_puck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_ball__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entities_goal__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entities_entity__ = __webpack_require__(4);





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
    const deleted = this.entities[entityId];
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
    })[0];
  }

  get goals() {
    return this.allEntities.filter(entity => {
      return entity instanceof __WEBPACK_IMPORTED_MODULE_2__Entities_goal__["a" /* default */];
    });
  }

  get movingEntities() {
    return this.allEntities.filter(entity => {
      return entity instanceof __WEBPACK_IMPORTED_MODULE_3__Entities_entity__["a" /* default */];
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Environment);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_arrow__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_entities__ = __webpack_require__(6);



class UI {
  constructor(environment) {
    this.environment = environment;
    this.mouseX = 0;
    this.mouseY = 0;
    this.dragging = false;
    this.actionPuck = false;
    this.arrow = null;
    this.currentPlayer = __WEBPACK_IMPORTED_MODULE_1__game_entities__["b" /* playerList */][0];
    this.turnInProgress = false;
    this.switchInterval = null;
  }

  updateMousePos(e) {
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
    if (this.dragging) {
      const endPosX =
        this.actionPuck.posX + (this.actionPuck.posX - this.mouseX);
      const endPosY =
        this.actionPuck.posY + (this.actionPuck.posY - this.mouseY);
      this.arrow.setEndPos([endPosX, endPosY]);
    }
  }

  handleMouseDown(e, currentPlayer) {
    if (!this.movingEntities()) {
      this.environment.pucks.forEach(puck => {
        if (
          puck.owner === this.currentPlayer &&
          puck.contains([e.offsetX, e.offsetY])
        ) {
          this.dragging = true;
          this.actionPuck = puck;
          this.arrow = new __WEBPACK_IMPORTED_MODULE_0__Entities_arrow__["a" /* default */]([puck.posX, puck.posY]);
          this.environment.addEntity(this.arrow);
        }
      });
    }
  }

  handleMouseUp(e) {
    if (this.dragging) {
      this.environment.removeEntity(this.arrow.id);
      const velX = (this.arrow.startPosX - this.arrow.endPosX) * -5;
      const velY = (this.arrow.startPosY - this.arrow.endPosY) * -5;
      this.actionPuck.setVelocity([velX, velY]);
      this.dragging = false;
      this.arrow = null;
      this.actionPuck = null;
      const self = this;
      this.playerSwitchWatch();
    }
  }

  playerSwitchWatch() {
    const self = this;
    this.switchInterval = setInterval(() => {
      if (!self.movingEntities()) {
        self.switchPlayers();
        clearInterval(self.switchInterval);
      }
    }, 1000);
  }

  switchPlayers() {
    this.currentPlayer =
      this.currentPlayer === __WEBPACK_IMPORTED_MODULE_1__game_entities__["b" /* playerList */][0] ? __WEBPACK_IMPORTED_MODULE_1__game_entities__["b" /* playerList */][1] : __WEBPACK_IMPORTED_MODULE_1__game_entities__["b" /* playerList */][0];
  }

  movingEntities() {
    let moving = false;
    this.environment.movingEntities.forEach(entity => {
      if (entity.velX !== 0 && entity.velY !== 0) {
        moving = true;
      }
    });
    return moving;
  }

  getCurrentPlayer() {
    return this.currentPlayer.name;
  }
}
/* harmony default export */ __webpack_exports__["a"] = (UI);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__zone__ = __webpack_require__(7);


class Goal extends __WEBPACK_IMPORTED_MODULE_0__zone__["a" /* default */] {
  constructor(initialParams) {
    const defaultParams = {
      height: 170,
      width: 75
    };
    const newParams = Object.assign({}, initialParams, defaultParams);
    super(newParams);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Goal);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_circle__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collision_resolver__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entities_ball__ = __webpack_require__(2);




const handleCollisions = environment => {
  const entities = environment.allEntities;
  const count = entities.length;
  for (var i = 0; i < count; i++) {
    for (var j = i; j < count; j++) {
      // if (entities[i] instanceof Ball) {
      //   console.log(entities[i]);
      //   console.log(entities[i] instanceof Circle);
      //   console.log(entities[j]);
      // }
      if (
        i !== j &&
        entities[i] instanceof __WEBPACK_IMPORTED_MODULE_0__Entities_circle__["a" /* default */] &&
        entities[i].inCollisionWith(entities[j])
      ) {
        Object(__WEBPACK_IMPORTED_MODULE_1__collision_resolver__["a" /* resolveCollision */])(entities[i], entities[j]);
      }
    }
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = handleCollisions;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_circle__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_wall__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(5);




const resolveCollision = (circle, other) => {
  // const [pocX, pocY] = findPointOfContact(circle, other);
  if (other instanceof __WEBPACK_IMPORTED_MODULE_0__Entities_circle__["a" /* default */]) {
    seperateCirCir(circle, other);
    resolveCirCirCollision(circle, other);
  } else if (other instanceof __WEBPACK_IMPORTED_MODULE_1__Entities_wall__["a" /* default */]) {
    seperateCirWall(circle, __WEBPACK_IMPORTED_MODULE_1__Entities_wall__["a" /* default */]);
    resolveCirWallCollision(circle, other);
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = resolveCollision;


const seperateCirCir = (circle1, circle2) => {
  const overlapX =
    circle1.radius + circle2.radius - Math.abs(circle1.posX - circle2.posX);
  const overlapY =
    circle1.radius + circle2.radius - Math.abs(circle1.posY - circle2.posY);
  let newC1PosX;
  let newC1PosY;
  let newC2PosX;
  let newC2PosY;
  if (circle1.posX > circle2.posX) {
    newC1PosX = circle1.posX + 0.5 * overlapX + 10;
    newC2PosX = circle2.posX - 0.5 * overlapX - 10;
  } else {
    newC1PosX = circle1.posX - 0.5 * overlapX - 10;
    newC2PosX = circle2.posX + 0.5 * overlapX + 10;
  }
  if (circle1.posY > circle2.posY) {
    newC1PosY = circle1.posY + 0.5 * overlapY + 10;
    newC2PosY = circle2.posY - 0.5 * overlapY - 10;
  } else {
    newC1PosY = circle1.posY - 0.5 * overlapY - 10;
    newC2PosY = circle2.posY + 0.5 * overlapY + 10;
  }
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
  const c1VelMag = Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* pythagoreanResult */])(circle1.velX, circle1.velY);
  const c2VelMag = Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* pythagoreanResult */])(circle2.velX, circle2.velY);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_circle__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_wall__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entities_zone__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entities_arrow__ = __webpack_require__(16);





const render = (context, entity) => {
  if (entity instanceof __WEBPACK_IMPORTED_MODULE_0__Entities_circle__["a" /* default */]) {
    context.beginPath();
    context.arc(entity.posX, entity.posY, entity.radius, 0, 2 * Math.PI, false);
    context.fillStyle = entity.fill;
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "black";
    context.stroke();
  } else if (entity instanceof __WEBPACK_IMPORTED_MODULE_1__Entities_wall__["a" /* default */]) {
    context.beginPath();
    context.moveTo(entity.posX, entity.posY);
    context.lineTo(entity.endPosX, entity.endPosY);
    context.stroke();
  } else if (entity instanceof __WEBPACK_IMPORTED_MODULE_2__Entities_zone__["a" /* default */]) {
    context.beginPath();
    context.rect(entity.posX, entity.posY, entity.width, entity.height);
    context.fillStyle = entity.fill;
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
  } else if (entity instanceof __WEBPACK_IMPORTED_MODULE_3__Entities_arrow__["a" /* default */]) {
    context.beginPath();
    context.moveTo(entity.startPosX, entity.startPosY);
    context.lineTo(entity.endPosX, entity.endPosY);
    context.stroke();
  }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = render;


const renderBackground = (context, images) => {
  images.forEach(image => {
    context.drawImage(image.image, image.posX, image.posY);
  });
};
/* harmony export (immutable) */ __webpack_exports__["c"] = renderBackground;


const renderScore = (context, score, currentPlayer) => {
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
/* harmony export (immutable) */ __webpack_exports__["d"] = renderScore;


const clear = (canvas, context) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = clear;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Arrow {
  constructor(pos) {
    this.startPosX = pos[0];
    this.startPosY = pos[1];
    this.endPosX = pos[0];
    this.endPosY = pos[1];
  }

  setEndPos(pos) {
    this.endPosX = pos[0];
    this.endPosY = pos[1];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Arrow);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BGImage {
  constructor(image, pos) {
    this.image = image;
    this.posX = pos[0];
    this.posY = pos[1];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BGImage);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map