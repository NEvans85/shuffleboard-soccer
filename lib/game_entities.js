import Puck from "./Entities/puck";
import Ball from "./Entities/ball";
import Wall from "./Entities/wall";
import Goal from "./Entities/goal";
import Player from "./player";

const p1 = new Player("player1", "red");
const p2 = new Player("player2", "blue");
export const playerList = [p1, p2];
const pucks = [
  new Puck([220, 260], p1),
  new Puck([220, 390], p1),
  new Puck([360, 200], p1),
  new Puck([360, 450], p1),
  new Puck([400, 325], p1),
  new Puck([600, 325], p2),
  new Puck([640, 200], p2),
  new Puck([640, 450], p2),
  new Puck([780, 260], p2),
  new Puck([780, 390], p2)
];
const walls = [
  new Wall([150, 100], [850, 100]),
  new Wall([150, 100], [150, 240]),
  new Wall([150, 240], [75, 240]),
  new Wall([75, 240], [75, 410]),
  new Wall([75, 410], [150, 410]),
  new Wall([150, 410], [150, 550]),
  new Wall([150, 550], [850, 550]),
  new Wall([850, 550], [850, 410]),
  new Wall([850, 410], [925, 410]),
  new Wall([925, 410], [925, 240]),
  new Wall([925, 240], [850, 240]),
  new Wall([850, 240], [850, 100])
];
const zones = [
  new Goal({ posX: 75, posY: 240, height: 170, width: 75, fill: "grey" })
];
const ball = [new Ball([500, 325])];
export const allEntities = pucks.concat(walls, zones, ball);
export const movingEntities = pucks.concat(ball);
