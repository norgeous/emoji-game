const useLevelBodies = (matterInstance) => {
  useEffect(() => {
    if (!matterInstance) return null;
    const floor = Bodies.rectangle(window.innerWidth/2, window.innerHeight+50-1, window.innerWidth, 100, {
      label: 'floor',
      isStatic: true,
      render: { fillStyle: '#0ff' },
    });
    const ceiling = Bodies.rectangle(window.innerWidth/2, -50, window.innerWidth, 100, {
      label: 'floor',
      isStatic: true,
      render: { fillStyle: '#0ff' },
    });
    const wallLeft = Bodies.rectangle(-50, window.innerHeight/2, 100, window.innerHeight, {
      label: 'floor',
      isStatic: true,
      render: { fillStyle: '#0ff' },
    });
    const wallRight = Bodies.rectangle(window.innerWidth+50, window.innerHeight/2, 100, window.innerHeight, {
      label: 'floor',
      isStatic: true,
      render: { fillStyle: '#0ff' },
    });
    World.add(matterInstance.engine.world, [floor, ceiling, wallLeft, wallRight]);
  }, [matterInstance]);
};
