const collisionParticle = ({x,y,size}) => ({
  label: 'particle',
  textures: [
    {
      e: (()=>{
        if (size < 100) return '💨';
        if (size < 200) return '✨';
        if (size < 300) return '💥';
        return '⭐';
      })(),
    }, // 0
  ],
  size: size/2,
  x,
  y,
  restitution: 1,
  lifespan: 500,
  scaleAwayOverLifespan: true,
  fadeAwayOverLifespan: true,
});
