import "./src/styles/global.css";
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const wrapRootElement = ({element}) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {element}
        </QueryClientProvider>
    );
}

// import { Provider } from "./src/firebase-helper";

// export const wrapRootElement = ({ element }) => {
//   return <Provider>{element}</Provider>;
// };
