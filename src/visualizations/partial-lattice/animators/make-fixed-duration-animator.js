import makeAnimator from './make-animator';

const makeFixedDurationAnimator = ({
  duration,
  now,
  getAnimationDuration,
  ...props
}) => {
  const startTime = now();
  let minAnimationDuration = Infinity;
  const animator = makeAnimator({
    now,
    isPlaying: () => now() - startTime < duration,
    getAnimationDuration: () => {
      const maxPossibleAnimationDuration = duration - (now() - startTime);
      const animationDuration = getAnimationDuration();
      minAnimationDuration = Math.min(animationDuration, minAnimationDuration);
      if (maxPossibleAnimationDuration < minAnimationDuration) {
        return 0;
      }
      if (animationDuration > maxPossibleAnimationDuration) {
        return (
          minAnimationDuration +
          Math.random() * (maxPossibleAnimationDuration - minAnimationDuration)
        );
      }
      return animationDuration;
    },
    ...props,
  });
  return animator;
};

export default makeFixedDurationAnimator;
