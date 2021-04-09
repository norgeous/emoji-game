const createImageFromEmoji = ({emoji, size, hflip}) => {
  const drawing = document.createElement('canvas');
  drawing.width = size;
  drawing.height = size;
  let ctx = drawing.getContext('2d');
  ctx.font = `${size}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (hflip) {
    ctx.translate(size, 0);
    ctx.scale(-1, 1);
  }

  ctx.fillText(emoji, size*.5, size*.60);
  const data = drawing.toDataURL('image/png');

  // document.querySelector('#debug-emoji').setAttribute('src',data);

  return data;
};

const labelCollisionMap = {
  'floor': {
    category: 1,
    mask: 0xFFFFFFFF, // floor contacts anything
  },
  'player': {
    category: 2,
    mask: 1|4, // player contacts floor or mob
  },
  'mob': {
    category: 4,
    mask: 1|2|4, // mob contacts floor or player or mob
  },
  'particle': {
    category: 8,
    mask: 1|8, // particle contacts floor or particle
  },
  'bullet_player': {
    category: 4,
    mask: 1|4,
  },
  'bullet_mob': {
    category: 4,
    mask: 1|2|4,
  },
  'feet': {
    category: 1,
    mask: 0xFFFFFFFF,
  },
};

const createItem = (matterInstance, {
  label,
  x, y,
  size,
  textures,
  lifespan,
  scaleAwayOverLifespan = false,
  fadeAwayOverLifespan = false,
  beforeUpdate: customBeforeUpdate,
  onDestroy: customOnDestroy,
  onCreate,
  onCollide,
  offCollide,
  keepUpright = false,
  hasGravity = true,
  force,
  torque,
  ...other
}) => {
  const body = Bodies.circle(x, y, size/2, {
    label,
    ...(labelCollisionMap[label] && {collisionFilter: labelCollisionMap[label]}),
    lifespan,
    fadeAwayOverLifespan,
    scaleAwayOverLifespan,
    startTime: Date.now(),
    age: function () {
      return Date.now() - this.startTime;
    },
    hasGravity,
    keepUpright,
    destroy: function () {
      World.remove(matterInstance.engine.world, this);
      Events.off(matterInstance.engine, 'beforeUpdate', beforeUpdate);
      Events.off(matterInstance.engine, 'collisionStart', collisionStart);
      Events.off(matterInstance.engine, 'collisionEnd', collisionEnd);
      if (customOnDestroy) customOnDestroy(this);
    },
    textures: textures?.map(texture => createImageFromEmoji({
      size,
      emoji: texture.e,
      hflip: texture.hflip,
    })),
    setTexture: function(i) {
      if (this.textures?.[i]) {
        this.render.sprite.texture = this.textures[i];
      }
    },
    applyForce: force,
    applyTorque: torque,
    ...other,
  });

  body.setTexture(0);

  const beforeUpdate = function () {
    const age = body.age();

    // autokill after lifespan finishes
    if (body.lifespan && age > body.lifespan) {
      body.destroy();
      delete body;
      return;
    }

    // keep upright
    if (body.keepUpright) body.angle = 0;

    // apply gravity
    if (body.hasGravity) {
      Body.applyForce(body, body.position, {
        x: 0,
        y: body.mass * 0.001,
      });
    }

    // fade away
    if (body.fadeAwayOverLifespan) body.render.opacity = (1/body.lifespan) * (body.lifespan-age);

    // scale away
    if (body.scaleAwayOverLifespan) {
      body.render.sprite.xScale = (1/body.lifespan) * (body.lifespan-age);
      body.render.sprite.yScale = (1/body.lifespan) * (body.lifespan-age);
    }

    // apply spawn force, scaled by mass
    if (body.applyForce) {
      Body.applyForce(body, body.position, {
        x: body.mass * body.applyForce.x,
        y: body.mass * body.applyForce.y,
      });
      body.applyForce = null;
    }

    // apply torque, scaled by moment of inertia
    if (body.applyTorque) {
      body.torque = body.inertia * body.applyTorque;
      body.applyTorque = null;
    }

    // apply texture
    if (body.applyTexture) {
      body.setTexture(body.applyTexture);
      body.applyTexture = null;
    }

    // execute custom beforeUpdate
    if (customBeforeUpdate) customBeforeUpdate(matterInstance, body);
  };

  // add to world and attach to events
  World.add(matterInstance.engine.world, body);
  Events.on(matterInstance.engine, 'beforeUpdate', beforeUpdate);

  // custom on create
  if (onCreate) onCreate(matterInstance, body);

  // collisions with this body
  const collisionStart = (event) => {
    event.pairs.forEach((pair) => {
      // console.log(pair.bodyA.label, pair.bodyB.label);
      if (pair.bodyA === body || pair.bodyB === body) {
        const bodyAMomentum = Vector.mult(pair.bodyA.velocity, pair.bodyA.mass);
        const bodyBMomentum = Vector.mult(pair.bodyB.velocity, pair.bodyB.mass);
        const relativeMomentum = Vector.sub(
          {x:bodyAMomentum.x||0, y:bodyAMomentum.y||0},
          {x:bodyBMomentum.x||0, y:bodyBMomentum.y||0},
        );
        const collisionEnergy = Vector.magnitude(relativeMomentum);
        onCollide({
          bodyA: body,
          bodyB: [pair.bodyA, pair.bodyB].find(bodyX => body !== bodyX),
          collisionEnergy,
        });
      }
    });
  };
  if (onCollide) Events.on(matterInstance.engine, 'collisionStart', collisionStart);

  // uncollisions with this body
  const collisionEnd = (event) => {
    event.pairs.forEach((pair) => {
      // console.log(pair.bodyA.label, pair.bodyB.label);
      if (pair.bodyA === body || pair.bodyB === body) {
        offCollide({
          bodyA: body,
          bodyB: [pair.bodyA, pair.bodyB].find(bodyX => body !== bodyX),
        });
      }
    });
  };
  if (offCollide) Events.on(matterInstance.engine, 'collisionEnd', collisionEnd);

  // console.log(body);

  return body;
};