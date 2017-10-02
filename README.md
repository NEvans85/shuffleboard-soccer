# Shuffleboard Soccer

A turn-based game where two players attempt to propel a ball object into the opposing goal area while protecting his or her own goal. This is done by applying force to one of five puck objects which are representative to the players on a soccer team.

## Overview

The game is won by the player who is first to reach three goals. In the interest of fairness, a goal scored on the initial play does not count. It forces a reset of the board and control is passed to the opposing player.
The game utilizes a simple 2-D physics engine which simulates elastic collisions between discs, the ball, and the edges of the playing area. It also simulates kinetic friction to force discs to eventually come to a stop once force is applied.
To provide a single-player experience an AI will be developed with multiple difficulty settings.

## Functionality and MVPs

* A simple 2-D physics engine will govern the behavior of the game objects after the initial application of force. The engine consists of three parts.
  - The entities which represent the state of the various game objects. The types of entities are:
    + Puck - User's play pieces. Uniform in radius, mass, and coefficient of friction. Color is representative of player ownership.
    + Ball - Neutral game object. Smaller in mass, radius, and coefficient of friction than pucks.
    + Zone - Type of the play-field and goal areas. The pucks and ball move within these zones and their edges are immobile and impermeable.
  - A collision detector to determine when two objects are occupying the same space on the game board.
  - A collision handler which performs the necessary computations to simulate elastic collisions between objects. It employs the concept of conservation of momentum to determine the resulting velocities of the involved objects.
* The game will keep track of whose turn it is and allow the current player to only interact with his or her own pucks,
* Users will apply force to his or her pucks using a click and drag interface, allowing the player to control the direction and magnitude of the applied force.
* When the ball object enters a player's goal zone, the opposing player receives a point and the board is reset.
* The game will keep track of and display score, ending the game when three goals have been scored by one player.
* A simple AI will be implemented to provide a single player experience.

## Wireframes

### Initial State

This is the state at the beginning of the game as well as after each goal.

![initial state](/README_assets/initial_setup.png)

### Move in Progress

The red arrow indicates the direction and magnitude of the puck movement.

![move in progress](/README_assets/move_in_progress.png)
