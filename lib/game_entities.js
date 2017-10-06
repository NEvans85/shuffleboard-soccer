import Puck from "./Entities/puck";
import Ball from "./Entities/ball";
import Wall from "./Entities/wall";
import Goal from "./Entities/goal";
import Player from "./player";

const p1 = new Player("player1", "red");
const p2 = new Player("player2", "blue");
export const playerList = [p1, p2];
const pucks = [
  new Puck([220, 310], p1),
  new Puck([220, 440], p1),
  new Puck([360, 250], p1),
  new Puck([360, 500], p1),
  new Puck([400, 375], p1),
  new Puck([600, 375], p2),
  new Puck([640, 250], p2),
  new Puck([640, 500], p2),
  new Puck([780, 310], p2),
  new Puck([780, 440], p2)
];
const walls = [
  new Wall([150, 150], [850, 150]),
  new Wall([75, 290], [150, 290]),
  new Wall([75, 460], [150, 460]),
  new Wall([150, 600], [850, 600]),
  new Wall([850, 460], [925, 460]),
  new Wall([850, 290], [925, 290]),
  new Wall([150, 150], [150, 290]),
  new Wall([75, 290], [75, 460]),
  new Wall([150, 460], [150, 600]),
  new Wall([850, 460], [850, 600]),
  new Wall([925, 290], [925, 460]),
  new Wall([850, 150], [850, 290])
];
const zones = [
  new Goal({
    posX: 75,
    posY: 290,
    height: 170,
    width: 75,
    fill: "grey",
    owner: p1
  }),
  new Goal({
    posX: 850,
    posY: 290,
    height: 170,
    width: 75,
    fill: "grey",
    owner: p2
  })
];
const ball = [new Ball([500, 375])];
export const gameEntities = pucks.concat(ball, zones, walls);
