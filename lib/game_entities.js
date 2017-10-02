import Puck from "./Entities/puck";
import Ball from "./Entities/ball";
import Wall from "./Entities/wall";
import Goal from "./Entities/goal";
import Player from "./player";

const p1 = new Player("player1");
const p2 = new Player("player2");
export const playerList = [p1, p2];

export const entityList = [new Puck([100, 100], p1)];
