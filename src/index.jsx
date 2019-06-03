import React from 'react';
import { render } from 'react-dom';
import makeEndlessAnimator from './animators/make-endless-animator';
import Animated from './react/animated.component.jsx';

render(
  <Animated
    width={1280}
    height={720}
    animator={makeEndlessAnimator({ animationTimeSeconds: 30 })}
  />,
  document.getElementById('root')
);
