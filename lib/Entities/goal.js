import Zone from "./zone";

class Goal extends Zone {
  constructor(initialParams) {
    const defaultParams = {
      height: 170,
      width: 75
    };
    const newParams = Object.assign({}, initialParams, defaultParams);
    super(newParams);
  }
}

export default Goal;
