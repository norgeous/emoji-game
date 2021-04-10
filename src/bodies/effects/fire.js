const fireParticle = ({size}) => ({
  label: 'particle',
  textures: [
    { e: '🔥', hflip: true },
    { e: '🔥', hflip: false },
  ],
  keepUpright: true,
  size,
  beforeUpdate: (matterInstance, body) => {
    // change frame every 1s
    body.setTexture(Math.floor(body.age() / 150) % 2);
  },
  x: 500+Math.random()*20,
  y: 500+Math.random()*20,
  lifespan: 60000,
});

export default fireParticle;
