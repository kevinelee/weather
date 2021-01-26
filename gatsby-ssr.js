import React from "react";

const { Provider } = require("react-redux");

const createStore = require("./src/state/createStore");
const store = createStore();

export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};
