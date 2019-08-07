import makeAnimator from './make-animator';

const makeEndlessAnimator = config =>
  makeAnimator(Object.assign({ isPlaying: () => true }, config));

export default makeEndlessAnimator;
