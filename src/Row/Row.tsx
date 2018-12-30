import { computed } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { IPlaygroundStore } from "../Playground";
import { ITileStore } from "../Tile";
import { Tile } from "../Tile/Tile";
import "./Row.scss";

interface IProps {
  tiles: ITileStore[];
  playgroundStore: IPlaygroundStore;
}

@observer
export class Row extends React.Component<IProps> {
  @computed
  public get tiles() {
    const { playgroundStore } = this.props;
    return this.props.tiles.map((tile, i) => (
      <Tile key={i} store={tile} playgroundStore={playgroundStore} />
    ));
  }
  public render() {
    return <div className="Row">{this.tiles}</div>;
  }
}
