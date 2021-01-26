/* eslint-disable react/prop-types */
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const Provider = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
