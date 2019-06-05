function* makeShapeFadeAnimator({ animationTimeSeconds, shapes, anchors }) {
  const animationTimeMs = (animationTimeSeconds * 1000) / 2;
  const fadeInStartTime = Date.now();
  for (
    let opacity = 0;
    opacity < 1;
    opacity = Math.min((Date.now() - fadeInStartTime) / animationTimeMs, 1)
  ) {
    yield {
      shapes,
      anchors,
      opacity,
      outlineOpacity: 1,
      rotation: 0,
    };
  }
  const fadeOutStartTime = Date.now();
  for (
    let opacity = 1;
    opacity > 0;
    opacity = Math.max(1 - (Date.now() - fadeOutStartTime) / animationTimeMs, 0)
  ) {
    yield {
      shapes,
      anchors,
      opacity,
      outlineOpacity: 1,
      rotation: 0,
    };
  }
}

export default makeShapeFadeAnimator;
