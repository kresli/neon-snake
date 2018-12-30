import { number, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Playground } from "./Playground";
import { createPlaygroundStore } from "./Playground.store";

const PlaygroundStore = createPlaygroundStore();

const stories = storiesOf("Playground", module);

stories.addDecorator(withKnobs);

stories.add("basic", () => {
  return <Playground store={PlaygroundStore.create({})} />;
});

stories.add("with snake", () => {
  const store = PlaygroundStore.create({});
  return <Playground store={store} />;
});
