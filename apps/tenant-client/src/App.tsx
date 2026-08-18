import React from "react";
import { HelmetProvider } from "react-helmet-async";

import AppRouter from "router/AppRouter";
import QueryProvider from "providers/QueryProvider";

import "styles/globals.scss";

const App: React.FC = () => {
  return (
    <QueryProvider>
      <HelmetProvider>
        <AppRouter />
      </HelmetProvider>
    </QueryProvider>
  );
};

export default App;
