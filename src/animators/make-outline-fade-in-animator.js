function* makeOutlineFadeInAnimator({ animationTimeSeconds }) {
  const animationTimeMs = animationTimeSeconds * 1000;
  const startTime = Date.now();
  for (
    let outlineOpacity = 0;
    outlineOpacity < 1;
    outlineOpacity = Math.min((Date.now() - startTime) / animationTimeMs, 1)
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

export default makeOutlineFadeInAnimator;
