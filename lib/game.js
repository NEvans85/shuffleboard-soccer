import Environment from "./environment.js";
import UI from "./ui";
import { gameEntities } from "./game_entities";
import { handleCollisions } from "./collision_detector";
import { render, clear } from "./render";
import { playerList } from "./game_entities";

class Game {
  constructor() {
    this.score = { [playerList[0]]: 0, [playerList[1]]: 0 };
    this.environment = new Environment();
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.setupCanvas();
    this.ui = new UI(this.environment);
    this.startEventListeners();
    this.turnInProgress = false;

    this.setupCanvas = this.setupCanvas.bind(this);
    this.startEventListeners = this.startEventListeners.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.nextFrame = this.nextFrame.bind(this);
  }

  setupCanvas() {
    document.body.appendChild(this.canvas);
    this.canvas.width = 1025;
    this.canvas.height = 700;
    this.canvas.setAttribute("style", "border: 4px solid white;");
    gameEntities.forEach(entity => {
      this.environment.addEntity(entity);
    });
    this.environment.allEntities.forEach(entity => {
      render(this.context, entity);
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
    // this.environment.pucks.forEach(puck => {
    //   puck.setVelocity([
    //     Math.random() * 2000 - 1000,
    //     Math.random() * 2000 - 1000
    //   ]);
    // });
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

  goal() {
    this.environment.goals.forEach(goal => {
      if (goal.contains(this.environment.ball)) {
        return goal.owner;
      }
    });
    return false;
  }

  get over() {
    return Object.values(this.score).includes(3);
  }
}

const game = new Game();
game.startAnimation();
// while (!game.over) {
//   game.playTurn;
// }

// Shoot all pucks randomly
// console.log(environment.ball);

// environment.pucks[3].setVelocity([400, 200]);
