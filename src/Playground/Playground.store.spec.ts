import { createPlaygroundStore, IPlaygroundStoreConfig } from ".";

function createPlayground(config: Partial<IPlaygroundStoreConfig> = {}) {
  const defaultConfig = {
    hCount: 10,
    vCount: 10,
    speed: 1,
    startPosition: { x: 0, y: 0 }
  };
  const PlaygroundStore = createPlaygroundStore({
    ...defaultConfig,
    ...config
  });
  const playground = PlaygroundStore.create({});
  playground.restartGame();
  const { snake } = playground;
  return { playground, snake };
}

it("restart game set snake on startPosition", () => {
  const startPosition = { x: 0, y: 0 };
  const { playground, snake } = createPlayground({ startPosition });
  playground.restartGame();
  expect(snake.tiles).toEqual([playground.rows[0][0]]);
});
