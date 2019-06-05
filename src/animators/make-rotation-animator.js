function* makeRotationAnimator({ animationTimeSeconds, totalRotation }) {
  const animationTimeMs = animationTimeSeconds * 1000;
  const rotationStartTime = Date.now();
  for (
    let rotation = 0;
    Math.abs(rotation) < Math.abs(totalRotation);
    rotation =
      Math.min((Date.now() - rotationStartTime) / animationTimeMs, 1) *
      totalRotation
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
