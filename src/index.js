import colorSchemes from 'nice-color-palettes/1000';

const colorScheme =
  colorSchemes[Math.floor(Math.random() * colorSchemes.length)];

const getRandomColor = () =>
  colorScheme[Math.floor(Math.random() * colorScheme.length)];

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

const corners = [
  [leftX, topY],
  [rightX, topY],
  [leftX, bottomY],
  [rightX, bottomY],
];

const lineStarts = corners.concat([
  [midX, topY],
  [rightX, midY],
  [midX, bottomY],
  [leftX, midY],
]);

const lines = lineStarts.map(coordinates => coordinates.concat([midX, midY]));

const getSingleLinePath = coordinates => {
  const path = new Path2D();
  let atMiddle = false;
  coordinates.forEach(([x1, y1, x2, y2]) => {
    if (atMiddle) {
      path.lineTo(x1, y1);
    } else {
      path.moveTo(x1, y1);
      path.lineTo(x2, y2);
    }
    atMiddle = !atMiddle;
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

const trianglePaths = corners.reduce(
  (allTriangles, coordinate) =>
    allTriangles.concat(getTrianglePathsForCornerCoordinate(coordinate)),
  []
);

trianglePaths.filter(() => Math.random() < 0.25).forEach(path => {
  ctx.fillStyle = getRandomColor();
  ctx.fill(path);
});

const linePath = getSingleLinePath(lines.filter(() => Math.random() < 0.25));
ctx.stroke(linePath);

ctx.strokeRect(leftX, topY, squareLength, squareLength);
