# ShuffleBoard Soccer

A turn-based two player strategy game modeled after Soccer.

## Live Link

[Shuffleboard Soccer](https://nevans85.github.io/shuffleboard-soccer/)

## Technologies Used

Physics engine built from scratch in vanilla Javascript. Graphics are rendered entirely within an HTML5 Canvas element.

## Features

![Screenshot](http://res.cloudinary.com/arcane-lab/image/upload/v1507522293/Screen_Shot_2017-10-06_at_12.04.14_PM_hyv8xr.png)

### Gameplay

Players click and drag on pucks to apply force in an attempt to bump the ball into the opposing goal. Game uses recursive calls to requestAnimationFrame to animate the game objects. Control switches between players after all entities have come to a stop. Score is kept and displayed. The first player to score three goals wins!

Creating a turn structure on a continuous animation utilizes setInterval to watch for the moment when the objects stop moving. The following method is called when the player releases the mouse button to launch a puck.

``` javascript
playerSwitchWatch() {
  const self = this;
  this.switchInterval = setInterval(() => {
    if (!self.movingEntities()) {
      self.switchPlayers();
      clearInterval(self.switchInterval);
    }
  }, 1000);
}
```
"This" must be set to a local variable here for use within the setInterval function where "this" is the window rather than the class housing the playerSwitchWatch method.

### Physics

Real world physics recreated in a digital space. Physics engine composed of three main parts:
- Entities - Each interacting object created from a descendent of an Entity class. Entities are representations of real world objects. Interacting game objects are: Pucks, Walls, Goals, and the Ball
- Collision Detector - Checks all moving objects on each frame to determine if they are in contact with one another or the unmoving walls surrounding the field.
- Collision Resolver - Calculates the resulting direction and velocity of colliding objects. Uses conservation of momentum and trigonometry to determine the collision angle between round objects and the direction objects move after the collision to create realistic elastic collisions between objects.

## Future Improvements

The game could be improved in many ways.

1. The game lacks any instructions. These should definitely be added.
2. The force a player applies to a puck should be limited and the indicator for it should be an arrow.
1. Collisions around corners can be inaccurate, this could be addressed with conditional logic.
2. Player accounts and network play could be implemented to provide a competitive community.
3. An AI could be developed to provide a single player experience.
2. The game could be expanded into a 3-6 player experience with a larger field and additional goals.
