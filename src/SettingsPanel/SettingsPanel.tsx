import classNames from "classnames";
import { observer } from "mobx-react";
import React, { SFC } from "react";
import { IPlaygroundStore } from "../Playground";
import "./SettingsPanel.scss";
interface IProps {
  store: IPlaygroundStore;
}

@observer
export class SettingsPanel extends React.Component<IProps> {
  public render() {
    const { store } = this.props;
    return (
      <div className="SettingsPanel">
        <Vfx store={store} />
      </div>
    );
  }
}

const Vfx: SFC<IProps> = observer(({ store }: IProps) => (
  <div className="vfx">
    <span className="title">vfx</span>
    <div
      className={classNames("checkbox", { checked: store.showVfx })}
      onClick={store.toggleShowVfx}
    />
  </div>
));
