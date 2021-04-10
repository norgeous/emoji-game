const heathParticle = ({x,y}) => ({
  label: 'particle',
  textures: [
    { e: '❤️' },
    { e: '💔' },
  ],
  hasGravity: false,
  keepUpright: true,
  size: 20,
  x,
  y,
  restitution: 1,
});

export default heathParticle;
