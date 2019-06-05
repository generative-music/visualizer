function* makeOutlineFadeOutAnimator({ animationTimeSeconds }) {
  const animationTimeMs = animationTimeSeconds * 1000;
  const startTime = Date.now();
  for (
    let outlineOpacity = 1;
    outlineOpacity > 0;
    outlineOpacity = Math.max(1 - (Date.now() - startTime) / animationTimeMs, 0)
  ) {
    yield {
      outlineOpacity,
      shapes: [],
      anchors: [],
      rotation: 0,
      opacity: 0,
    };
  }
}

export default makeOutlineFadeOutAnimator;
