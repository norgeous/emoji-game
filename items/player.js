const playerObject = () => ({
  label: 'player',
  textures: [
    { e: '🧍', hflip: false }, // 0

    { e: '🏃', hflip: false }, // 1
    { e: '🚶', hflip: false }, // 2
    { e: '🤾', hflip: true }, // 3
    { e: '🧎', hflip: false }, // 4

    { e: '🏃', hflip: true }, // 5
    { e: '🚶', hflip: true }, // 6
    { e: '🤾', hflip: false }, // 7
    { e: '🧎', hflip: true }, // 8
  ],
  keepUpright: true,
  size: 100,
  fistIsOut: false,
  onFloor: 0,
  onCreate: (matterInstance, body) => {
    const feet = createItem(matterInstance, {
      label: 'feet',
      isSensor: true,
      size: 90,
      render: {
        fillStyle: '#0ff',
        visible: false,
      },
      hasGravity: false,
      x: body.position.x,
      y: body.position.y,
      onCollide: ({bodyB}) => {
        if (!['particle','player'].some(l => l === bodyB.label)) {
          body.onFloor = body.onFloor+1;
        }
      },
      offCollide: ({bodyB}) => {
        if (!['particle','player'].some(l => l === bodyB.label)) {
          body.onFloor = body.onFloor-1;
        }
      },
    });
    const constraint = Constraint.create({
      bodyA: body,
      pointA: { x: 0, y: 7 },
      bodyB: feet,
      length: 0,
      render: {
        visible: false,
      },
    });
    body.subBodies = [
      feet,
      constraint,
    ];
    World.add(matterInstance.engine.world, constraint);
  },
  beforeUpdate: (matterInstance, body) => {
    const { onFloor } = body;

    // body.render.opacity = onFloor ? 0.5:1;

    // keyboard controls
    const { left, right, up, down, x, spacebar } = window.keyboard;
    if (left && !down) Body.applyForce(body, body.position, { x: -.002, y: 0 });
    if (right && !down) Body.applyForce(body, body.position, { x: .002, y: 0 });
    if (spacebar && onFloor) Body.applyForce(body, body.position, { x: 0, y: -.3 });

    // no friction while moving
    body.friction = .01;
    if (left || right) body.friction = 0;
    if (down) body.friction = .001;
    
    // select emoji to display
    let direction = 'none'
    if (body.velocity.x > .5) direction = 'right';
    if (body.velocity.x < -.5) direction = 'left';
    if (direction === 'none') body.setTexture(0);
    if (direction === 'left' && !down) body.setTexture(Math.floor(body.age() / 150) % 2 ? 1 : 2);
    if (direction === 'right' && !down) body.setTexture(Math.floor(body.age() / 150) % 2 ? 5 : 6);
    if (direction === 'left' && down) body.setTexture(4);
    if (direction === 'right' && down) body.setTexture(8);
    if (direction === 'left' && !onFloor) body.setTexture(3);
    if (direction === 'right' && !onFloor) body.setTexture(7);

    // fist weapon
    if (x && !body.fistIsOut) {
      body.fistIsOut = true;
      const power = () => {
        const force = {x:0,y:0};
        if (left) force.x = -.03;
        if (right) force.x = .03;
        if (up) force.y = -.03;
        return force;
      }
      createItem(matterInstance, fist({
        x: body.position.x,
        y: body.position.y,
        force: power(),
        onDestroy: () => {
          body.fistIsOut = false;
        },
        onCollide: ({bodyB}) => {
          if (bodyB.label === 'mob') {
            bodyB.startTime = Date.now();
            bodyB.fadeAwayOverLifespan = true;
            bodyB.lifespan = 200;
            bodyB.applyForce = { x: 0, y: -.05 };
            bodyB.keepUpright = false;
            bodyB.applyTorque = 0.001;
          }
        },
      }));
    }
  },
  x: window.innerWidth/2,
  y: window.innerHeight-500,
  restitution: 0,
});
