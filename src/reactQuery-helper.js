/* eslint-disable react/prop-types */
import React, { createContext, useContext } from "react";

const ReactQueryContext = createContext();
ReactQueryContext.displayName = "ReactQueryContext";

function useReactQueryContext() {
  const context = useContext(ReactQueryContext);
  if (context === undefined) {
    console.error(Error);
  }
  return context;
}

const Provider = ({ children }) => {
  return <ReactQueryContext.Provider>{children}</ReactQueryContext.Provider>;
};

export { useReactQueryContext, Provider };
