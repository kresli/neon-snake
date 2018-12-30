import { Instance, types } from "mobx-state-tree";

const PositionStore = types.model({
  x: types.number,
  y: types.number
});

const State = types.optional(
  types.enumeration("State", ["Empty", "Snake", "Food"]),
  "Empty"
);
export const TileStore = types
  .model({
    uuid: types.identifier,
    state: State,
    position: PositionStore,
    snakeHead: types.optional(types.boolean, false)
  })
  .actions(self => ({
    setSnakeHead(isHead: boolean) {
      self.snakeHead = isHead;
    },
    setState(state: typeof State.Type) {
      self.state = state;
    }
  }));

export interface ITileStore extends Instance<typeof TileStore> {}
export interface ITileStoreSnapshotIn extends Instance<ITileStore> {}
