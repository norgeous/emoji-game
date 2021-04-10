const createImageFromEmoji = ({emoji, size, hflip}) => {
  const drawing = document.createElement('canvas');
  drawing.width = size;
  drawing.height = size;
  let ctx = drawing.getContext('2d');
  ctx.font = `${size}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (hflip) {
    ctx.translate(size, 0);
    ctx.scale(-1, 1);
  }

  ctx.fillText(emoji, size*.5, size*.60);
  const data = drawing.toDataURL('image/png');

  // document.querySelector('#debug-emoji').setAttribute('src',data);

  return data;
};

export default createImageFromEmoji;
