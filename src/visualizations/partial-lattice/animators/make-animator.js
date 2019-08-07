import getRandomConfig from '../get-random-config';
import line from '../line';
import getSCoordinates from '../get-s-coordinates';

function* makeLineAnimation({
  startX,
  startY,
  endX,
  endY,
  color,
  now,
  animationDuration,
}) {
  if (animationDuration > 0) {
    const startTime = now();
    let x2 = startX;
    let y2 = startY;
    const xPredicate = startX <= endX ? x => x < endX : x => x > endX;
    const yPredicate = startY <= endY ? y => y < endY : y => y > endY;
    while (xPredicate(x2) || yPredicate(y2)) {
      const pctComplete = (now() - startTime) / (animationDuration / 3);
      x2 = (endX - startX) * pctComplete + startX;
      y2 = (endY - startY) * pctComplete + startY;
      yield line(startX, startY, x2, y2, color);
    }
    let x1 = startX;
    let y1 = startY;
    while (now() - startTime < (animationDuration / 3) * 2) {
      yield line(startX, startY, endX, endY, color);
    }
    while (xPredicate(x1) || yPredicate(y1)) {
      const pctComplete =
        (now() - (startTime + (animationDuration / 3) * 2)) /
        (animationDuration / 3);
      x1 = (endX - startX) * pctComplete + startX;
      y1 = (endY - startY) * pctComplete + startY;
      yield line(x1, y1, endX, endY, color);
    }
  }
}

function* makeAnimator({
  now,
  getAnimationDuration,
  width,
  height,
  firstConfig,
  isPlaying,
  center = false,
}) {
  let { lines } =
    typeof firstConfig === 'undefined'
      ? getRandomConfig({ width, height })
      : firstConfig;
  const { heightCount, widthCount } = getSCoordinates({ width, height });
  if (typeof firstConfig === 'object' && center) {
    const [maxX, maxY] = firstConfig.lines.reduce(
      ([maxXFound, maxYFound], { x1, y1, x2, y2 }) => [
        Math.max(maxXFound, x1, x2),
        Math.max(maxYFound, y1, y2),
      ],
      [0, 0]
    );
    const xNudge = Math.floor((widthCount - maxX) / 2);
    const yNudge = Math.floor((heightCount - maxY) / 2);
    lines = lines.map(({ x1, y1, x2, y2, color }) => ({
      x1: x1 + xNudge,
      y1: y1 + yNudge,
      x2: x2 + xNudge,
      y2: y2 + yNudge,
      color,
    }));
  }
  const lineAnimators = lines
    .filter(
      ({ x1, y1, x2, y2 }) =>
        x1 <= widthCount &&
        x2 <= widthCount &&
        y1 <= heightCount &&
        y2 <= heightCount
    )
    .map(({ x1, y1, x2, y2, color }) => {
      const flip = Math.random() < 0.5;
      return makeLineAnimation({
        now,
        color,
        startX: flip ? x2 : x1,
        startY: flip ? y2 : y1,
        endX: flip ? x1 : x2,
        endY: flip ? y1 : y2,
        animationDuration: getAnimationDuration(),
      });
    });
  let lastAdditionTime = now();
  let nextAdditionTimeout = getAnimationDuration();
  while (isPlaying()) {
    if (now() - lastAdditionTime > nextAdditionTimeout) {
      const newLines = getRandomConfig({ width, height }).lines;
      const durations = newLines.map(() => getAnimationDuration());
      const randomDuration = Math.min(...durations);
      lineAnimators.push(
        ...newLines.map(({ x1, y1, x2, y2, color }, i) => {
          const flip = Math.random() < 0.5;
          return makeLineAnimation({
            now,
            color,
            startX: flip ? x2 : x1,
            startY: flip ? y2 : y1,
            endX: flip ? x1 : x2,
            endY: flip ? y1 : y2,
            animationDuration: durations[i],
          });
        })
      );
      lastAdditionTime = now();
      nextAdditionTimeout = randomDuration;
    }
    const [completed, toDraw] = lineAnimators.reduce(
      ([completedAnimations, drawableValues], iterator) => {
        const { value, done } = iterator.next();
        if (done) {
          return [completedAnimations.concat([iterator]), drawableValues];
        }
        return [completedAnimations, drawableValues.concat([value])];
      },
      [[], []]
    );
    completed.forEach(animator => {
      const i = lineAnimators.indexOf(animator);
      if (i >= 0) {
        lineAnimators.splice(i, 1);
      }
    });
    yield { lines: toDraw };
  }
}

export default makeAnimator;
