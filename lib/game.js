import Environment from "./environment.js";
import UI from "./ui";
import BGImage from "./bg_image";
import { gameEntities, gameSounds } from "./game_entities";
import { handleCollisions } from "./collision_detector";
import { render, clear, renderBackground, renderScore } from "./render";
import { playerList } from "./game_entities";
import Player from "./player";

class Game {
  constructor() {
    this.score = { [playerList[0].name]: 0, [playerList[1].name]: 0 };
    this.environment = new Environment();
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.images = [];
    this.preloadImages();
    this.setupCanvas();
    this.ui = new UI(this.environment);
    this.startEventListeners();
    this.viewInstructions = true;

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
    const bgField = new BGImage(field, [150, 150]);
    this.images.push(bgField);
    let scoreboard = new Image();
    scoreboard.onload = () => {
      this.context.drawImage(scoreboard, 250, 25);
    };
    scoreboard.src =
      "https://res.cloudinary.com/arcane-lab/image/upload/v1507311440/scoreboard-wide_x2gxad.png";
    const bgScoreboard = new BGImage(scoreboard, [250, 25]);
    this.images.push(bgScoreboard);
  }

  setupCanvas() {
    document.body.appendChild(this.canvas);
    this.canvas.width = 1025;
    this.canvas.height = 700;
    this.canvas.setAttribute("style", "border: 4px solid white;");
    gameEntities.forEach(entity => {
      this.environment.addEntity(entity);
    });
    renderBackground(this.context, this.images);
    this.environment.allEntities.forEach(entity => {
      render(this.context, entity);
    });
    console.log(this.environment.movingEntities);
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
    clear(this.canvas, this.context);
    renderBackground(this.context, this.images);
    renderScore(this.context, this.score, this.ui.getCurrentPlayer());
    let scorer = this.goal();
    if (!scorer) {
      this.environment.allEntities.forEach(entity => {
        entity.nextFrame;
        render(this.context, entity);
      });
      handleCollisions(this.environment);
    } else {
      gameSounds.goal.play();
      this.environment.movingEntities.forEach(entity => {
        entity.reset();
        render(this.context, entity);
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
