import { Body } from 'Matter';

const fencer = ({x,y}) => ({
  label: 'mob',
  textures: [
    { e: '🤺', hflip: false },
    { e: '🤺', hflip: true },
  ],
  mass: 1,
  keepUpright: true,
  size: 100,
  x,
  y,
  restitution: .99,
  lifespan: 30000,
  beforeUpdate: (matterInstance, body) => {
    // change frame every 1s
    const f = Math.floor(body.age() / 1500) % 2
    body.setTexture(f);

    const onFloor = body.velocity.y>-.01 && body.velocity.y<.01;
    if (onFloor && f) Body.applyForce(body, body.position, { x: .02, y: -.01 });
  },
});

export default fencer;
