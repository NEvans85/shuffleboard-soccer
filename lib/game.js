import Environment from "./environment.js";
import UI from "./ui";
import { gameEntities } from "./game_entities";
import { handleCollisions } from "./collision_detector";
import { render, clear } from "./render";
import { playerList } from "./game_entities";

class Game {
  constructor() {
    this.currentPlayer = playerList[0];
    this.score = { [playerList[0]]: 0, [playerList[1]]: 0 };
    this.environment = new Environment();
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.setupCanvas();
    this.ui = new UI(this.canvas, this.context, playerList, this.environment);
    this.setupEventListeners();
    this.setupCanvas = this.setupCanvas.bind(this);
    this.setupEventListeners = this.setupEventListeners.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.nextFrame = this.nextFrame.bind(this);
  }
  setupCanvas() {
    document.body.appendChild(this.canvas);
    this.canvas.width = 1200;
    this.canvas.height = 700;
    this.canvas.setAttribute("style", "border: 1px solid black;");
    gameEntities.forEach(entity => {
      this.environment.addEntity(entity);
    });
    this.environment.allEntities.forEach(entity => {
      render(this.context, entity);
    });
  }
  setupEventListeners() {
    this.canvas.onmousemove = e => this.ui.updateMousePos(e);
    this.canvas.onmousedown = e =>
      this.ui.handleMouseDown(e, this.currentPlayer);
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
    clear(this.canvas, this.context);
    this.environment.allEntities.forEach(entity => {
      entity.nextFrame;
      render(this.context, entity);
    });
    handleCollisions(this.environment);
    window.requestAnimationFrame(this.nextFrame);
  }

  get playTurn() {}

  get over() {
    Object.values(this.score).includes(3);
  }
}

const game = new Game();
game.startAnimation();
// while (!game.over) {
//   game.playTurn;
// }

// Shoot all pucks randomly
// environment.pucks.forEach(puck => {
//   puck.setVelocity([Math.random() * 2000 - 1000, Math.random() * 2000 - 1000]);
// });
// console.log(environment.ball);
// environment.ball[0].setVelocity([300, 500]);

// environment.pucks[3].setVelocity([400, 200]);
