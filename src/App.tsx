import { observer } from "mobx-react";
import React, { Component } from "react";
import "./App.scss";
import { createPlaygroundStore, Playground } from "./Playground";

const PlaygroundStore = createPlaygroundStore({
  hCount: 50,
  vCount: 50,
  speed: 30,
  startPosition: {
    x: 25,
    y: 25
  }
});
@observer
class App extends Component {
  private store = PlaygroundStore.create({});
  public componentDidMount() {
    this.store.restartGame();
  }
  public render() {
    return (
      <div className="App">
        <div className="top-row">
          <span className="title">neon snake</span>
        </div>
        <div className="middle-row">
          <Playground store={this.store} />
        </div>
        <div className="bottom-row" />
      </div>
    );
  }
}

export default App;
