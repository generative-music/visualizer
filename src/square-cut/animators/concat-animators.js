function* concatanimators(...animators) {
  for (let i = 0; i < animators.length; i += 1) {
    yield* animators[i];
  }
}

export default concatanimators;
