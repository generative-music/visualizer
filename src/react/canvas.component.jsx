import React, { useRef } from 'react';
import propTypes from 'prop-types';

const Canvas = ({ width, height, canvasRef = useRef(null) }) => (
  <canvas
    ref={canvasRef}
    height={height}
    width={width}
    style={{ backgroundColor: 'black' }}
  />
);

Canvas.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  canvasRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
};

export default Canvas;
