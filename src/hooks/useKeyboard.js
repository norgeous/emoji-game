import { useEffect } from 'React';

const useKeyboard = () => {
  useEffect(() => {
    window.keyboard = {
      left: false,
      right: false,
      up: false,
      down: false,
      x: false,
      spacebar: false,
    };
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') window.keyboard.left = true;
      if (e.key === 'ArrowRight') window.keyboard.right = true;
      if (e.key === 'ArrowUp') window.keyboard.up = true;
      if (e.key === 'ArrowDown') window.keyboard.down = true;

      if (e.key === 'x') window.keyboard.x = true;
      if (e.key === ' ') window.keyboard.spacebar = true;
    });
    document.addEventListener('keyup', e => {
      if (e.key === 'ArrowLeft') window.keyboard.left = false;
      if (e.key === 'ArrowRight') window.keyboard.right = false;
      if (e.key === 'ArrowUp') window.keyboard.up = false;
      if (e.key === 'ArrowDown') window.keyboard.down = false;

      if (e.key === 'x') window.keyboard.x = false;
      if (e.key === ' ') window.keyboard.spacebar = false;
    });
  }, []);
};

export default useKeyboard;
