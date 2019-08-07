import getOffset from './get-offset';
import getSCoordinates from './get-s-coordinates';

const drawCanvas = ({ canvasEl, lines = [] }) => {
  if (canvasEl) {
    const ctx = canvasEl.getContext('2d');
    ctx.fillStyle = 'black';
    const { width, height } = canvasEl;
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = Math.min(width, height) / 250;

    const offset = getOffset({ width, height });
    const { widthCount, heightCount } = getSCoordinates({ width, height });
    const w = (width - offset * 2) / widthCount;
    const h = (height - offset * 2) / heightCount;

    lines.forEach(({ x1, y1, x2, y2, color }) => {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(x1 * w + offset, y1 * h + offset);
      ctx.lineTo(x2 * w + offset, y2 * h + offset);
      ctx.stroke();
    });
  }
};

export default drawCanvas;
