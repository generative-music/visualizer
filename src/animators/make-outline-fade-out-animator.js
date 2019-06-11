function* makeOutlineFadeOutAnimator({ duration, now }) {
  const startTime = now();
  for (
    let outlineOpacity = 1;
    outlineOpacity > 0;
    outlineOpacity = Math.max(1 - (now() - startTime) / duration, 0)
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
