class Zone {
  constructor(initialParams) {
    const defaultParams = {
      posX: 0,
      posY: 0,
      height: 600,
      width: 400
    };
    const newParams = Object.assign({}, defaultParams, initialParams);
    this.height = newParams.height;
    this.width = newParams.width;
  }

  contains(object) {
    if (object instanceof Circle) {
      return (
        this.posX <= object.posX - object.radius &&
        this.posX + this.width >= object.posX + object.radius &&
        this.posY <= object.posY - object.radius &&
        this.posY + this.height >= object.posY + object.radius
      );
    }
  }
}

export default Zone;
