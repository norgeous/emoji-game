const cartwheeler = ({x,y}) => ({
  label: 'mob',
  textures: [
    { e: '🤸' },
  ],
  mass: 1,
  size: 100,
  x,
  y,
  restitution: .99,
  lifespan: 30000,
  beforeUpdate: (matterInstance, body) => {
    const onFloor = body.velocity.y > -.01 && body.velocity.y < .01;
    if (onFloor) body.torque = 10;
  },
});

export default cartwheeler;
