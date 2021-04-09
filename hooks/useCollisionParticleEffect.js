const useCollisionParticleEffect = (matterInstance) => {
  useEffect(() => {
    if(!matterInstance) return;
      
    Events.on(matterInstance.engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        // console.log(pair.bodyA.label, pair.bodyB.label);
        if (pair.bodyA.label !== 'particle' && pair.bodyB.label !== 'particle') {
          const bodyAMomentum = Vector.mult(pair.bodyA.velocity, pair.bodyA.mass);
          const bodyBMomentum = Vector.mult(pair.bodyB.velocity, pair.bodyB.mass);
          const relativeMomentum = Vector.sub(
            {x:bodyAMomentum.x||0, y:bodyAMomentum.y||0},
            {x:bodyBMomentum.x||0, y:bodyBMomentum.y||0},
          );
          const collisionEnergy = Vector.magnitude(relativeMomentum);
          // console.log(collisionEnergy);
  
          if (collisionEnergy > 15) {
            const point = (Object.values(pair.contacts)[0].vertex);
            createItem(matterInstance, collisionParticle({
              size: collisionEnergy,
              x:point.x,
              y:point.y,
            }));
          }
        }
      });
    });
  }, [matterInstance]);
};
