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
const squareLength = Math.floor(Math.sqrt(shortestDimLength ** 2 / 2) * 0.98);
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'white';
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

const getSingleLinePath = coordinates => {
  const path = new Path2D();
  coordinates.forEach(([x1, y1]) => {
    path.moveTo(x1, y1);
    path.lineTo(midX, midY);
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
  const selectedAnchors = lineAnchors
    .map((coordinate, index) => ({ coordinate, index }))
    .filter(() => Math.random() < 0.25);

  const anchorIndices = selectedAnchors.map(({ index }) => index);

  const shapeGroups = [];
  if (anchorIndices.length <= 1) {
    shapeGroups.push(trianglePaths);
  } else {
    for (let i = 0; i < anchorIndices.length - 1; i += 1) {
      const currentIndex = anchorIndices[i];
      const nextIndex = anchorIndices[i + 1];
      const shapeGroup = [];
      for (let j = currentIndex; j < nextIndex; j += 1) {
        shapeGroup.push(trianglePaths[j]);
      }
      shapeGroups.push(shapeGroup);
    }
    const [firstIndex] = anchorIndices;
    let currentIndex = anchorIndices[anchorIndices.length - 1];
    const shape = [];
    while (currentIndex !== firstIndex) {
      shape.push(trianglePaths[currentIndex]);
      currentIndex = currentIndex === 7 ? (currentIndex = 0) : currentIndex + 1;
    }
    shapeGroups.push(shape);
  }
  const selectedShapeGroups = shapeGroups.filter(() => Math.random() < 0.5);
  changeColorScheme();
  return [
    selectedAnchors.map(({ coordinate }) => coordinate),
    selectedShapeGroups.map(shapes => ({ shapes, color: getRandomColor() })),
  ];
};

const animate = () => {
  let animationStart;
  const animationTimeMs = 10000;
  const [anchors, shapeGroups] = generateImage();
  const drawLines = Math.random() < 0.5;

  const rotate =
    (anchors.length === 0 || !drawLines) && shapeGroups.length === 0;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (rotate) {
    const totalRotation = Math.random() < 0.5 ? 90 : -90;
    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(midX, midY);
      const rotationPct = Math.min(
        (Date.now() - animationStart) / animationTimeMs,
        1
      );
      ctx.rotate(rotationPct * totalRotation * (Math.PI / 180));

      ctx.lineCap = 'butt';
      ctx.strokeStyle = 'white';
      ctx.strokeRect(
        -half(squareLength),
        -half(squareLength),
        squareLength,
        squareLength
      );
      if (rotationPct < 1) {
        window.requestAnimationFrame(() => {
          draw();
        });
      } else {
        animate();
      }
    };
    window.requestAnimationFrame(() => {
      animationStart = Date.now();
      draw();
    });
  } else {
    const linePath = getSingleLinePath(anchors);

    const draw = (fadeIn = true) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const opacity = fadeIn
        ? Math.min((now - animationStart) / animationTimeMs, 1)
        : Math.max(1 - (now - animationStart) / animationTimeMs, 0);

      ctx.globalCompositeOperation = 'lighter';

      shapeGroups.forEach(({ shapes, color }) => {
        const [r, g, b] = color;
        const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fillStyle = rgbaColor;
        shapes.forEach(shape => {
          ctx.fill(shape);
        });
      });

      ctx.globalCompositeOperation = 'source-over';
      if (drawLines) {
        ctx.lineCap = 'round';
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.stroke(linePath);
      }

      ctx.lineCap = 'butt';
      ctx.strokeStyle = 'white';
      ctx.strokeRect(leftX, topY, squareLength, squareLength);

      if (fadeIn && opacity < 1) {
        window.requestAnimationFrame(() => {
          draw(true);
        });
      } else if (!fadeIn && opacity > 0) {
        window.requestAnimationFrame(() => {
          draw(false);
        });
      } else if (opacity > 0) {
        window.requestAnimationFrame(() => {
          animationStart = Date.now();
          draw(false);
        });
      } else {
        animate();
      }
    };

    window.requestAnimationFrame(() => {
      animationStart = Date.now();
      draw();
    });
  }
};

animate();
