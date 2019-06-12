function* makeRotationAnimator({ duration, now, totalRotation }) {
  const rotationStartTime = now();
  for (
    let rotation = 0;
    Math.abs(rotation) < Math.abs(totalRotation);
    rotation = ((now() - rotationStartTime) / duration) * totalRotation
  ) {
    yield {
      rotation,
      shapes: [],
      anchors: [],
      opacity: 0,
      outlineOpacity: 1,
    };
  }
}

export default makeRotationAnimator;
