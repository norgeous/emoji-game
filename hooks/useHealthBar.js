const pos = {x:30,y:30};
const useHealthBar = (matterInstance) => {
  const [amt, setAmt] = useState(1);
  const plus = () => setAmt(a=>a+1);
  const minus = () => setAmt(a=>a-1);

  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (!matterInstance) return;
    if (amt < hearts.length && amt>=0) {
      hearts[hearts.length-1].startTime = Date.now();
      hearts[hearts.length-1].lifespan = 4000;
      hearts[hearts.length-1].fadeAwayOverLifespan = true;
      hearts[hearts.length-1].hasGravity = true;
      hearts[hearts.length-1].keepUpright = false;
      hearts[hearts.length-1].setTexture(1);
      hearts.splice(-1);
    }
    if (amt > hearts.length) {
      setHearts([
        ...hearts,
        createItem(matterInstance, heathParticle({x:pos.x+(hearts.length*25), y:pos.y})),
      ]);
    }
  }, [matterInstance, amt]);
  
  return { amt, plus, minus };
};
