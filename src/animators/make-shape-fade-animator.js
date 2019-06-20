function* makeShapeFadeAnimator({ duration, now, shapes, anchors }) {
  const fadeInStartTime = now();
  for (
    let opacity = 0;
    opacity < 1;
    opacity = (now() - fadeInStartTime) / (duration / 2)
  ) {
    yield {
      shapes,
      anchors,
      opacity,
      outlineOpacity: 1,
      rotation: 0,
    };
  }
  const fadeOutStartTime = now();
  for (
    let opacity = 1;
    opacity > 0;
    opacity = 1 - (now() - fadeOutStartTime) / (duration / 2)
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
