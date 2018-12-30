import { cast, IAnyModelType, Instance, types } from "mobx-state-tree";
import { RowStore } from "../Row";
import { snakeDirection as SnakeDirection, SnakeStore } from "../Snake";
import { ITileStore, ITileStoreSnapshotIn, TileStore } from "../Tile";

interface IPosition {
  x: number;
  y: number;
}

export interface IPlaygroundStoreConfig {
  hCount: number;
  vCount: number;
  speed: number;
  startPosition: { x: number; y: number };
}

const defaultConfig = {
  hCount: 50,
  vCount: 50,
  speed: 1,
  startPosition: {
    x: 25,
    y: 25
  }
};

export const createPlaygroundStore = (
  config: IPlaygroundStoreConfig = defaultConfig
) => {
  const { hCount, vCount, startPosition, speed } = config;

  const rows = new Array(vCount).fill(null).map((row, vi) =>
    new Array(hCount).fill(null).map(
      (tile, hi) =>
        ({
          uuid: `${hi}-${vi}`,
          position: {
            x: hi,
            y: vi
          }
        } as ITileStoreSnapshotIn)
    )
  );

  const tiles = rows.reduce((arr, row) => [...arr, ...row], []);

  const Store = types
    .model("Playground", {
      uuid: types.optional(types.identifier, "playground"),
      tiles: types.optional(types.array(TileStore), tiles),
      snake: types.optional(SnakeStore, {}),
      gameOver: types.optional(types.boolean, true),
      showVfx: true
    })
    .volatile(self => ({
      speed
    }))
    .volatile(self => {
      const state: { snakeDirection: typeof SnakeDirection.Type | null } = {
        snakeDirection: null
      };
      return state;
    })
    .views(self => ({
      get rows() {
        return rows.map((row, i) =>
          self.tiles.filter(tile => tile.position.y === i)
        );
      }
    }))
    .views(self => ({
      get hTileCount() {
        return self.rows.length;
      },
      get vTileCount() {
        const row = self.rows.length === 0 ? null : self.rows[0];
        return row ? row.length : 0;
      },
      get speedInterval() {
        return Math.floor(1000 / self.speed);
      },
      get score() {
        return self.snake.tiles.length;
      },
      get allTiles() {
        return self.rows.reduce(
          (arr, row) => [...arr, ...row],
          [] as ITileStore[]
        );
      }
    }))
    .actions(self => ({
      setGameOver() {
        self.gameOver = true;
        self.snakeDirection = null;
      },
      setSnake(position: IPosition) {
        const { x, y } = position;
        self.snake.eatTile(self.rows[y][x]);
      },
      toggleShowVfx() {
        self.showVfx = !self.showVfx;
      },
      setSnakeDirection(direction: typeof SnakeDirection.Type) {
        const { snakeDirection } = self;
        switch (direction) {
          case "Left":
            if (snakeDirection === "Right") return;
            break;
          case "Right":
            if (snakeDirection === "Left") return;
            break;
          case "Down":
            if (snakeDirection === "Up") return;
            break;
          case "Up":
            if (snakeDirection === "Down") return;
            break;
          default:
        }
        self.snakeDirection = direction;
      },
      resetSnake() {
        self.snake.reset();
        this.setSnake(startPosition);
      },
      restartGame() {
        self.allTiles.forEach(tile => tile.setState("Empty"));
        self.snakeDirection = null;
        this.resetSnake();
        this.addFood();
        self.gameOver = false;
      },
      addFood(
        position: IPosition = createRandomPosition(
          self.hTileCount,
          self.vTileCount
        )
      ) {
        const { x, y } = position;
        const tile = self.rows[y][x];
        if (tile.state !== "Empty") {
          this.addFood();
        }
        tile.setState("Food");
      },
      moveSnake() {
        if (self.gameOver) return;
        switch (self.snakeDirection) {
          case "Right":
            self.snake.moveRight();
            break;
          case "Left":
            self.snake.moveLeft();
            break;
          case "Down":
            self.snake.moveDown();
            break;
          case "Up":
            self.snake.moveUp();
            break;
          default:
            break;
        }
      }
    }));
  return Store;
};

function createRandomPosition(hTileCount: number, vTileCount: number) {
  return {
    x: Math.floor(Math.random() * Math.floor(hTileCount)),
    y: Math.floor(Math.random() * Math.floor(vTileCount))
  };
}

const PlaygroundStore = createPlaygroundStore();

export type PlaygroundStoreType = typeof PlaygroundStore;

export interface IPlaygroundStore extends Instance<PlaygroundStoreType> {}
