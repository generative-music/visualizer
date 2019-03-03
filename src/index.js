import colorSchemes from 'nice-color-palettes/1000';
import colorConvert from 'color-convert';

let colorScheme;

const changeColorScheme = () => {
  colorScheme = colorSchemes[
    Math.floor(Math.random() * colorSchemes.length)
  ].map(hex => colorConvert.hex.rgb(hex));
};

const getRandomColor = () =>
  Math.random() < 0.25
    ? [0, 0, 0]
    : colorScheme[Math.floor(Math.random() * colorScheme.length)];

const canvas = document.getElementById('canvas');
const shortestDimLength = Math.min(canvas.width, canvas.height);
const squareLength = Math.floor(Math.sqrt(shortestDimLength ** 2 / 2));
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';
const lineWidth = Math.max(1, Math.round(squareLength / 100));
ctx.lineWidth = lineWidth;
const half = length => length / 2;

const midX = half(canvas.width);
const leftX = midX - half(squareLength);
const rightX = midX + half(squareLength);
const midY = half(canvas.height);
const topY = midY - half(squareLength);
const bottomY = midY + half(squareLength);

const lineAnchors = [
  [leftX, midY],
  [leftX, topY],
  [midX, topY],
  [rightX, topY],
  [rightX, midY],
  [rightX, bottomY],
  [midX, bottomY],
  [leftX, bottomY],
];

const corners = lineAnchors.filter(
  ([x, y]) => (x === leftX || x === rightX) && (y === topY || y === bottomY)
);

const lines = lineAnchors.map(coordinates => coordinates.concat([midX, midY]));

const getSingleLinePath = coordinates => {
  const path = new Path2D();
  coordinates.forEach(([x1, y1, x2, y2]) => {
    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
  });
  return path;
};

const getTrianglePath = (x1, y1, x2, y2, x3, y3) => {
  const path = new Path2D();
  path.moveTo(x1, y1);
  path.lineTo(x2, y2);
  path.lineTo(x3, y3);
  path.closePath();
  return path;
};

const getTrianglePathsForCornerCoordinate = ([x, y]) =>
  [[x, midY], [midX, y]].map(([x3, y3]) =>
    getTrianglePath(x, y, midX, midY, x3, y3)
  );

const trianglePaths = corners.reduce((allTriangles, coordinate) => {
  const triangles = getTrianglePathsForCornerCoordinate(coordinate);
  const [x, y] = coordinate;
  const reverse = (x > midX && y < midY) || (x < midX && y > midY);
  return allTriangles.concat(reverse ? triangles.reverse() : triangles);
}, []);

const generateImage = () => {
  const selectedLines = lines
    .map((path, index) => ({ path, index }))
    .filter(() => Math.random() < 0.25);

  const lineIndices = selectedLines.map(({ index }) => index);

  const shapeIndices = [];
  if (lineIndices.length <= 1) {
    shapeIndices.push([0, 1, 2, 3, 4, 5, 6, 7]);
  } else {
    for (let i = 0; i < lineIndices.length - 1; i += 1) {
      const currentIndex = lineIndices[i];
      const nextIndex = lineIndices[i + 1];
      const shape = [];
      for (let j = currentIndex; j < nextIndex; j += 1) {
        shape.push(j);
      }
      shapeIndices.push(shape);
    }
    const [firstIndex] = lineIndices;
    let currentIndex = lineIndices[lineIndices.length - 1];
    const shape = [];
    while (currentIndex !== firstIndex) {
      shape.push(currentIndex);
      currentIndex = currentIndex === 7 ? (currentIndex = 0) : currentIndex + 1;
    }
    shapeIndices.push(shape);
  }
  ctx.globalCompositeOperation = 'lighter';
  changeColorScheme();

  shapeIndices.filter(() => Math.random() < 0.5).forEach(shapeIds => {
    const [r, g, b] = getRandomColor();
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
    shapeIds.forEach(index => {
      ctx.fill(trianglePaths[index]);
    });
  });

  ctx.globalCompositeOperation = 'source-over';
  const linePath = getSingleLinePath(selectedLines.map(({ path }) => path));
  ctx.lineCap = 'round';
  ctx.stroke(linePath);
  ctx.lineCap = 'butt';
  ctx.strokeRect(leftX, topY, squareLength, squareLength);
};

generateImage();
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  generateImage();
}, 2000);
