const usePlayer = (matterInstance) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    if (!matterInstance) return;
    const player = createItem(matterInstance, playerObject());
    setPlayer(player);
    console.log(matterInstance)
  }, [matterInstance]);
  return player;
};
