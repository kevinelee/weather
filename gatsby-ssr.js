import React from "react";
import Provider from "./src/react-query";

export const wrapRootElement = ({ element }) => {
  return <Provider>{element}</Provider>;
};
