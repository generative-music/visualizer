import getOffset from './get-offset';

const getSCoordinates = ({ width, height }) => {
  const offset = getOffset({ width, height });
  const widthCount = Math.floor((width - offset * 2) / offset);
  const heightCount = Math.floor((height - offset * 2) / offset);
  return { widthCount, heightCount };
};

export default getSCoordinates;
