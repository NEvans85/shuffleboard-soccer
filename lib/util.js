export const calcDistance = (pos1, pos2) => {
  return pythagoreanResult(pos2[0] - pos1[0], pos2[1] - pos1[1]);
};

export const pythagoreanResult = (a, b) => {
  return Math.sqrt(a * a + b * b);
};
