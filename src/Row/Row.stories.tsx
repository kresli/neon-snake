import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { ITileStoreSnapshotIn } from "../Tile/Tile.store";
import { Row } from "./Row";
import { RowStore } from "./Row.store";

const stories = storiesOf("Row", module);

stories.addDecorator(withKnobs);

// stories.add("basic", () => {
//   // const tiles: Array<Partial<ITileStoreSnapshotIn>> = [{}, {}, {}];
//   // return <Row store={RowStore.create({ tiles })} />;
// });
