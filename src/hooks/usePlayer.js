import { useState, useEffect } from 'React';
import createItem from '../render/renderer';
import playerObject from '../bodies/player';

const usePlayer = (matterInstance) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    if (!matterInstance) return;
    const player = createItem(matterInstance, playerObject());
    setPlayer(player);
  }, [matterInstance]);
  return player;
};

export default usePlayer;
