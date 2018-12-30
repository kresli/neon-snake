import { createPlaygroundStore, IPlaygroundStoreConfig } from "../Playground";

describe("single tile snake", () => {
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

  it("create Snake", () => {
    const { playground, snake } = createPlayground();
    const tile = playground.rows[0][0];
    expect(snake.tiles).toEqual([tile]);
  });

  it("move right", () => {
    const { playground, snake } = createPlayground();
    playground.setSnakeDirection("Right");
    playground.moveSnake();
    expect(snake.tiles).toEqual([playground.rows[0][1]]);
  });

  it("reset snake to begining of row on move right on the edge", () => {
    const { playground, snake } = createPlayground({
      hCount: 10,
      startPosition: { x: 9, y: 0 }
    });
    playground.setSnakeDirection("Right");
    playground.moveSnake();
    expect(snake.tiles).toEqual([playground.rows[0][0]]);
  });

  it("move left", () => {
    const { playground, snake } = createPlayground({
      hCount: 10,
      startPosition: { x: 9, y: 0 }
    });
    playground.setSnakeDirection("Left");
    playground.moveSnake();
    expect(snake.tiles).toEqual([playground.rows[0][8]]);
  });

  it("reset snake to end of row on move left on the edge", () => {
    const { playground, snake } = createPlayground({
      hCount: 10,
      startPosition: { x: 0, y: 0 }
    });
    playground.setSnakeDirection("Left");
    playground.moveSnake();
    expect(snake.tiles).toEqual([playground.rows[0][9]]);
  });

  it("move down", () => {
    const { playground, snake } = createPlayground({
      vCount: 10,
      startPosition: { x: 0, y: 0 }
    });
    playground.setSnakeDirection("Down");
    playground.moveSnake();
    expect(snake.tiles).toEqual([playground.rows[1][0]]);
  });

  it("reset snake to top of column on move down on the edge", () => {
    const { playground, snake } = createPlayground({
      vCount: 10,
      startPosition: { x: 0, y: 9 }
    });
    playground.setSnakeDirection("Down");
    playground.moveSnake();
    expect(snake.tiles).toEqual([playground.rows[0][0]]);
  });

  it("move up", () => {
    const { playground, snake } = createPlayground({
      vCount: 10,
      startPosition: { x: 0, y: 9 }
    });
    playground.setSnakeDirection("Up");
    playground.moveSnake();
    expect(snake.tiles).toEqual([playground.rows[8][0]]);
  });

  it("reset snake to bottom of column on move up on the edge", () => {
    const { playground, snake } = createPlayground({
      vCount: 10,
      startPosition: { x: 0, y: 0 }
    });
    playground.setSnakeDirection("Up");
    playground.moveSnake();
    expect(snake.tiles).toEqual([playground.rows[9][0]]);
  });
});

describe("three tile size snake", () => {
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
    playground.resetSnake();
    const { snake } = playground;
    snake.eatTile(playground.rows[0][1]);
    snake.eatTile(playground.rows[0][2]);
    return { playground, snake };
  }
  it("set all tiles", () => {
    const { snake } = createPlayground();

    expect(snake.tiles.length).toBe(3);
    expect(snake.tiles).toMatchSnapshot();
  });
  it("move right", () => {
    const { snake } = createPlayground();
    expect(snake.tiles).toMatchSnapshot();
    snake.moveRight();
    expect(snake.tiles).toMatchSnapshot();
  });

  it("eat tile", () => {
    const { snake, playground } = createPlayground();
    playground.addFood({ x: 3, y: 0 });
    expect(snake.tiles.length).toBe(3);
    snake.moveRight();
    expect(snake.tiles.length).toBe(4);
    expect(snake.tiles).toMatchSnapshot();
  });

  it("change direction will follow path", () => {
    const { snake, playground } = createPlayground();
    expect(snake.tiles).toMatchSnapshot();
    snake.moveRight();
    expect(snake.tiles).toMatchSnapshot();
    snake.moveDown();
    expect(snake.tiles[0].position).toEqual({ x: 3, y: 1 });
    expect(snake.tiles).toMatchSnapshot();
  });
});
