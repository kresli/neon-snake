import { Instance, types } from "mobx-state-tree";
import { TileStore } from "../Tile/Tile.store";

export const RowStore = types.model({
  tiles: types.array(TileStore)
});

export interface IRowStore extends Instance<typeof RowStore> {}
