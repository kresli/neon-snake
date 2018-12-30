import { cast, getParent, IAnyModelType, types } from "mobx-state-tree";
import { IPlaygroundStore } from "../Playground";
import { ITileStore, TileStore } from "../Tile";

export const snakeDirection = types.enumeration("SnakeDirection", [
  "Up",
  "Down",
  "Left",
  "Right"
]);

export const SnakeStore = types
  .model({
    tiles: types.array(types.reference(TileStore))
  })
  .views(self => ({
    get ground() {
      return getParent(self) as IPlaygroundStore;
    },
    get lastTile() {
      return self.tiles[self.tiles.length - 1];
    },
    get firstTile() {
      return self.tiles[0];
    }
  }))
  .actions(self => ({
    reset() {
      self.tiles = cast([]);
    },
    eatTile(tile: ITileStore) {
      if (self.tiles[0]) self.tiles[0].setSnakeHead(false);
      tile.setState("Snake");
      self.tiles.unshift(tile);
      tile.setSnakeHead(true);
    },
    removeTile(tile: ITileStore) {
      tile.setState("Empty");
      self.tiles.splice(self.tiles.indexOf(tile), 1);
    },
    moveToTile(nextTile: ITileStore, lastTile: ITileStore) {
      const { state } = nextTile;
      switch (state) {
        case "Food":
          this.eatTile(nextTile);
          self.ground.addFood();
          break;
        case "Snake":
          self.ground.setGameOver();
          break;
        default:
          this.eatTile(nextTile);
          this.removeTile(lastTile);
      }
    },
    moveRight() {
      const { lastTile, firstTile } = self;
      const { x, y } = firstTile.position;
      const row = self.ground.rows[y];
      const next = row[x < self.ground.hTileCount - 1 ? x + 1 : 0];
      this.moveToTile(next, lastTile);
    },
    moveLeft() {
      const { lastTile, firstTile } = self;
      const { x, y } = firstTile.position;
      const row = self.ground.rows[y];
      const next = row[x <= 0 ? self.ground.hTileCount - 1 : x - 1];
      this.moveToTile(next, lastTile);
    },
    moveDown() {
      const { lastTile, firstTile } = self;
      const { y, x } = firstTile.position;
      const row = self.ground.rows[y < self.ground.rows.length - 1 ? y + 1 : 0];
      const next = row[x];
      this.moveToTile(next, lastTile);
    },
    moveUp() {
      const { lastTile, firstTile } = self;
      const { y, x } = firstTile.position;
      const row = self.ground.rows[y <= 0 ? self.ground.vTileCount - 1 : y - 1];
      const next = row[x];
      this.moveToTile(next, lastTile);
    }
  }));
