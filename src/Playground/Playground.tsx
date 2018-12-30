import { action, computed } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { InfoPanel } from "../InfoPanel";
import { Row } from "../Row/Row";
import { SettingsPanel } from "../SettingsPanel";
import "./Playground.scss";
import { IPlaygroundStore } from "./Playground.store";
interface IProps {
  store: IPlaygroundStore;
}

@observer
export class Playground extends React.Component<IProps> {
  @computed
  private get tiles() {
    const { store } = this.props;
    const { rows } = this.props.store;
    return rows.map((row, i) => (
      <Row key={i} tiles={row} playgroundStore={store} />
    ));
  }
  private moveTimeout!: number;
  public componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
    this.moveTimeout = window.setInterval(
      this.props.store.moveSnake,
      this.props.store.speedInterval
    );
  }
  public componentWillMount() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.clearInterval(this.moveTimeout);
  }
  public render() {
    const { store } = this.props;
    return (
      <div className="Playground">
        <div className="left-panel">
          <SettingsPanel store={store} />
        </div>
        <div className="middle-panel">
          <div className="background" />
          <div className="tiles">{this.tiles}</div>
        </div>
        <div className="right-panel">
          <InfoPanel store={store} />
        </div>
      </div>
    );
  }

  @action.bound
  private onKeyDown({ key }: KeyboardEvent) {
    switch (key) {
      case "ArrowLeft":
        this.props.store.setSnakeDirection("Left");
        break;
      case "ArrowRight":
        this.props.store.setSnakeDirection("Right");
        break;
      case "ArrowUp":
        this.props.store.setSnakeDirection("Up");
        break;
      case "ArrowDown":
        this.props.store.setSnakeDirection("Down");
        break;
      default:
        break;
    }
  }
}
