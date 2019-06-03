import React, { useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import drawCanvas from '../draw-canvas';
import Canvas from './canvas.component.jsx';

const Visualizer = ({
  width,
  height,
  outlineOpacity = 1,
  opacity = 1,
  rotation = 0,
  shapes = [],
  anchors = [],
  canvasRef = useRef(null),
}) => {
  useEffect(
    () => {
      drawCanvas({
        canvasEl: canvasRef.current,
        outlineOpacity,
        opacity,
        rotation,
        shapes,
        anchors,
      });
    },
    [canvasRef, outlineOpacity, opacity, rotation, shapes, anchors]
  );

  return <Canvas canvasRef={canvasRef} height={height} width={width} />;
};

Visualizer.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  opacity: propTypes.number,
  outlineOpacity: propTypes.number,
  rotation: propTypes.number,
  shapes: propTypes.array,
  anchors: propTypes.array,
  canvasRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
};

export default Visualizer;
