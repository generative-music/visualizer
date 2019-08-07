import line from './line';
import getSCoordinates from './get-s-coordinates';

const COLORS = ['yellow', 'red', 'orange', 'cyan', 'magenta'];

const memoizedLines = new Map();
const getLines = ({ width, height }) => {
  const key = `${width}x${height}`;
  if (memoizedLines.has(key)) {
    return memoizedLines.get(key).slice(0);
  }

  const { widthCount, heightCount } = getSCoordinates({ width, height });

  const lines = [];
  for (let sx = 0; sx <= widthCount; sx += 1) {
    lines.push(line(sx, 0, sx, heightCount));
    for (let sy = 0; sy <= heightCount; sy += 1) {
      if (sx === 0 || sy === 0 || sy === heightCount) {
        if (sx === 0) {
          lines.push(line(0, sy, widthCount, sy));
        }
        if (sx < widthCount) {
          if (sy > 0) {
            const sx2 = Math.min(widthCount, sx + sy);
            const sy2 = Math.max(
              0,
              heightCount > widthCount
                ? sy - widthCount + sx
                : sx - (widthCount - heightCount)
            );
            lines.push(line(sx, sy, sx2, sy2));
          }
          if (sy < heightCount) {
            const sx2 = Math.min(
              widthCount,
              heightCount > widthCount
                ? heightCount - sy
                : heightCount - sy + sx
            );
            const sy2 = Math.min(widthCount - sx + sy, heightCount);
            lines.push(line(sx, sy, sx2, sy2));
          }
        }
      }
    }
  }
  memoizedLines.set(key, lines);
  return lines.slice(0);
};

const getRandomConfig = ({ width, height }) => ({
  visualizationType: 'partialLattice',
  lines: getLines({ width, height })
    .filter(() => Math.random() < 0.3)
    .map(coordinates => ({
      ...coordinates,
      color:
        Math.random() < 0.6
          ? 'white'
          : COLORS[Math.floor(Math.random() * COLORS.length)],
    })),
});

export default getRandomConfig;
