import colorSchemes from 'nice-color-palettes/1000';
import colorConvert from 'color-convert';

const getColorScheme = () =>
  colorSchemes[Math.floor(Math.random() * colorSchemes.length)].map(hex =>
    colorConvert.hex.rgb(hex)
  );

const getRandomColor = () => {
  if (Math.random() < 0.25) {
    return [0, 0, 0];
  }
  const scheme = getColorScheme();
  return scheme[Math.floor(Math.random() * scheme.length)];
};

const INDICIES = [0, 1, 2, 3, 4, 5, 6, 7];

const getRandomConfig = () => {
  const anchors = INDICIES.filter(() => Math.random() < 0.5);
  const shapes = [];
  if (anchors.length === 0) {
    shapes.push({ triangles: INDICIES.slice(0), color: getRandomColor() });
  } else {
    anchors.forEach((anchorIndex, i) => {
      const triangles = [];
      const currentAnchorIndex = anchors[i];
      if (i + 1 < anchors.length) {
        const nextAnchorIndex = anchors[i + 1];
        for (
          let triangleIndex = currentAnchorIndex;
          triangleIndex < nextAnchorIndex;
          triangleIndex += 1
        ) {
          triangles.push(triangleIndex);
        }
      } else {
        const [nextAnchorIndex] = anchors;
        for (
          let triangleIndex = currentAnchorIndex;
          triangleIndex > currentAnchorIndex || triangleIndex < nextAnchorIndex;
          triangleIndex + 1 < anchors.length
            ? (triangleIndex += 1)
            : (triangleIndex = 0)
        ) {
          triangles.push(triangleIndex);
        }
      }
      shapes.push({ triangles, color: getRandomColor() });
    });
  }
  return { anchors, shapes, drawLines: Math.random() < 0.5 };
};

export default getRandomConfig;
