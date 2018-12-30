import { observer } from "mobx-react";
import React, { SFC } from "react";
import { IPlaygroundStore } from "../Playground";
import "./InfoPanel.scss";
interface IProps {
  store: IPlaygroundStore;
}

@observer
export class InfoPanel extends React.Component<IProps> {
  public render() {
    const { store } = this.props;
    return (
      <div className="InfoPanel">
        <Score store={store} />
      </div>
    );
  }
}

const Score: SFC<IProps> = observer(({ store }) => (
  <div className="score">
    <span className="title">score</span>
    <span className="value">{store.score}</span>
  </div>
));
