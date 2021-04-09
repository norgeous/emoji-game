const hammerBro = ({x,y}) => ({
  label: 'mob',
  textures: [
    { e: '🐢', hflip: false },
    { e: '🐢', hflip: true },
  ],
  mass: 1,
  keepUpright: true,
  size: 100,
  x,
  y,
  restitution: 0,
  lifespan: 30000,
  beforeUpdate: (matterInstance, body) => {
    // change frame every 1s
    const f = Math.floor(body.age() / 1500) % 2;
    body.setTexture(f);

    const onFloor = body.velocity.y>-.01 && body.velocity.y<.01;
    if (onFloor && f) body.applyForce = { x: 0, y: -.02 };
  },
  onCreate: (matterInstance, body) => {
    body.hammerRepeater = setInterval(() => {
      createItem(matterInstance, {
        label: 'bullet_mob',
        textures: [
          { e: '🔨' , hflip: true }, // 0
        ],
        size: 40,
        x: body.position.x,
        y: body.position.y-70,
        force: { x: .02, y: -.04 },
        restitution: 0,
        torque: 0.001,
        onCollide: ({bodyA, bodyB, collisionEnergy}) => {
          if (bodyB.label === 'floor') {
            bodyA.lifespan = 800;
            bodyA.fadeAwayOverLifespan = true;
          }
          if (bodyB.label === 'player' || bodyB.label === 'mob') {
            console.log(`player/mob hit by mob with ${collisionEnergy} energy`);
            bodyB.startTime = Date.now();
            bodyB.fadeAwayOverLifespan = true;
            bodyB.lifespan = 500;
            bodyB.keepUpright = false;
            bodyB.applyForce = { x: 0, y: -.05 };
            bodyB.applyTorque = 0.001;
          }
        },
      });
    }, 4000);
  },
  onDestroy: (body) => {
    clearInterval(body.hammerRepeater);
  },
});
  