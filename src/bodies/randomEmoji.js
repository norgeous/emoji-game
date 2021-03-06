const randomEmoji = ({size}) => ({
  label: 'mob',
  textures: [
    {
      e: (()=>{
        const emojis = ['ð','ð','ðĪŠ','ðī','ðĨš','ð','ð','ðĩ','ðĪŊ','ðą','ðĐ','ðĪ','ð','ðĒ'];
        return emojis[Math.floor(Math.random() * emojis.length)]
      })(),
    }, // 0
  ],
  size,
  x: 0,
  y: 500,
  lifespan: 60000,
  fadeAwayOverLifespan: true,
  force: { x: .05, y: -.04 },
  torque: .0001,
});

export default randomEmoji;
