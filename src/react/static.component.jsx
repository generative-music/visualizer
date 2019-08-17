import React, { useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import Canvas from './canvas.component.jsx';

const Visualizer = ({
  width,
  height,
  drawCanvas,
  config,
  canvasRef = useRef(null),
}) => {
  useEffect(
    () => {
      if (typeof drawCanvas === 'function') {
        drawCanvas({
          canvasEl: canvasRef.current,
          ...config,
        });
      }
    },
    [canvasRef, config, drawCanvas]
  );

  return <Canvas canvasRef={canvasRef} height={height} width={width} />;
};

Visualizer.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  drawCanvas: propTypes.func.isRequired,
  config: propTypes.object,
  canvasRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
};

export default Visualizer;
