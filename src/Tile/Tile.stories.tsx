import { radios, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Tile } from "./Tile";
import { ITileStore, TileStore } from "./Tile.store";

const stories = storiesOf("Tile", module);

stories.addDecorator(withKnobs);

// stories.add("basic", () => {
//   const options = {
//     Empty: "Empty",
//     Snake: "Snake",
//     Food: "Food"
//   };
//   const state = radios("State", options, "Empty") as ITileStore["state"];
//   return <Tile store={TileStore.create({ state })} />;
// });
