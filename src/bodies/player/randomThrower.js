const randomThrower = ({...other}) => ({
  label: 'bullet_player',
  textures: [
    {
      e: (()=>{
        const emojis = ['🔪','🗡️','✂️','🪓','⛏️','🔧'];
        return emojis[Math.floor(Math.random() * emojis.length)]
      })(),
    }, // 0
  ],
  size: 40,
  restitution: 1,
  torque: -0.001,
  lifespan: 10000,
  onCollide: ({bodyB, collisionEnergy}) => {
    if (bodyB.label === 'mob') {
      // console.log(`mob hit by weapon with ${collisionEnergy} energy`);
      bodyB.startTime = Date.now();
      bodyB.fadeAwayOverLifespan = true;
      bodyB.lifespan = 200;
      bodyB.applyForce = { x: 0, y: -.05 };
      bodyB.keepUpright = false;
      bodyB.applyTorque = 0.001;
    }
  },
  ...other,
});

export default randomThrower;
