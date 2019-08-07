import getRandomConfig from '../get-random-config';
import makeShapeFadeAnimator from './make-shape-fade-animator';
import makeRotationAnimator from './make-rotation-animator';

function* makeEndlessAnimator({ animationDuration, now }) {
  while (1) {
    const { shapes, anchors } = getRandomConfig();
    const rotate =
      anchors.length === 0 &&
      shapes.every(({ color }) => color.every(value => value === 0));
    let animator;
    if (rotate) {
      const totalRotation = Math.random() < 0.5 ? -90 : 90;
      animator = makeRotationAnimator({
        duration: animationDuration,
        now,
        totalRotation,
      });
    } else {
      animator = makeShapeFadeAnimator({
        duration: animationDuration,
        now,
        shapes,
        anchors,
      });
    }
    yield* animator;
  }
}

export default makeEndlessAnimator;
