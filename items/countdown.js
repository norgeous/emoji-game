const countdown = ({size}) => ({
  label: 'mob',
  textures: [
    { e: '🔟' },
    { e: '9️⃣' },
    { e: '8️⃣' },
    { e: '7️⃣' },
    { e: '6️⃣' },
    { e: '5️⃣' },
    { e: '4️⃣' },
    { e: '3️⃣' },
    { e: '2️⃣' },
    { e: '1️⃣' },
    { e: '0️⃣' },
  ],
  hasGravity: false,
  size,
  lifespan: 20*1000,
  beforeUpdate: (matterInstance, body) => {
    const age = body.age();
    // progress frame every 1s
    if (age < 11000) body.setTexture(Math.floor(age / 1000) % 11);
    if (age > 10000) body.hasGravity = true;

    // fade out over 10s
    body.render.opacity = (1/5000*(20000-age));
  },
  x: 500,
  y: 500,
  restitution: 1,
});
