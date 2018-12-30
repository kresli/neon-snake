import classNames from "classnames";
import { computed } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { IPlaygroundStore } from "../Playground";
import "./Tile.scss";
import { ITileStore } from "./Tile.store";
interface IProps {
  store: ITileStore;
  playgroundStore: IPlaygroundStore;
}

@observer
export class Tile extends React.Component<IProps> {
  @computed
  private get rootClassName() {
    const { state, snakeHead } = this.props.store;
    return classNames("Tile", {
      food: state === "Food",
      snake: state === "Snake",
      "snake-head": snakeHead,
      "vfx-enabled": this.props.playgroundStore.showVfx
    });
  }

  public render() {
    return <div className={this.rootClassName} />;
  }
}
