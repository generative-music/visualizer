import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import Canvas from './canvas.component.jsx';
import animate from '../animate';

const Animated = ({
  width,
  height,
  animator,
  drawCanvas,
  canvasRef = useRef(null),
}) => {
  useEffect(
    () => animate({ canvasEl: canvasRef.current, animator, drawCanvas }),
    [animator, canvasRef]
  );

  return <Canvas canvasRef={canvasRef} width={width} height={height} />;
};

Animated.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  drawCanvas: propTypes.func.isRequired,
  animator: propTypes.shape({ next: propTypes.func.isRequired }).isRequired,
  canvasRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
};

export default Animated;
