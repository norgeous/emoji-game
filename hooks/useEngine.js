const useEngine = () => {
  const [matterInstance, setMatterInstance] = useState(null);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    if (boxRef && canvasRef) {
      const engine = Engine.create({})
      const render = Render.create({
        element: boxRef.current,
        canvas: canvasRef.current,
        engine: engine,
        options: {
          wireframes: false,
          background: 'transparent',
          // showCollisions: true,
        },
      });

      // disable gravity
      engine.world.gravity.y = 0;

      // resize
      canvasRef.current.width = window.innerWidth-1;
      canvasRef.current.height = window.innerHeight-1;
      window.addEventListener('resize', () => {
        canvasRef.current.width = window.innerWidth-1;
        canvasRef.current.height = window.innerHeight-1;
      });

      // run
      // Engine.run(engine);
      Render.run(render);

      // create runner
      var runner = Runner.create();
      Runner.run(runner, engine);
      setMatterInstance({engine, render, runner});

      setInterval(()=>{
        const fpsel = document.querySelector('#fps')
        if (fpsel) fpsel.innerHTML = Math.round(runner.fps);
      },1000);
    }
  }, []);
  return { boxRef, canvasRef, matterInstance };
};
