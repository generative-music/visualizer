function* makeRotationAnimator({ duration, now, totalRotation }) {
  const rotationStartTime = now();
  for (
    let rotation = 0;
    Math.abs(rotation) < Math.abs(totalRotation);
    rotation =
      Math.min((now() - rotationStartTime) / duration, 1) * totalRotation
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
