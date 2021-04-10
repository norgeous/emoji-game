const randomEmoji = ({size}) => ({
  label: 'mob',
  textures: [
    {
      e: (()=>{
        const emojis = ['😂','😊','🤪','😴','🥺','😍','😃','😵','🤯','😱','😩','🤕','👍','🏢'];
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
