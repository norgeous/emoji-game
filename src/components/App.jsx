import useEngine from '../hooks/useEngine';
import useLevelBodies from '../hooks/useLevelBodies';
import useCollisionParticleEffect from '../hooks/useCollisionParticleEffect';
import useKeyboard from '../hooks/useKeyboard';
import useHealthBar from '../hooks/useHealthBar';
import usePlayer from '../hooks/usePlayer';

import createItem from '../render/renderer';

import fireParticle from '../bodies/effects/fire';
import countdown from '../bodies/effects/countdown';

import ram from '../bodies/mobs/ram';
import cartwheeler from '../bodies/mobs/cartwheeler';
import fencer from '../bodies/mobs/fencer';
import hammerBro from '../bodies/mobs/hammerBro';

// import player from '../bodies/player/player';
import randomThrower from '../bodies/player/randomThrower';

import randomEmoji from '../bodies/randomEmoji';

const App = () => {
  const { boxRef, canvasRef, matterInstance } = useEngine();
  useLevelBodies(matterInstance);
  useCollisionParticleEffect(matterInstance);

  useKeyboard();
  const {amt, plus, minus} = useHealthBar(matterInstance);
  const player = usePlayer(matterInstance);

  return (
    <div>
      <div className="container">
        <button onClick={minus}>-1</button>
        {amt}
        <button onClick={plus}>+1</button>
        <br/>
        <button onClick={() => {
          createItem(matterInstance, countdown({size: 20+Math.floor(Math.random()*20)}));
          createItem(matterInstance, countdown({size: 20+Math.floor(Math.random()*20)}));
          createItem(matterInstance, countdown({size: 20+Math.floor(Math.random()*20)}));
          createItem(matterInstance, countdown({size: 20+Math.floor(Math.random()*20)}));
          createItem(matterInstance, countdown({size: 20+Math.floor(Math.random()*20)}));
          createItem(matterInstance, countdown({size: 20+Math.floor(Math.random()*20)}));
          createItem(matterInstance, countdown({size: 20+Math.floor(Math.random()*20)}));
          createItem(matterInstance, countdown({size: 20+Math.floor(Math.random()*20)}));
          createItem(matterInstance, countdown({size: 20+Math.floor(Math.random()*20)}));
          createItem(matterInstance, countdown({size: 20+Math.floor(Math.random()*20)}));
        }}>🔟</button>
        <button onClick={() => createItem(matterInstance, fireParticle({size: 50+Math.floor(Math.random()*50)}))}>🔥</button>
        <button onClick={() => createItem(matterInstance, randomEmoji({size: 50+Math.floor(Math.random()*150)}))}>😂</button>
        <button onClick={() => createItem(matterInstance, fencer({x:100, y: 500}))}>🤺</button>
        <button onClick={() => createItem(matterInstance, cartwheeler({x:100, y: 500}))}>🤸</button>
        <button onClick={() => createItem(matterInstance, ram({x:0, y: 600}))}>🐏</button>
        <button onClick={() => createItem(matterInstance, hammerBro({x:200, y: 600}))}>🐢</button>
        <button onClick={() => createItem(matterInstance, randomThrower({x:1500, y: 600, force:{x:-.03,y:-.01}}))}>WEP</button>
        {/* <pre>{player && JSON.stringify(Object.keys(player),null,'  ')}</pre> */}
      </div>
      <div ref={boxRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default App;
