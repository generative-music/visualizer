const half = length => length / 2;

const getTrianglePath = (x1, y1, x2, y2, x3, y3) => {
  const path = new Path2D();
  path.moveTo(x1, y1);
  path.lineTo(x2, y2);
  path.lineTo(x3, y3);
  path.closePath();
  return path;
};

const drawCanvas = ({
  canvasEl,
  outlineOpacity = 1,
  opacity = 1,
  rotation = 0,
  shapes = [],
  anchors = [],
}) => {
  if (canvasEl) {
    const ctx = canvasEl.getContext('2d');
    const { height, width } = canvasEl;
    const shortestDimLength = Math.min(width, height);
    const squareLength = Math.floor(
      Math.sqrt(shortestDimLength ** 2 / 2) * 0.98
    );
    const lineWidth = Math.max(1, Math.round(squareLength / 100));
    ctx.lineWidth = lineWidth;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.translate(half(width), half(height));

    const halfSqrLength = half(squareLength);

    const leftX = -halfSqrLength;
    const midX = 0;
    const rightX = halfSqrLength;
    const topY = -halfSqrLength;
    const midY = 0;
    const bottomY = halfSqrLength;

    const getTrianglePathsForCornerCoordinate = ([x, y]) =>
      [[x, midY], [midX, y]].map(([x3, y3]) =>
        getTrianglePath(x, y, midX, midY, x3, y3)
      );

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

    const trianglePaths = corners.reduce((allTriangles, coordinate) => {
      const triangles = getTrianglePathsForCornerCoordinate(coordinate);
      const [x, y] = coordinate;
      const reverse = (x > midX && y < midY) || (x < midX && y > midY);
      return allTriangles.concat(reverse ? triangles.reverse() : triangles);
    }, []);

    const getSingleLinePath = coordinates => {
      const path = new Path2D();
      coordinates.forEach(([x1, y1]) => {
        let x = x1;
        if (x > 0) {
          x = x - 1;
        } else if (x < 0) {
          x = x + 1;
        }
        let y = y1;
        if (y > 0) {
          y = y - 1;
        } else if (y < 0) {
          y = y + 1;
        }
        path.moveTo(x, y);
        path.lineTo(midX, midY);
      });
      return path;
    };

    ctx.rotate(rotation * (Math.PI / 180));

    //draw shapes
    ctx.globalCompositeOperation = 'lighter';
    shapes.forEach(({ triangles, color }) => {
      const shapeTriangles = triangles.map(index => trianglePaths[index]);
      const [r, g, b] = color;
      const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.fillStyle = rgbaColor;
      shapeTriangles.forEach(shape => {
        ctx.fill(shape);
      });
    });

    //draw lines
    ctx.globalCompositeOperation = 'source-over';
    if (anchors.length > 0) {
      const linePath = getSingleLinePath(
        anchors.map(index => lineAnchors[index])
      );
      ctx.lineCap = 'round';
      ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
      ctx.stroke(linePath);
    }

    //draw outline
    ctx.lineCap = 'butt';
    ctx.strokeStyle = `rgba(255,255,255,${outlineOpacity})`;
    ctx.strokeRect(leftX, topY, squareLength, squareLength);
  }
};

export default drawCanvas;
