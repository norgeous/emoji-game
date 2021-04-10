import { Body } from 'Matter';

const ram = ({...other}) => ({
  label: 'mob',
  textures: [
    { e: '🐏', hflip: true },
  ],
  mass: 1,
  keepUpright: true,
  size: 70,
  restitution: 0.1,
  lifespan: 30000,
  beforeUpdate: (matterInstance, body) => {
    const onFloor = body.velocity.y>-.01 && body.velocity.y<.01;
    if (onFloor) Body.applyForce(body, body.position, { x: .015, y: -.01 });
  },
  ...other,
});

export default ram;
