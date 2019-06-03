import getRandomConfig from '../get-random-config';
import makeOutlineFadeInAnimator from './make-outline-fade-in-animator';
import makeShapeFadeAnimator from './make-shape-fade-animator';
import makeRotationAnimator from './make-rotation-animator';
import makeOutlineFadeOutAnimator from './make-outline-fade-out-animator';
import concatanimators from './concat-animators';

function* makeFixedDurationAnimation({ durationSeconds, coreAnimationCount }) {
  // core animations are twice as long as the outline fade in/out
  const animationTimeSeconds = durationSeconds / (coreAnimationCount * 2 + 2);
  const fadeInAnimator = makeOutlineFadeInAnimator({ animationTimeSeconds });
  const coreAnimators = [];
  for (let i = 0; i < coreAnimationCount; i += 1) {
    const { shapes, anchors } = getRandomConfig();
    const rotate =
      anchors.length === 0 &&
      shapes.every(({ color }) => color.every(value => value === 0));
    if (rotate) {
      const totalRotation = Math.random() < 0.5 ? -90 : 90;
      coreAnimators.push(
        makeRotationAnimator({
          animationTimeSeconds: animationTimeSeconds * 2,
          totalRotation,
        })
      );
    } else {
      coreAnimators.push(
        makeShapeFadeAnimator({
          animationTimeSeconds: animationTimeSeconds * 2,
          shapes,
          anchors,
        })
      );
    }
  }
  const fadeOutAnimator = makeOutlineFadeOutAnimator({ animationTimeSeconds });
  yield* concatanimators(fadeInAnimator, ...coreAnimators, fadeOutAnimator);
}

export default makeFixedDurationAnimation;
