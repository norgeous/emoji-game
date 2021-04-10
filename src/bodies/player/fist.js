const fist = ({...other}) => ({
  label: 'bullet_player',
  textures: [
    { e: '🤛' },
    { e: '🤜' },
  ],
  size: 40,
  restitution: 2,
  lifespan: 1000,
  hasGravity: true,
  beforeUpdate: (matterInstance, body) => {
    if(body.velocity.x > 0) body.setTexture(1);
    if(body.velocity.x < 0) body.setTexture(0);
  },
  ...other,
});

export default fist;
