import React from 'react';
import { render } from 'react-dom';
import Whammy from 'whammy';
import Static from './static/static.component.jsx';
import makeFixedDurationAnimation from './animation-generators/make-fixed-duration-animator';

const FPS = 30;

const animation = makeFixedDurationAnimation({
  durationSeconds: 10,
  numberOfShapeAnimations: 0,
  fps: FPS,
});

const frames = Array.from(animation);
const canvasRef = React.createRef();

const renderedFrames = [];

const start = Date.now();
const renderFrame = index => {
  const { shapes, anchors, outlineOpacity, opacity, rotation } = frames[index];

  window.requestAnimationFrame(() => {
    render(
      <Static
        height={720}
        width={1280}
        shapes={shapes}
        anchors={anchors}
        outlineOpacity={outlineOpacity}
        opacity={opacity}
        rotation={rotation}
        canvasRef={canvasRef}
      />,
      document.getElementById('root')
    );

    renderedFrames.push(canvasRef.current.toDataURL('image/webp'));
    if (index + 1 < frames.length) {
      renderFrame(index + 1);
    } else {
      const compiled = Whammy.fromImageArray(renderedFrames, FPS);
      const end = Date.now();
      console.log(`rendered in ${end - start}ms`);
      const blobUrl = URL.createObjectURL(compiled);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'testvideo.webm';
      link.innerHTML = 'Click here to download the file';
      document.body.appendChild(link);
      link.click();
    }
  });
};

renderFrame(0);
