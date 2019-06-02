import getRandomConfig from '../get-random-config';

function* makeFixedDurationAnimation({
  durationSeconds,
  numberOfShapeAnimations,
  fps,
}) {
  const animationTimeSeconds =
    durationSeconds / (numberOfShapeAnimations * 2 + 2);
  const framesPerAnimation = animationTimeSeconds * fps;
  for (
    let currentAnimationFrame = 0;
    currentAnimationFrame <= framesPerAnimation;
    currentAnimationFrame += 1
  ) {
    yield {
      shapes: [],
      anchors: [],
      outlineOpacity: currentAnimationFrame / framesPerAnimation,
    };
  }
  for (
    let animationNumber = 1;
    animationNumber <= numberOfShapeAnimations;
    animationNumber += 1
  ) {
    const { shapes, anchors, drawLines } = getRandomConfig();
    const rotate =
      (anchors.length === 0 || !drawLines) &&
      (shapes.length === 0 ||
        (shapes.length === 1 && shapes[0].color.every(value => value === 0)));
    if (rotate) {
      const totalRotation = Math.random() < 0.5 ? -90 : 90;
      for (
        let currentAnimationFrame = 0;
        currentAnimationFrame <= framesPerAnimation * 2;
        currentAnimationFrame += 1
      ) {
        yield {
          shapes: [],
          anchors: [],
          outlineOpacity: 1,
          rotation:
            (currentAnimationFrame / (framesPerAnimation * 2)) * totalRotation,
        };
      }
    } else {
      for (
        let currentAnimationFrame = 0;
        currentAnimationFrame <= framesPerAnimation;
        currentAnimationFrame += 1
      ) {
        yield {
          shapes,
          anchors,
          outlineOpacity: 1,
          rotation: 0,
          opacity: currentAnimationFrame / framesPerAnimation,
        };
      }
      for (
        let currentAnimationFrame = 0;
        currentAnimationFrame <= framesPerAnimation;
        currentAnimationFrame += 1
      ) {
        yield {
          shapes,
          anchors,
          outlineOpacity: 1,
          rotation: 0,
          opacity: 1 - currentAnimationFrame / framesPerAnimation,
        };
      }
    }
  }
  for (
    let currentAnimationFrame = 0;
    currentAnimationFrame <= framesPerAnimation;
    currentAnimationFrame += 1
  ) {
    yield {
      shapes: [],
      anchors: [],
      outlineOpacity: 1 - currentAnimationFrame / framesPerAnimation,
    };
  }
}

export default makeFixedDurationAnimation;
