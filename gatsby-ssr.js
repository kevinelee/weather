import React from "react";

import Provider from "./src/react-query";

const createStore = require("./src/state/createStore");
const store = createStore();

export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};
