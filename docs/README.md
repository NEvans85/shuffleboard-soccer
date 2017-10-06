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

## Architecture and Technologies

* Vanilla Javascript for game structure, logic, and physics engine.
* HTML 5 Canvas for DOM manipulation and rendering.
* Webpack to bundle and serve the various scripts.

### Scripts

* game.js - Houses player data, tracks the score, determines when the game is over, constructs the game by adding entities to the environment, handles player input, starts the interval which displays the game board at each frame.
* render.js - Houses the logic which renders each of the entities at each frame.
* environment.js - Houses the collection of entities used in the game, allows for the addition and removal of entities, passes the collection of entities to the collision detector and the results of that to the resolver to handle collisions at each frame.
* environmant_params.js - Houses constants for gravity (used for calculating friction) and the interval length (16 for 60 FPS or 33 for 30 FPS). Any other constants necessary for the physics engine will go here.
* collision_detector.js - Analyzes the collection of game entities to determine if any collisions have occurred.
* collision_resolver.js - Takes in a collection of couplets which contain colliding entities. Calculated the resulting velocities of the entities using conservation of momentum.
* entity.js - Parent class for other entities. Handles changes in position, velocity, and acceleration due to user applied force as well as friction. Variables: position, velocity, acceleration, frictionCoefficient, mass, and fill (for rendering). Public methods: nextFrame, applyForce, setVelocity
* circle.js - Class for the puck and ball objects. Extends Entity. Variables: radius.
* zone.js - Class for field and goal objects. Contains a method to determine if an object is contained within (for determining a successful goal).
* wall.js - Class for objects which create the border around the play field and the back/sides of the goal. Might extend Entity.

## Implementation Timeline

Over the Weekend
- [ ] Refresh my understanding of Newtonian Physics specifically focusing on friction and elastic collisions.
- [ ] Build the structure/skeleton of the project.
- [ ] Write entities for the physics engine.

Monday
- [ ] Build render functionality to provide a workspace to test the physics engine as I tune it.
- [ ] Build collision detector.
- [ ] Start collision handler.

Tuesday

- [ ] Work on collision handler. This seems like the most challenging part of the project.

Wednesday

- [ ] Implement user click and drag to "shoot" pucks.
- [ ] Finish collision handler.

Thursday

- [ ] Build a rudimentary AI to provide some option for single player gameplay.
- [ ] Build scorekeeping and rest of game script.

Friday

- [ ] Improve artistic styling and add sounds to improve user experience.

## Bonus Features

- [ ] Improve AI to provide a challenge to the player.
- [ ] Design multiplayer fields to enable games with more players.
- [ ] Multiplayer over the web with player accounts and leaderboards.
