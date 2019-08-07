function* makeOutlineFadeInAnimator({ duration, now }) {
  const startTime = now();
  for (
    let outlineOpacity = 0;
    outlineOpacity < 1;
    outlineOpacity = (now() - startTime) / duration
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
