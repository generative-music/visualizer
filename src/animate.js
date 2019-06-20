import drawCanvas from './draw-canvas';

const animate = ({ canvasEl, animator, topText, bottomText, textPadding }) => {
  let raf;

  const renderFrameWithNextConfig = () => {
    const { done, value } = animator.next();
    if (!done) {
      drawCanvas({ canvasEl, topText, bottomText, textPadding, ...value });
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
