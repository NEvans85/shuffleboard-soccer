import Puck from "./Entities/puck";
import Ball from "./Entities/ball";
import Wall from "./Entities/wall";
import Goal from "./Entities/goal";
import Player from "./player";

const p1 = new Player("player1", "red");
const p2 = new Player("player2", "blue");
export const playerList = [p1, p2];
const pucks = [
  new Puck([240, 260], p1),
  new Puck([240, 390], p1),
  new Puck([800, 300], p2)
];
const walls = [
  new Wall([150, 100], [850, 100]),
  new Wall([150, 100], [150, 250]),
  new Wall([150, 250], [75, 250]),
  new Wall([75, 250], [75, 400]),
  new Wall([75, 400], [150, 400]),
  new Wall([150, 400], [150, 550]),
  new Wall([150, 550], [850, 550]),
  new Wall([850, 550], [850, 400]),
  new Wall([850, 400], [925, 400]),
  new Wall([925, 400], [925, 250]),
  new Wall([925, 250], [850, 250]),
  new Wall([850, 250], [850, 100])
];
const zones = [];
const ball = [new Ball([500, 325])];
export const allEntities = pucks.concat(walls, zones, ball);
export const movingEntities = pucks.concat(ball);
