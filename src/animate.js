const animate = ({ canvasEl, animator, drawCanvas }) => {
  let raf;

  const renderFrameWithNextConfig = () => {
    const { done, value } = animator.next();
    if (!done) {
      drawCanvas({ canvasEl, ...value });
      raf = window.requestAnimationFrame(renderFrameWithNextConfig);
    }
  };

  raf = window.requestAnimationFrame(renderFrameWithNextConfig);

  return () => {
    if (typeof raf !== 'undefined') {
      window.cancelAnimationFrame(raf);
    }
  };
};

export default animate;
