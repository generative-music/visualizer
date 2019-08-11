import getSCoordinates from './get-s-coordinates';

const centerLines = ({ lines, width, height }) => {
  const { heightCount, widthCount } = getSCoordinates({ width, height });

  const [maxX, maxY] = lines.reduce(
    ([maxXFound, maxYFound], { x1, y1, x2, y2 }) => [
      Math.max(maxXFound, x1, x2),
      Math.max(maxYFound, y1, y2),
    ],
    [0, 0]
  );
  const xNudge = Math.floor((widthCount - maxX) / 2);
  const yNudge = Math.floor((heightCount - maxY) / 2);
  return lines
    .map(({ x1, y1, x2, y2, color }) => ({
      x1: x1 + xNudge,
      y1: y1 + yNudge,
      x2: x2 + xNudge,
      y2: y2 + yNudge,
      color,
    }))
    .filter(
      ({ x1, y1, x2, y2 }) =>
        x1 <= widthCount &&
        x2 <= widthCount &&
        y1 <= heightCount &&
        y2 <= heightCount
    );
};

export default centerLines;
